import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { placesQuery, statesQuery, categoriesQuery } from "@/lib/catalog";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "All Destinations — TravelBharat" },
      { name: "description", content: "Search and filter all Indian tourist destinations by state, city or category." },
      { property: "og:title", content: "All Destinations — TravelBharat" },
      { property: "og:description", content: "Search Indian tourist destinations by state, city or category." },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const { data: places } = useQuery(placesQuery);
  const { data: states } = useQuery(statesQuery);
  const { data: categories } = useQuery(categoriesQuery);

  const [q, setQ] = useState("");
  const [state, setState] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    if (!places) return [];
    const needle = q.trim().toLowerCase();
    return places.filter((p) => {
      if (state && p.states?.slug !== state) return false;
      if (category && p.categories?.slug !== category) return false;
      if (!needle) return true;
      return (
        p.name.toLowerCase().includes(needle) ||
        p.short_description?.toLowerCase().includes(needle) ||
        p.cities?.name.toLowerCase().includes(needle) ||
        p.states?.name.toLowerCase().includes(needle)
      );
    });
  }, [places, q, state, category]);

  return (
    <div>
      <section className="py-16 px-6 bg-foreground text-background">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron mb-4 block">
            Search & Discover
          </span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">All <span className="italic">Destinations</span></h1>

          <div className="mt-8 grid md:grid-cols-3 gap-3">
            <div className="relative md:col-span-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by place, city…"
                className="w-full bg-background text-foreground pl-10 pr-4 py-3 text-sm rounded-sm"
              />
            </div>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-background text-foreground px-4 py-3 text-sm rounded-sm"
            >
              <option value="">All states</option>
              {states?.map((s) => (
                <option key={s.id} value={s.slug}>{s.name}</option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-background text-foreground px-4 py-3 text-sm rounded-sm"
            >
              <option value="">All categories</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-muted-foreground mb-8">{filtered.length} destinations</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to="/places/$state/$place"
                params={{ state: p.states!.slug, place: p.slug }}
                className="group block border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {p.cover_image && (
                    <img
                      src={p.cover_image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    <MapPin size={12} className="text-saffron" />
                    {p.cities?.name ? `${p.cities.name}, ` : ""}{p.states?.name}
                  </div>
                  <h3 className="text-xl font-serif mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.short_description}</p>
                  <div className="mt-3 text-xs uppercase tracking-widest text-primary">
                    {p.categories?.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
