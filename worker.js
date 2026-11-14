
"use strict";

// ==========================================
// UPSIDE AGENCY — CLOUDFLARE WORKER
// ==========================================

const ADMIN_EMAIL = "beratkaranfil2005@gmail.com";
const SESSION_DAYS = 7;
const COOKIE_NAME = "__Host-upside_session";
const PASSWORD_ITERATIONS = 100000;

const STATUSES = ["nieuw", "opvolgen", "afgerond"];

// ==========================================
// ALGEMENE FUNCTIES
// ==========================================

function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers
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
  return toHex(
    crypto.getRandomValues(new Uint8Array(32))
  );
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);

  return toHex(
    await crypto.subtle.digest("SHA-256", bytes)
  );
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
  if (typeof stored !== "string") return false;

  const parts = stored.split(":");

  if (
    parts.length !== 4 ||
    parts[0] !== "pbkdf2" ||
    Number(parts[1]) !== PASSWORD_ITERATIONS
  ) {
    return false;
  }

  const calculated = await hashPassword(
    password,
    parts[2]
  );

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
  const type =
    request.headers.get("content-type") || "";

  if (!type.toLowerCase().includes("application/json")) {
    throw new Error("JSON vereist");
  }

  const length = Number(
    request.headers.get("content-length")
  );

  if (length > 20000) {
    throw new Error("Aanvraag te groot");
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

// ==========================================
// BEHEERDER CONTROLEREN
// ==========================================

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
  `).bind(
    tokenHash,
    new Date().toISOString()
  ).first();
}

async function requireAdmin(request, env) {
  const user = await currentAdmin(request, env);

  if (!user) {
    return {
      user: null,
      error: json(
        { error: "Niet ingelogd" },
        401
      )
    };
  }

  return { user, error: null };
}

// ==========================================
// EENMALIGE REGISTRATIE
// ==========================================

async function handleSetup(request, env) {
  if (request.method !== "POST") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  if (!validOrigin(request)) {
    return json(
      { error: "Ongeldige herkomst" },
      403
    );
  }

  if (!env.ADMIN_SETUP_TOKEN) {
    return json(
      { error: "Registratie is uitgeschakeld" },
      403
    );
  }

  const existing = await env.DB.prepare(
    "SELECT id FROM admin_users LIMIT 1"
  ).first();

  if (existing) {
    return json(
      { error: "Er bestaat al een beheerder" },
      403
    );
  }

  let data;

  try {
    data = await readJson(request);
  } catch {
    return json(
      { error: "Ongeldige aanvraag" },
      400
    );
  }

  const { email, password, setupToken } = data || {};

  if (
    email !== ADMIN_EMAIL ||
    typeof password !== "string" ||
    password.length < 14 ||
    password.length > 128 ||
    typeof setupToken !== "string"
  ) {
    return json(
      { error: "Ongeldige registratiegegevens" },
      400
    );
  }

  const expectedHash = await sha256(
    env.ADMIN_SETUP_TOKEN
  );

  const providedHash = await sha256(setupToken);

  if (expectedHash !== providedHash) {
    return json(
      { error: "Ongeldige installatiecode" },
      403
    );
  }

  const passwordHash = await hashPassword(password);

  await env.DB.prepare(`
    INSERT INTO admin_users
      (id, email, password_hash)
    VALUES (?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    email,
    passwordHash
  ).run();

  return json({
    success: true,
    message: "Beheerdersaccount aangemaakt"
  }, 201);
}

// ==========================================
// LOGIN MET POGINGENLIMIET
// ==========================================

async function handleLogin(request, env) {
  if (request.method !== "POST") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  if (!validOrigin(request)) {
    return json(
      { error: "Ongeldige herkomst" },
      403
    );
  }

  let data;

  try {
    data = await readJson(request);
  } catch {
    return json(
      { error: "Ongeldige aanvraag" },
      400
    );
  }

  const { email, password } = data || {};

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    password.length > 128
  ) {
    return json(
      { error: "Ongeldige inloggegevens" },
      401
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  const ip =
    request.headers.get("CF-Connecting-IP") ||
    "unknown";

  const identifier = await sha256(
    normalizedEmail + ":" + ip
  );

  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 5;

  await env.DB.prepare(`
    INSERT OR IGNORE INTO admin_login_attempts
      (identifier, attempts, window_start, blocked_until)
    VALUES (?, 0, ?, 0)
  `).bind(identifier, now).run();

  await env.DB.prepare(`
    UPDATE admin_login_attempts
    SET attempts = 0,
        window_start = ?,
        blocked_until = 0
    WHERE identifier = ?
      AND window_start <= ?
      AND blocked_until <= ?
  `).bind(
    now,
    identifier,
    now - windowMs,
    now
  ).run();

  const attempt = await env.DB.prepare(`
    SELECT attempts, blocked_until
    FROM admin_login_attempts
    WHERE identifier = ?
  `).bind(identifier).first();

  if (
    attempt &&
    (
      attempt.blocked_until > now ||
      attempt.attempts >= maxAttempts
    )
  ) {
    return json({
      error:
        "Te veel inlogpogingen. Probeer het over 15 minuten opnieuw."
    }, 429);
  }

  const user = await env.DB.prepare(`
    SELECT id, email, password_hash
    FROM admin_users
    WHERE email = ?
    LIMIT 1
  `).bind(normalizedEmail).first();

  const valid = user
    ? await verifyPassword(
        password,
        user.password_hash
      )
    : false;

  if (!valid) {
    await env.DB.prepare(`
      UPDATE admin_login_attempts
      SET attempts = attempts + 1,
          blocked_until = CASE
            WHEN attempts + 1 >= ? THEN ?
            ELSE blocked_until
          END
      WHERE identifier = ?
    `).bind(
      maxAttempts,
      now + windowMs,
      identifier
    ).run();

    return json(
      { error: "Ongeldige inloggegevens" },
      401
    );
  }

  await env.DB.prepare(`
    DELETE FROM admin_login_attempts
    WHERE identifier = ?
  `).bind(identifier).run();

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
    sessionCookie(
      token,
      SESSION_DAYS * 86400
    )
  );

  return response;
}

// ==========================================
// UITLOGGEN
// ==========================================

async function handleLogout(request, env) {
  if (request.method !== "POST") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  if (!validOrigin(request)) {
    return json(
      { error: "Ongeldige herkomst" },
      403
    );
  }

  const token = getCookie(request, COOKIE_NAME);

  if (token && /^[0-9a-f]{64}$/.test(token)) {
    await env.DB.prepare(`
      DELETE FROM admin_sessions
      WHERE token_hash = ?
    `).bind(
      await sha256(token)
    ).run();
  }

  const response = json({ success: true });

  response.headers.set(
    "Set-Cookie",
    sessionCookie("", 0)
  );

  return response;
}

// ==========================================
// INLOGSESSIE CONTROLEREN
// ==========================================

async function handleMe(request, env) {
  if (request.method !== "GET") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  const user = await currentAdmin(request, env);

  if (!user) {
    return json(
      { authenticated: false },
      401
    );
  }

  return json({
    authenticated: true,
    email: user.email
  });
}

// ==========================================
// KENNISMAKINGSFORMULIER
// BESTAANDE WERKING BEHOUDEN
// ==========================================

async function handleKennismaking(request, env) {
  if (request.method !== "POST") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  try {
    if (!env.DB) {
      throw new Error("D1-binding DB ontbreekt");
    }

    const type =
      request.headers.get("content-type") || "";

    if (!type.toLowerCase().includes("application/json")) {
      return json(
        { error: "JSON vereist" },
        415
      );
    }

    const length = Number(
      request.headers.get("content-length")
    );

    if (length > 20000) {
      return json(
        { error: "Aanvraag te groot" },
        413
      );
    }

    const raw = await request.text();

    if (raw.length > 20000) {
      return json(
        { error: "Aanvraag te groot" },
        413
      );
    }

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      return json(
        { error: "Ongeldige JSON" },
        400
      );
    }

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      return json(
        { error: "Ongeldige aanvraag" },
        400
      );
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
      return json(
        { error: "Ongeldige formuliergegevens" },
        400
      );
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
          item =>
            typeof item !== "string" ||
            item.length > 200
        )
      ) {
        return json(
          { error: `Ongeldige waarde: ${key}` },
          400
        );
      }
    }

    for (const key of [
      "clients",
      "challenge",
      "photos",
      "budget"
    ]) {
      if (
        typeof data[key] !== "string" ||
        data[key].length > 200
      ) {
        return json(
          { error: `Ongeldige waarde: ${key}` },
          400
        );
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

    return json({
      success: true,
      id
    }, 201);

  } catch (error) {
    console.error(
      "Kennismaking opslaan mislukt:",
      error
    );

    return json(
      { error: "Opslaan mislukt" },
      500
    );
  }
}

// ==========================================
// DASHBOARD — ALLE AANVRAGEN
// ==========================================

async function handleAdminRequests(request, env) {
  if (request.method !== "GET") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  const auth = await requireAdmin(request, env);

  if (auth.error) return auth.error;

  const result = await env.DB.prepare(`
    SELECT
      id,
      company,
      activities,
      clients,
      existing_tools,
      acquisition,
      services,
      challenge,
      photos,
      budget,
      notes,
      language,
      consent,
      consent_at,
      status,
      admin_notes,
      created_at,
      updated_at
    FROM kennismakingen
    ORDER BY created_at DESC, id DESC
    LIMIT 1000
  `).all();

  const requests = result.results || [];

  const stats = {
    total: requests.length,
    nieuw: 0,
    opvolgen: 0,
    afgerond: 0
  };

  for (const item of requests) {
    if (STATUSES.includes(item.status)) {
      stats[item.status]++;
    }
  }

  return json({
    success: true,
    requests,
    stats,
    limit: 1000,
    has_more: requests.length === 1000
  });
}

// ==========================================
// DASHBOARD — EEN AANVRAAG BEKIJKEN
// ==========================================

async function handleAdminRequestDetail(
  request,
  env,
  id
) {
  if (request.method !== "GET") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  const auth = await requireAdmin(request, env);

  if (auth.error) return auth.error;

  const item = await env.DB.prepare(`
    SELECT *
    FROM kennismakingen
    WHERE id = ?
    LIMIT 1
  `).bind(id).first();

  if (!item) {
    return json(
      { error: "Aanvraag niet gevonden" },
      404
    );
  }

  return json({
    success: true,
    request: item
  });
}

// ==========================================
// DASHBOARD — STATUS EN NOTITIES OPSLAAN
// ==========================================

async function handleAdminRequestUpdate(
  request,
  env,
  id
) {
  if (request.method !== "PATCH") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  if (!validOrigin(request)) {
    return json(
      { error: "Ongeldige herkomst" },
      403
    );
  }

  const auth = await requireAdmin(request, env);

  if (auth.error) return auth.error;

  let data;

  try {
    data = await readJson(request);
  } catch {
    return json(
      { error: "Ongeldige aanvraag" },
      400
    );
  }

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    return json(
      { error: "Ongeldige gegevens" },
      400
    );
  }

  const hasStatus = Object.prototype.hasOwnProperty.call(
    data,
    "status"
  );

  const hasNotes = Object.prototype.hasOwnProperty.call(
    data,
    "admin_notes"
  );

  if (!hasStatus && !hasNotes) {
    return json(
      { error: "Geen wijzigingen opgegeven" },
      400
    );
  }

  if (
    hasStatus &&
    !STATUSES.includes(data.status)
  ) {
    return json(
      { error: "Ongeldige status" },
      400
    );
  }

  if (
    hasNotes &&
    (
      typeof data.admin_notes !== "string" ||
      data.admin_notes.length > 5000
    )
  ) {
    return json(
      { error: "Notities mogen maximaal 5000 tekens bevatten" },
      400
    );
  }

  const existing = await env.DB.prepare(`
    SELECT id, status, admin_notes
    FROM kennismakingen
    WHERE id = ?
    LIMIT 1
  `).bind(id).first();

  if (!existing) {
    return json(
      { error: "Aanvraag niet gevonden" },
      404
    );
  }

  const status = hasStatus
    ? data.status
    : existing.status;

  const adminNotes = hasNotes
    ? data.admin_notes.trim()
    : existing.admin_notes;

  await env.DB.prepare(`
    UPDATE kennismakingen
    SET status = ?,
        admin_notes = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    status,
    adminNotes,
    id
  ).run();

  const updated = await env.DB.prepare(`
    SELECT *
    FROM kennismakingen
    WHERE id = ?
    LIMIT 1
  `).bind(id).first();

  return json({
    success: true,
    message: "Wijzigingen opgeslagen",
    request: updated
  });
}

// ==========================================
// DASHBOARD — CSV EXPORT
// ==========================================

function csvSafe(value) {
  let text = String(value ?? "");

  // Voorkom formule-uitvoering in spreadsheetsoftware.
  if (/^[\s]*[=+\-@\t\r]/.test(text)) {
    text = "'" + text;
  }

  return '"' + text.replace(/"/g, '""') + '"';
}

function csvRow(values) {
  return values.map(csvSafe).join(";");
}

async function handleAdminExport(request, env) {
  if (request.method !== "GET") {
    return json(
      { error: "Methode niet toegestaan" },
      405
    );
  }

  const auth = await requireAdmin(request, env);

  if (auth.error) return auth.error;

  const result = await env.DB.prepare(`
    SELECT *
    FROM kennismakingen
    ORDER BY created_at DESC, id DESC
  `).all();

  if (!result.success) {
    throw new Error("CSV-query mislukt");
  }

  const columns = [
    ["id", "ID"],
    ["company", "Bedrijf"],
    ["activities", "Activiteiten"],
    ["clients", "Klanten"],
    ["existing_tools", "Bestaande tools"],
    ["acquisition", "Klantenwerving"],
    ["services", "Gewenste diensten"],
    ["challenge", "Uitdaging"],
    ["photos", "Foto's"],
    ["budget", "Budget"],
    ["notes", "Opmerkingen klant"],
    ["language", "Taal"],
    ["consent", "Toestemming"],
    ["consent_at", "Toestemming datum"],
    ["status", "Status"],
    ["admin_notes", "Interne notities"],
    ["created_at", "Aangemaakt"],
    ["updated_at", "Bijgewerkt"]
  ];

  const lines = [
    csvRow(columns.map(column => column[1]))
  ];

  for (const item of result.results || []) {
    lines.push(
      csvRow(
        columns.map(column => item[column[0]])
      )
    );
  }

  const csv = "\uFEFF" + lines.join("\r\n");

  const date = new Date()
    .toISOString()
    .slice(0, 10);

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        `attachment; filename="upside-aanvragen-${date}.csv"`,
      "Cache-Control": "no-store, private",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

// ==========================================
// ROUTES
// ==========================================

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {

      // Publiek kennismakingsformulier
      if (path === "/api/kennismaking") {
        return await handleKennismaking(
          request,
          env
        );
      }

      // Registratie
      if (path === "/api/admin/setup") {
        return await handleSetup(
          request,
          env
        );
      }

      // Login
      if (path === "/api/admin/login") {
        return await handleLogin(
          request,
          env
        );
      }

      // Logout
      if (path === "/api/admin/logout") {
        return await handleLogout(
          request,
          env
        );
      }

      // Sessiestatus
      if (path === "/api/admin/me") {
        return await handleMe(
          request,
          env
        );
      }

      // Alle aanvragen
      if (path === "/api/admin/requests") {
        return await handleAdminRequests(
          request,
          env
        );
      }

      // CSV-export
      if (path === "/api/admin/export") {
        return await handleAdminExport(
          request,
          env
        );
      }

      // Individuele aanvragen
      const match = path.match(
        /^\/api\/admin\/requests\/([0-9a-f-]{36})$/
      );

      if (match) {
        const id = match[1];

        if (request.method === "GET") {
          return await handleAdminRequestDetail(
            request,
            env,
            id
          );
        }

        if (request.method === "PATCH") {
          return await handleAdminRequestUpdate(
            request,
            env,
            id
          );
        }

        return json(
          { error: "Methode niet toegestaan" },
          405
        );
      }

      // Geen andere admin-API's beschikbaar
      if (path.startsWith("/api/admin/")) {
        return json(
          { error: "Niet gevonden" },
          404
        );
      }

      // Bestaande website
      return env.ASSETS.fetch(request);

    } catch (error) {
      console.error(
        "Upside Worker-fout:",
        error
      );

      return json(
        { error: "Interne serverfout" },
        500
      );
    }
  }
};
