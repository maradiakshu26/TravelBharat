import { useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EnquiryFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export function EnquiryForm({ onSuccess, compact }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error: insertError } = await supabase.from("enquiries").insert({
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || null,
      region: formData.get("region") as string,
      message: (formData.get("message") as string) || null,
    });

    setLoading(false);

    if (insertError) {
      setError("Something went wrong. Please try again or email us directly.");
      return;
    }

    setSubmitted(true);
    onSuccess?.();
    form.reset();
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Star className="text-primary" size={28} />
        </div>
        <h3 className="text-2xl font-serif mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Our travel specialists will reach out within 24 hours to begin crafting your journey.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-6" : "space-y-8"}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name *
          </label>
          <input
            name="full_name"
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
            name="email"
            type="email"
            required
            placeholder="arjun@example.com"
            className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {!compact && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Phone Number
            </label>
            <input
              name="phone"
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
              name="region"
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
      )}

      {compact && (
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Desired Region *
          </label>
          <select
            name="region"
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
      )}

      {!compact && (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tell us about your dream trip
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="What experiences are you looking for? Any must-see places?"
            className="w-full px-0 py-3 border-b border-border bg-transparent focus:border-primary focus:outline-none transition-colors resize-none"
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className={compact ? "pt-6" : "pt-2"}>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-10 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground hover:bg-foreground transition-colors shadow-lg shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}
