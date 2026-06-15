import { useState } from "react";
import { Star, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

interface EnquiryFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const ALLOWED_REGIONS = [
  "Royal Rajasthan",
  "Himalayan Peaks",
  "Southern Sanctuaries",
  "Cultural Heartland",
  "Wildlife Trails",
] as const;

const enquirySchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(200, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .regex(/^[+\d\s\-()]*$/, "Phone number contains invalid characters")
    .optional()
    .or(z.literal("")),
  region: z.enum(ALLOWED_REGIONS, { errorMap: () => ({ message: "Please select a valid region" }) }),
  message: z.string().trim().max(2000, "Message is too long").optional().or(z.literal("")),
});

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

    const parsed = enquirySchema.safeParse({
      full_name: formData.get("full_name") ?? "",
      email: formData.get("email") ?? "",
      phone: formData.get("phone") ?? "",
      region: formData.get("region") ?? "",
      message: formData.get("message") ?? "",
    });

    if (!parsed.success) {
      setLoading(false);
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    const { error: insertError } = await supabase.from("enquiries").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      phone: parsed.data.phone ? parsed.data.phone : null,
      region: parsed.data.region,
      message: parsed.data.message ? parsed.data.message : null,
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
