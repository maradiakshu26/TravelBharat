import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start justify-between gap-12 sm:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary">TravelBharat</h3>
            <p className="mt-4 max-w-[35ch] text-pretty text-sm text-muted-foreground">
              A dedicated platform celebrating the architectural, spiritual, and natural wonders of India.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium">Stay inspired by the journey.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full max-w-xs border-b border-border bg-transparent py-2 text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <button className="text-xs font-semibold uppercase tracking-widest hover:text-primary transition-colors">
                Subscribe
              </button>
            </div>
            <div className="mt-4 flex gap-8 text-xs text-muted-foreground">
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Instagram size={16} /> Instagram
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Youtube size={16} /> YouTube
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size={16} /> Journal
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between border-t border-border pt-8 text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row">
          <p>TravelBharat Explorations</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
