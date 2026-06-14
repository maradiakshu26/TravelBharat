import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import { EnquiryForm } from "../components/EnquiryForm";
import heroImg from "../assets/hero-taj-mahal.jpg";
import destRajasthan from "../assets/dest-rajasthan.jpg";
import destKerala from "../assets/dest-kerala.jpg";
import destJodhpur from "../assets/dest-jodhpur.jpg";
import destVaranasi from "../assets/dest-varanasi.jpg";
import destMunnar from "../assets/dest-munnar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TravelBharat — Discover the Soul of India" },
      { name: "description", content: "Curated travel experiences across India. From Rajasthan's golden deserts to Kerala's emerald backwaters." },
      { property: "og:title", content: "TravelBharat — Discover the Soul of India" },
      { property: "og:description", content: "Curated travel experiences across India. From Rajasthan's golden deserts to Kerala's emerald backwaters." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <JourneysSection />
      <TestimonialsSection />
      <EnquirySection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block mb-4 text-saffron font-medium tracking-[0.2em] uppercase text-xs">
              Experience the Soul of Asia
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-[1.1] text-foreground">
              Unveiling the <br />
              <span className="italic">Majesty of India</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed">
              From the golden sands of Jaisalmer to the emerald backwaters of Kerala, journey through a land where every corner tells a timeless story.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 rounded-sm bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition-colors hover:bg-foreground/90"
              >
                Explore Destinations
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-8 py-4 text-sm font-medium uppercase tracking-widest text-foreground transition-colors hover:bg-secondary"
              >
                View Tour Packages
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <img
              src={heroImg}
              alt="Taj Mahal at sunrise with golden light"
              className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl"
              width={1024}
              height={1280}
            />
            <div className="absolute -bottom-6 -left-6 bg-primary p-6 lg:p-8 text-primary-foreground hidden md:block max-w-xs">
              <p className="font-serif text-xl lg:text-2xl italic leading-snug">
                "The journey of a lifetime begins here."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const destinations = [
  {
    title: "The Blue City",
    subtitle: "Rajasthan",
    image: destJodhpur,
    description: "Vibrant indigo alleyways beneath the mighty Mehrangarh Fort.",
    featured: true,
  },
  {
    title: "Venice of the East",
    subtitle: "Kerala",
    image: destKerala,
    description: "Serene backwaters and palm-fringed canals.",
  },
  {
    title: "The Eternal City",
    subtitle: "Uttar Pradesh",
    image: destVaranasi,
    description: "Spiritual ceremonies on the sacred Ganges.",
  },
  {
    title: "Land of Kings",
    subtitle: "Rajasthan",
    image: destRajasthan,
    description: "Golden dunes, camel caravans, and desert sunsets.",
    featured: true,
  },
  {
    title: "Tea Country",
    subtitle: "Kerala",
    image: destMunnar,
    description: "Rolling emerald hills covered in fragrant tea gardens.",
  },
];

function DestinationsSection() {
  return (
    <section className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-serif mb-4">Curated Destinations</h2>
            <p className="text-background/60 max-w-sm">
              Handpicked locales that capture the diverse essence of the Indian subcontinent.
            </p>
          </div>
          <Link
            to="/destinations"
            className="text-sm font-medium border-b border-saffron pb-1 text-saffron hover:text-background transition-colors"
          >
            VIEW ALL DESTINATIONS
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map((dest) => (
            <div key={dest.title} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm mb-6">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1024}
                  height={1280}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl font-serif mb-2">{dest.title}</h3>
              <p className="text-sm text-background/50 uppercase tracking-widest">{dest.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const journeys = [
  {
    title: "The Heritage Circuit",
    duration: "12 Days",
    category: "Culture",
    price: "₹85,000",
    description: "A deep dive into the palaces of Jaipur, Jodhpur, and the lakes of Udaipur.",
    icon: Compass,
  },
  {
    title: "Ayurvedic Sanctuary",
    duration: "8 Days",
    category: "Wellness",
    price: "₹62,000",
    description: "Rejuvenating yoga and traditional healing in the lush foothills of the Himalayas.",
    icon: Star,
  },
  {
    title: "Royal Tiger Safari",
    duration: "10 Days",
    category: "Wildlife",
    price: "₹1,12,000",
    description: "Tracking the elusive Bengal Tiger through the jungles of Ranthambore.",
    icon: MapPin,
  },
];

function JourneysSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-b border-border pb-12 mb-16">
          <h2 className="text-4xl font-serif">Signature Journeys</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            View all itineraries
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {journeys.map((journey) => (
            <div key={journey.title} className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <journey.icon size={18} className="text-saffron" />
                <div className="text-saffron text-xs font-semibold tracking-widest uppercase">
                  {journey.duration} / {journey.category}
                </div>
              </div>
              <h4 className="text-2xl font-serif">{journey.title}</h4>
              <p className="max-w-[40ch] text-pretty text-sm text-muted-foreground leading-relaxed">
                {journey.description}
              </p>
              <div className="pt-4 text-xl font-medium">
                {journey.price}{" "}
                <span className="text-sm font-normal text-muted-foreground">/ person</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="h-12 w-px bg-saffron" />
        </div>
        <p className="font-serif text-3xl italic leading-tight text-foreground mb-8">
          "The attention to detail was exceptional. We didn't just see the sights; we felt the rhythm of local life in a way that felt entirely authentic."
        </p>
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-border ring-1 ring-black/5 flex items-center justify-center">
            <span className="text-sm font-serif font-semibold">ER</span>
          </div>
          <span className="mt-4 text-sm font-semibold uppercase tracking-widest">Elena Rossi</span>
          <span className="text-xs text-muted-foreground mt-1">Travel Photographer, Milan</span>
        </div>
      </div>
    </section>
  );
}

function EnquirySection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl bg-card border border-border p-10 md:p-16 shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4 text-foreground">Plan Your Odyssey</h2>
          <p className="text-muted-foreground">
            Leave your details and our travel specialists will craft your perfect Indian escape.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Star className="text-primary" size={28} />
            </div>
            <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Our travel specialists will reach out within 24 hours to begin crafting your journey.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Arjun Sharma"
                className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="arjun@example.com"
                className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Desired Region
              </label>
              <select className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer">
                <option>Royal Rajasthan</option>
                <option>Himalayan Peaks</option>
                <option>Southern Sanctuaries</option>
                <option>Cultural Heartland</option>
                <option>Wildlife Trails</option>
              </select>
            </div>
            <div className="md:col-span-2 pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-widest uppercase text-sm hover:bg-foreground transition-colors shadow-lg shadow-primary/10"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
