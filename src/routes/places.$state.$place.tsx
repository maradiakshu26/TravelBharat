import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, IndianRupee, MapPin, ExternalLink } from "lucide-react";
import { placeBySlugQuery } from "@/lib/catalog";

export const Route = createFileRoute("/places/$state/$place")({
  head: ({ params }) => ({
    meta: [
      { title: `${formatSlug(params.place)} — TravelBharat` },
      { name: "description", content: `Plan your visit to ${formatSlug(params.place)} in ${formatSlug(params.state)} — history, timings, best time to visit and nearby attractions.` },
      { property: "og:title", content: `${formatSlug(params.place)} — TravelBharat` },
      { property: "og:description", content: `Visit ${formatSlug(params.place)} in ${formatSlug(params.state)}.` },
    ],
  }),
  component: PlacePage,
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="text-3xl font-serif mb-4">Destination not found</h1>
      <Link to="/destinations" className="text-primary underline">Browse destinations</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-32 text-center">
      <h1 className="text-3xl font-serif mb-4">Couldn’t load destination</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function formatSlug(slug: string) {
  return slug.split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ");
}

type Nearby = { name: string; distance?: string };

function PlacePage() {
  const { place: slug, state: stateSlug } = Route.useParams();
  const { data: place, isLoading } = useQuery(placeBySlugQuery(slug));

  if (isLoading) return <div className="py-32 text-center text-muted-foreground">Loading…</div>;
  if (!place) throw notFound();

  const nearby = (Array.isArray(place.nearby_attractions) ? place.nearby_attractions : []) as Nearby[];

  return (
    <article>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        {place.cover_image && (
          <img src={place.cover_image} alt={place.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-foreground/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-12 text-background">
          <Link to="/states/$state" params={{ state: stateSlug }} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-background/80 hover:text-saffron mb-4">
            <ArrowLeft size={14} /> Back to {place.states?.name}
          </Link>
          {place.categories?.name && (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron mb-2">{place.categories.name}</span>
          )}
          <h1 className="text-5xl md:text-6xl font-serif">{place.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-background/80">
            <MapPin size={14} /> {place.cities?.name ? `${place.cities.name}, ` : ""}{place.states?.name}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {place.description && (
              <div>
                <h2 className="text-2xl font-serif mb-4">Overview</h2>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{place.description}</p>
              </div>
            )}
            {place.history && (
              <div>
                <h2 className="text-2xl font-serif mb-4">History</h2>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{place.history}</p>
              </div>
            )}
            {nearby.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif mb-4">Nearby attractions</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {nearby.map((n, i) => (
                    <li key={i} className="border border-border bg-card px-4 py-3 text-sm flex items-center justify-between">
                      <span>{n.name}</span>
                      {n.distance && <span className="text-xs text-muted-foreground">{n.distance}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="border border-border bg-card p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-saffron">Travel info</h3>
              {place.best_time_to_visit && (
                <div className="flex gap-3 text-sm">
                  <Calendar size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Best time to visit</div>
                    <div className="text-muted-foreground">{place.best_time_to_visit}</div>
                  </div>
                </div>
              )}
              {place.timings && (
                <div className="flex gap-3 text-sm">
                  <Clock size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Timings</div>
                    <div className="text-muted-foreground">{place.timings}</div>
                  </div>
                </div>
              )}
              {place.entry_fee && (
                <div className="flex gap-3 text-sm">
                  <IndianRupee size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Entry fee</div>
                    <div className="text-muted-foreground">{place.entry_fee}</div>
                  </div>
                </div>
              )}
              {place.map_link && (
                <a
                  href={place.map_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Open in maps <ExternalLink size={12} />
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
