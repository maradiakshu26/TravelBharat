import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://id-preview--6fc1cb28-e288-45fd-87e2-39a2e569a668.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_PUBLISHABLE_KEY;
        let stateEntries: { slug: string }[] = [];
        let placeEntries: { slug: string; state: string }[] = [];
        if (url && key) {
          const sb = createClient(url, key);
          const [{ data: states }, { data: places }] = await Promise.all([
            sb.from("states").select("slug"),
            sb.from("tourist_places").select("slug, states(slug)").eq("is_published", true),
          ]);
          stateEntries = states ?? [];
          placeEntries =
            places?.map((p: { slug: string; states: { slug: string } | { slug: string }[] | null }) => {
              const st = Array.isArray(p.states) ? p.states[0] : p.states;
              return { slug: p.slug, state: st?.slug ?? "" };
            }).filter((p) => p.state) ?? [];
        }

        const staticPaths = ["/", "/states", "/destinations", "/contact"];
        const urls = [
          ...staticPaths.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`),
          ...stateEntries.map((s) => `<url><loc>${BASE_URL}/states/${s.slug}</loc></url>`),
          ...placeEntries.map((p) => `<url><loc>${BASE_URL}/places/${p.state}/${p.slug}</loc></url>`),
        ].join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
