import { supabase } from "@/integrations/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export const statesQuery = queryOptions({
  queryKey: ["states"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("states")
      .select("id, name, slug, region, summary, cover_image")
      .order("name");
    if (error) throw error;
    return data;
  },
});

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description")
      .order("name");
    if (error) throw error;
    return data;
  },
});

export const placesQuery = queryOptions({
  queryKey: ["places", "all"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("tourist_places")
      .select(
        "id, name, slug, short_description, cover_image, state_id, city_id, category_id, states(name, slug), cities(name, slug), categories(name, slug)",
      )
      .eq("is_published", true)
      .order("name");
    if (error) throw error;
    return data;
  },
});

export const stateBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["state", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("states")
        .select(
          "id, name, slug, region, summary, cover_image, cities(id, name, slug, summary), tourist_places(id, name, slug, short_description, cover_image, categories(name, slug), cities(name, slug))",
        )
        .eq("slug", slug)
        .eq("tourist_places.is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const placeBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["place", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tourist_places")
        .select(
          "*, states(name, slug), cities(name, slug), categories(name, slug)",
        )
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
