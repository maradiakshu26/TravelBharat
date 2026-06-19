import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Admin — TravelBharat" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user } = Route.useRouteContext();

  const { data: isAdmin, isLoading: roleLoading } = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error) throw error;
      return !!data;
    },
  });

  const { data: places } = useQuery({
  queryKey: ["admin", "places"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  },
  enabled: isAdmin === true,
});

  const { data: enquiries } = useQuery({
    queryKey: ["admin", "enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin === true,
  });

  async function deleteDestination(id: string) {
  const { error } = await supabase
    .from("destinations")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  qc.invalidateQueries({ queryKey: ["admin", "places"] });
}

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (roleLoading) return <div className="py-32 text-center">Checking permissions…</div>;

  if (!isAdmin) {
    return (
      <div className="py-32 text-center px-6">
        <h1 className="text-3xl font-serif mb-4">Not authorised</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You’re signed in as <span className="font-medium">{user.email}</span>, but you don’t have admin access.
          Ask your Lovable Cloud admin to grant the <code className="px-1 bg-secondary">admin</code> role.
        </p>
        <button onClick={signOut} className="mt-6 text-sm underline">Sign out</button>
      </div>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
       <div className="flex items-center justify-between mb-10">
  <div>
    <h1 className="text-4xl font-serif">Admin Dashboard</h1>
    <p className="text-sm text-muted-foreground mt-1">
      Signed in as {user.email}
    </p>
  </div>

  <div className="flex gap-3">
    <button
      onClick={() => navigate({ to: "/add-destination" })}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Add Destination
    </button>

    <button
      onClick={signOut}
      className="text-sm underline"
    >
      Sign Out
    </button>
  </div>
</div>
        <section className="mb-16">
          <h2 className="text-2xl font-serif mb-4">Destinations ({places?.length ?? 0})</h2>
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {places?.map((p) => (
                  <tr key={p.id} className="border-t border-border">
  <td className="px-4 py-3 font-medium">
    {p.name}
  </td>

  <td className="px-4 py-3">
    {p.state}
  </td>

  <td className="px-4 py-3">
    {p.category}
  </td>

  <td className="px-4 py-3 text-right">
    <button
      onClick={() => deleteDestination(p.id)}
      className="text-red-500 underline"
    >
      Delete
    </button>
  </td>
</tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif mb-4">Enquiries ({enquiries?.length ?? 0})</h2>
          <div className="space-y-3">
            {enquiries?.length === 0 && <p className="text-muted-foreground text-sm">No enquiries yet.</p>}
            {enquiries?.map((e) => (
              <div key={e.id} className="border border-border bg-card p-4 text-sm">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium">{e.full_name}</span>
                    <span className="text-muted-foreground"> · {e.email}{e.phone ? ` · ${e.phone}` : ""}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</span>
                </div>
                <div className="text-xs uppercase tracking-widest text-saffron mb-2">{e.region}</div>
                {e.message && <p className="text-foreground/80">{e.message}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
