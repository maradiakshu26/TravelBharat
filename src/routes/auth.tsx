import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Sign in — TravelBharat" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        setInfo("Account created. If email confirmation is enabled, check your inbox. Otherwise you can sign in now.");
        setMode("signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { num: 1, title: mode === "signin" ? "Enter your email" : "Choose Sign Up", desc: mode === "signin" ? "Type the email you registered with." : "Click the link below the form to switch to Create account." },
    { num: 2, title: "Enter your password", desc: "Use at least 6 characters. Keep it secure." },
    { num: 3, title: mode === "signin" ? "Click Sign in" : "Click Create account", desc: mode === "signin" ? "You will be taken to the admin dashboard." : "Check your inbox for a confirmation link if required." },
  ];

  return (
    <div className="min-h-[70vh] px-6 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Step-by-step guide */}
        <div className="border border-border bg-card p-8">
          <h2 className="text-2xl font-serif mb-2">How to {mode === "signin" ? "sign in" : "create an account"}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Follow these simple steps to access TravelBharat admin.
          </p>
          <ol className="space-y-5">
            {steps.map((s) => (
              <li key={s.num} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {s.num}
                </span>
                <div>
                  <p className="font-semibold text-sm">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 p-4 bg-muted/50 text-sm text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> If you forget your password, contact the site owner to reset it.
          </div>
        </div>

        {/* Auth form */}
        <div className="border border-border bg-card p-8">
          <h1 className="text-3xl font-serif mb-2">{mode === "signin" ? "Sign in" : "Create account"}</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Admin access to TravelBharat content management.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-primary">{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 text-sm uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 text-sm text-muted-foreground hover:text-primary"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
