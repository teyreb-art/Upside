
const ADMIN_EMAIL = "beratkaranfil2005@gmail.com";
const SESSION_DAYS = 7;
const COOKIE_NAME = "__Host-upside_session";
const PASSWORD_ITERATIONS = 210000;

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex) {
  if (!/^(?:[0-9a-f]{2})+$/i.test(hex)) {
    throw new Error("Ongeldige hash");
  }

  return Uint8Array.from(
    hex.match(/.{2}/g),
    part => parseInt(part, 16)
  );
}

function randomToken() {
  return toHex(crypto.getRandomValues(new Uint8Array(32)));
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  return toHex(await crypto.subtle.digest("SHA-256", bytes));
}

async function hashPassword(password, saltHex = null) {
  const salt = saltHex
    ? fromHex(saltHex)
    : crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derived = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: PASSWORD_ITERATIONS,
      hash: "SHA-256"
    },
    key,
    256
  );

  return `pbkdf2:${PASSWORD_ITERATIONS}:${toHex(salt)}:${toHex(derived)}`;
}

async function verifyPassword(password, stored) {
  const parts = stored.split(":");

  if (
    parts.length !== 4 ||
    parts[0] !== "pbkdf2" ||
    Number(parts[1]) !== PASSWORD_ITERATIONS
  ) {
    return false;
  }

  const calculated = await hashPassword(password, parts[2]);
  const a = new TextEncoder().encode(calculated);
  const b = new TextEncoder().encode(stored);

  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }

  return diff === 0;
}

function validOrigin(request) {
  const origin = request.headers.get("Origin");
  return origin === new URL(request.url).origin;
}

async function readJson(request) {
  if (!(request.headers.get("content-type") || "")
    .toLowerCase().includes("application/json")) {
    throw new Error("JSON vereist");
  }

  const raw = await request.text();

  if (raw.length > 20000) {
    throw new Error("Aanvraag te groot");
  }

  return JSON.parse(raw);
}

function getCookie(request, name) {
  const cookies = request.headers.get("Cookie") || "";

  for (const part of cookies.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;

    if (part.slice(0, index).trim() === name) {
      return part.slice(index + 1).trim();
    }
  }

  return null;
}

function sessionCookie(token, maxAge) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

async function currentAdmin(request, env) {
  const token = getCookie(request, COOKIE_NAME);

  if (!token || !/^[0-9a-f]{64}$/.test(token)) {
    return null;
  }

  const tokenHash = await sha256(token);

  return env.DB.prepare(`
    SELECT admin_users.id, admin_users.email
    FROM admin_sessions
    JOIN admin_users
      ON admin_users.id = admin_sessions.user_id
    WHERE admin_sessions.token_hash = ?
      AND admin_sessions.expires_at > ?
    LIMIT 1
  `).bind(tokenHash, new Date().toISOString()).first();
}

async function handleSetup(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Methode niet toegestaan" }, 405);
  }

  if (!validOrigin(request)) {
    return json({ error: "Ongeldige herkomst" }, 403);
  }

  if (!env.ADMIN_SETUP_TOKEN) {
    return json({ error: "Registratie is uitgeschakeld" }, 403);
  }

  const existing = await env.DB.prepare(
    "SELECT id FROM admin_users LIMIT 1"
  ).first();

  if (existing) {
    return json({ error: "Er bestaat al een beheerder" }, 403);
  }

  let data;

  try {
    data = await readJson(request);
  } catch {
    return json({ error: "Ongeldige aanvraag" }, 400);
  }

  const { email, password, setupToken } = data || {};

  if (
    email !== ADMIN_EMAIL ||
    typeof password !== "string" ||
    password.length < 14 ||
    password.length > 128 ||
    typeof setupToken !== "string"
  ) {
    return json({ error: "Ongeldige registratiegegevens" }, 400);
  }

  const expectedHash = await sha256(env.ADMIN_SETUP_TOKEN);
  const providedHash = await sha256(setupToken);

  if (expectedHash !== providedHash) {
    return json({ error: "Ongeldige installatiecode" }, 403);
  }

  const passwordHash = await hashPassword(password);
  const id = crypto.randomUUID();

  await env.DB.prepare(`
    INSERT INTO admin_users (id, email, password_hash)
    VALUES (?, ?, ?)
  `).bind(id, email, passwordHash).run();

  return json({
    success: true,
    message: "Beheerdersaccount aangemaakt. Verwijder nu ADMIN_SETUP_TOKEN uit Cloudflare."
  }, 201);
}

async function handleLogin(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Methode niet toegestaan" }, 405);
  }

  if (!validOrigin(request)) {
    return json({ error: "Ongeldige herkomst" }, 403);
  }

  let data;

  try {
    data = await readJson(request);
  } catch {
    return json({ error: "Ongeldige aanvraag" }, 400);
  }

  const { email, password } = data || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    password.length > 128
  ) {
    return json({ error: "Ongeldige inloggegevens" }, 401);
  }

  // Deze login vereist daarnaast een server-side
  // rate limiter voordat hij publiek gebruikt wordt.
  const user = await env.DB.prepare(`
    SELECT id, email, password_hash
    FROM admin_users
    WHERE email = ?
    LIMIT 1
  `).bind(email.toLowerCase().trim()).first();

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return json({ error: "Ongeldige inloggegevens" }, 401);
  }

  const token = randomToken();
  const tokenHash = await sha256(token);
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 86400000
  ).toISOString();

  await env.DB.prepare(`
    INSERT INTO admin_sessions
      (id, user_id, token_hash, expires_at)
    VALUES (?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    user.id,
    tokenHash,
    expiresAt
  ).run();

  const response = json({
    success: true,
    email: user.email
  });

  response.headers.set(
    "Set-Cookie",
    sessionCookie(token, SESSION_DAYS * 86400)
  );

  return response;
}

async function handleLogout(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Methode niet toegestaan" }, 405);
  }

  if (!validOrigin(request)) {
    return json({ error: "Ongeldige herkomst" }, 403);
  }

  const token = getCookie(request, COOKIE_NAME);

  if (token && /^[0-9a-f]{64}$/.test(token)) {
    await env.DB.prepare(`
      DELETE FROM admin_sessions WHERE token_hash = ?
    `).bind(await sha256(token)).run();
  }

  const response = json({ success: true });

  response.headers.set(
    "Set-Cookie",
    sessionCookie("", 0)
  );

  return response;
}

async function handleMe(request, env) {
  if (request.method !== "GET") {
    return json({ error: "Methode niet toegestaan" }, 405);
  }

  const user = await currentAdmin(request, env);

  if (!user) {
    return json({ authenticated: false }, 401);
  }

  return json({
    authenticated: true,
    email: user.email
  });
}

async function handleKennismaking(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Methode niet toegestaan" }, 405);
  }

  try {
    if (!env.DB) {
      throw new Error("D1-binding DB ontbreekt");
    }

    const type = request.headers.get("content-type") || "";

    if (!type.toLowerCase().includes("application/json")) {
      return json({ error: "JSON vereist" }, 415);
    }

    const length = Number(request.headers.get("content-length"));

    if (length > 20000) {
      return json({ error: "Aanvraag te groot" }, 413);
    }

    const raw = await request.text();

    if (raw.length > 20000) {
      return json({ error: "Aanvraag te groot" }, 413);
    }

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      return json({ error: "Ongeldige JSON" }, 400);
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return json({ error: "Ongeldige aanvraag" }, 400);
    }

    const company = data.company;
    const notes = data.notes ?? "";
    const language = data.language ?? "nl";

    if (
      typeof company !== "string" ||
      !company.trim() ||
      company.length > 120 ||
      typeof notes !== "string" ||
      notes.length > 2000 ||
      !["nl", "fr", "en", "tr", "es"].includes(language) ||
      data.consent !== true
    ) {
      return json({ error: "Ongeldige formuliergegevens" }, 400);
    }

    const allowed = {
      activities: 10,
      existing: 9,
      acquisition: 7,
      services: 12
    };

    for (const [key, max] of Object.entries(allowed)) {
      if (
        !Array.isArray(data[key]) ||
        data[key].length > max ||
        data[key].some(
          item => typeof item !== "string" || item.length > 200
        )
      ) {
        return json({ error: `Ongeldige waarde: ${key}` }, 400);
      }
    }

    for (const key of ["clients", "challenge", "photos", "budget"]) {
      if (
        typeof data[key] !== "string" ||
        data[key].length > 200
      ) {
        return json({ error: `Ongeldige waarde: ${key}` }, 400);
      }
    }

    const id = crypto.randomUUID();
    const consentAt = new Date().toISOString();

    await env.DB.prepare(`
      INSERT INTO kennismakingen (
        id, company, activities, clients,
        existing_tools, acquisition, services,
        challenge, photos, budget, notes,
        language, consent, consent_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      company.trim(),
      JSON.stringify(data.activities),
      data.clients,
      JSON.stringify(data.existing),
      JSON.stringify(data.acquisition),
      JSON.stringify(data.services),
      data.challenge,
      data.photos,
      data.budget,
      notes.trim(),
      language,
      1,
      consentAt
    ).run();

    return json({ success: true, id }, 201);

  } catch (error) {
    console.error("Kennismaking opslaan mislukt:", error);
    return json({ error: "Opslaan mislukt" }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/api/kennismaking") {
        return await handleKennismaking(request, env);
      }

      if (url.pathname === "/api/admin/setup") {
        return await handleSetup(request, env);
      }

      if (url.pathname === "/api/admin/login") {
        return await handleLogin(request, env);
      }

      if (url.pathname === "/api/admin/logout") {
        return await handleLogout(request, env);
      }

      if (url.pathname === "/api/admin/me") {
        return await handleMe(request, env);
      }

      // Geen onbeveiligde toegang tot andere beheer-API's.
      if (url.pathname.startsWith("/api/admin/")) {
        return json({ error: "Niet gevonden" }, 404);
      }

      return env.ASSETS.fetch(request);

    } catch (error) {
      console.error("Upside Worker-fout:", error);
      return json({ error: "Interne serverfout" }, 500);
    }
  }
};
