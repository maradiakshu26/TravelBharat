import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Plan Your Trip — TravelBharat" },
      { name: "description", content: "Get in touch with TravelBharat to plan your bespoke Indian adventure." },
      { property: "og:title", content: "Plan Your Trip — TravelBharat" },
      { property: "og:description", content: "Get in touch with TravelBharat to plan your bespoke Indian adventure." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="py-20 px-6 bg-foreground text-background">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-background/60 text-sm mb-6 hover:text-background transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Plan Your <span className="italic">Odyssey</span>
          </h1>
          <p className="max-w-xl text-background/60 text-lg leading-relaxed">
            Our travel specialists are ready to help you craft a bespoke itinerary through the subcontinent.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 border-b border-border">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg mb-1">Call Us</h3>
              <p className="text-sm text-muted-foreground">+91 11 2345 6789</p>
              <p className="text-xs text-muted-foreground mt-1">Mon–Sat, 9am–7pm IST</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg mb-1">Email Us</h3>
              <p className="text-sm text-muted-foreground">voyage@travelbharat.co</p>
              <p className="text-xs text-muted-foreground mt-1">We reply within 24 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h3 className="font-serif text-lg mb-1">Visit Us</h3>
              <p className="text-sm text-muted-foreground">Connaught Place, New Delhi</p>
              <p className="text-xs text-muted-foreground mt-1">By appointment only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          {submitted ? (
            <div className="text-center py-20 bg-card border border-border p-12">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Star className="text-primary" size={28} />
              </div>
              <h2 className="text-3xl font-serif mb-3">Enquiry Received</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Thank you for reaching out. One of our travel specialists will contact you within 24 hours to begin crafting your perfect Indian journey.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground hover:bg-foreground transition-colors"
              >
                <ArrowLeft size={14} /> Return Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif mb-2">Your Details</h2>
                <p className="text-muted-foreground text-sm">
                  Tell us a bit about yourself and the journey you envision.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name *
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="arjun@example.com"
                    className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Desired Region *
                  </label>
                  <select
                    required
                    className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select a region</option>
                    <option>Royal Rajasthan</option>
                    <option>Himalayan Peaks</option>
                    <option>Southern Sanctuaries</option>
                    <option>Cultural Heartland</option>
                    <option>Wildlife Trails</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tell us about your dream trip
                </label>
                <textarea
                  rows={4}
                  placeholder="What experiences are you looking for? Any must-see places?"
                  className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-10 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground hover:bg-foreground transition-colors shadow-lg shadow-primary/10"
              >
                <Send size={14} /> Send Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
