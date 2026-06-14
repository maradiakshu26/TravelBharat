import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/destinations", label: "Destinations" },
    { to: "/contact", label: "Plan Your Trip" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-primary">
          TravelBharat
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-terracotta/90"
        >
          Enquire Now
        </Link>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-6 py-6 bg-background">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Enquire Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
