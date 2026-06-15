import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { statesQuery } from "@/lib/catalog";

export const Route = createFileRoute("/states")({
  head: () => ({
    meta: [
      { title: "States & Union Territories — TravelBharat" },
      { name: "description", content: "Explore tourist destinations across every Indian state and union territory — heritage, nature, religious and adventure travel." },
      { property: "og:title", content: "Explore Indian States — TravelBharat" },
      { property: "og:description", content: "Browse state-wise tourist places across India in one place." },
    ],
  }),
  component: StatesPage,
});

function StatesPage() {
  const { data: states, isLoading } = useQuery(statesQuery);

  return (
    <div>
      <section className="py-20 px-6 bg-foreground text-background">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron mb-4 block">
            Encyclopedia of India
          </span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Browse by <span className="italic">State</span>
          </h1>
          <p className="max-w-xl text-background/60 text-lg leading-relaxed">
            Discover tourist places organised state-wise across India — from the Himalayas to the southern coasts.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          {isLoading && <p className="text-muted-foreground">Loading states…</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {states?.map((s) => (
              <Link
                key={s.id}
                to="/states/$state"
                params={{ state: s.slug }}
                className="group block border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {s.cover_image && (
                    <img
                      src={s.cover_image}
                      alt={s.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    <MapPin size={12} /> {s.region ?? "India"}
                  </div>
                  <h2 className="text-2xl font-serif mb-2">{s.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
