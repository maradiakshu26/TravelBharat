import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { EnquiryForm } from "../components/EnquiryForm";

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
          <div className="mb-10">
            <h2 className="text-3xl font-serif mb-2">Your Details</h2>
            <p className="text-muted-foreground text-sm">
              Tell us a bit about yourself and the journey you envision.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
