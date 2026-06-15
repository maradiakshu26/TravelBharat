import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin } from "lucide-react";
import { stateBySlugQuery } from "@/lib/catalog";

export const Route = createFileRoute("/states/$state")({
  head: ({ params }) => ({
    meta: [
      { title: `${formatSlug(params.state)} Tourist Places — TravelBharat` },
      { name: "description", content: `Explore tourist destinations, cities and attractions in ${formatSlug(params.state)}.` },
      { property: "og:title", content: `${formatSlug(params.state)} — TravelBharat` },
      { property: "og:description", content: `State-wise tourist places in ${formatSlug(params.state)}.` },
    ],
  }),
  component: StateDetailPage,
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="text-3xl font-serif mb-4">State not found</h1>
      <Link to="/states" className="text-primary underline">Back to states</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="py-32 text-center">
      <h1 className="text-3xl font-serif mb-4">Couldn’t load state</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function formatSlug(slug: string) {
  return slug.split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ");
}

function StateDetailPage() {
  const { state: slug } = Route.useParams();
  const { data: state, isLoading } = useQuery(stateBySlugQuery(slug));

  if (isLoading) return <div className="py-32 text-center text-muted-foreground">Loading…</div>;
  if (!state) throw notFound();

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {state.cover_image && (
          <img src={state.cover_image} alt={state.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-12 text-background">
          <Link to="/states" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-background/80 hover:text-saffron mb-4">
            <ArrowLeft size={14} /> All states
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron mb-2">{state.region}</span>
          <h1 className="text-5xl md:text-6xl font-serif">{state.name}</h1>
          <p className="mt-4 max-w-2xl text-background/80">{state.summary}</p>
        </div>
      </section>

      {state.cities && state.cities.length > 0 && (
        <section className="py-16 px-6 border-b border-border">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-serif mb-6">Cities</h2>
            <div className="flex flex-wrap gap-3">
              {state.cities.map((c) => (
                <span key={c.id} className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm">
                  <MapPin size={12} className="text-saffron" />
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-serif mb-10">Tourist Places in {state.name}</h2>
          {(!state.tourist_places || state.tourist_places.length === 0) && (
            <p className="text-muted-foreground">No published destinations yet.</p>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {state.tourist_places?.map((p) => (
              <Link
                key={p.id}
                to="/places/$state/$place"
                params={{ state: state.slug, place: p.slug }}
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
                    {p.categories?.name ?? "Destination"}
                    {p.cities?.name ? ` · ${p.cities.name}` : ""}
                  </div>
                  <h3 className="text-xl font-serif mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.short_description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
