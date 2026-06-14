import { createFileRoute } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import destJodhpur from "../assets/dest-jodhpur.jpg";
import destKerala from "../assets/dest-kerala.jpg";
import destVaranasi from "../assets/dest-varanasi.jpg";
import destRajasthan from "../assets/dest-rajasthan.jpg";
import destMunnar from "../assets/dest-munnar.jpg";
import heroImg from "../assets/hero-taj-mahal.jpg";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — TravelBharat" },
      { name: "description", content: "Explore India's most captivating destinations from Rajasthan's deserts to Kerala's backwaters." },
      { property: "og:title", content: "Destinations — TravelBharat" },
      { property: "og:description", content: "Explore India's most captivating destinations from Rajasthan's deserts to Kerala's backwaters." },
    ],
  }),
  component: DestinationsPage,
});

const allDestinations = [
  {
    title: "The Blue City",
    location: "Jodhpur, Rajasthan",
    image: destJodhpur,
    description: "Wander through vibrant indigo alleyways beneath the mighty Mehrangarh Fort. One of India's most photogenic cities.",
    highlight: "Heritage",
  },
  {
    title: "Venice of the East",
    location: "Alleppey, Kerala",
    image: destKerala,
    description: "Drift through serene backwaters on a traditional houseboat, surrounded by palm-fringed canals and emerald paddy fields.",
    highlight: "Nature",
  },
  {
    title: "The Eternal City",
    location: "Varanasi, Uttar Pradesh",
    image: destVaranasi,
    description: "Witness spiritual ceremonies on the sacred Ganges at dawn. The oldest living city in the world.",
    highlight: "Spiritual",
  },
  {
    title: "Land of Kings",
    location: "Jaisalmer, Rajasthan",
    image: destRajasthan,
    description: "Sleep under the stars in golden dunes, explore living forts, and follow ancient camel caravan routes.",
    highlight: "Adventure",
  },
  {
    title: "Tea Country",
    location: "Munnar, Kerala",
    image: destMunnar,
    description: "Trek through rolling emerald hills covered in fragrant tea gardens and mist-covered valleys.",
    highlight: "Nature",
  },
  {
    title: "Crown of India",
    location: "Agra, Uttar Pradesh",
    image: heroImg,
    description: "Stand before the Taj Mahal at sunrise — a monument to love that has captivated travelers for centuries.",
    highlight: "Heritage",
  },
];

function DestinationsPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-20 px-6 bg-foreground text-background">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron mb-4 block">
            Explore India
          </span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Curated <span className="italic">Discoveries</span>
          </h1>
          <p className="max-w-xl text-background/60 text-lg leading-relaxed">
            Handpicked locales that capture the architectural grandeur, spiritual depth, and natural beauty of the Indian subcontinent.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDestinations.map((dest) => (
              <article
                key={dest.title}
                className="group cursor-pointer border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1024}
                    height={768}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/90 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
                      {dest.highlight}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                    <MapPin size={12} />
                    <span className="uppercase tracking-wider">{dest.location}</span>
                  </div>
                  <h3 className="text-xl font-serif mb-3">{dest.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {dest.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-primary group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
