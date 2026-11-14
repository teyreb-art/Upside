
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/kennismaking") {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Methode niet toegestaan" },
          { status: 405, headers: { Allow: "POST" } }
        );
      }

      try {
        if (!env.DB) {
          throw new Error("D1-binding DB ontbreekt");
        }

        const type = request.headers.get("content-type") || "";
        if (!type.toLowerCase().includes("application/json")) {
          return Response.json(
            { error: "JSON vereist" },
            { status: 415 }
          );
        }

        const length = Number(request.headers.get("content-length"));
        if (length > 20000) {
          return Response.json(
            { error: "Aanvraag te groot" },
            { status: 413 }
          );
        }

        const raw = await request.text();
        if (raw.length > 20000) {
          return Response.json(
            { error: "Aanvraag te groot" },
            { status: 413 }
          );
        }

        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          return Response.json(
            { error: "Ongeldige JSON" },
            { status: 400 }
          );
        }

        if (!data || typeof data !== "object" || Array.isArray(data)) {
          return Response.json(
            { error: "Ongeldige aanvraag" },
            { status: 400 }
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
          return Response.json(
            { error: "Ongeldige formuliergegevens" },
            { status: 400 }
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
              item => typeof item !== "string" || item.length > 200
            )
          ) {
            return Response.json(
              { error: `Ongeldige waarde: ${key}` },
              { status: 400 }
            );
          }
        }

        for (const key of ["clients", "challenge", "photos", "budget"]) {
          if (
            typeof data[key] !== "string" ||
            data[key].length > 200
          ) {
            return Response.json(
              { error: `Ongeldige waarde: ${key}` },
              { status: 400 }
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

        return Response.json(
          { success: true, id },
          { status: 201 }
        );

      } catch (error) {
        console.error("Kennismaking opslaan mislukt:", error);

        return Response.json(
          { error: "Opslaan mislukt" },
          { status: 500 }
        );
      }
    }

    return env.ASSETS.fetch(request);
  }
};
