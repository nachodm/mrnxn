import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/supabase.types";
import { useEffect, useState } from "react";

export type Marker = { lat: number; lng: number; review: number; id: number };

type UseRestaurantMarkersResult = {
  restaurants: Tables<"restaurant_reviews">[];
  loading: boolean;
  error: string | null;
};

function isValidCoordinate(lat: number | null, lng: number | null): boolean {
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    !(lat === 0 && lng === 0)
  );
}

export function useRestaurantMarkers(): UseRestaurantMarkersResult {
  const [restaurants, setRestaurants] = useState<
    Tables<"restaurant_reviews">[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    let cancelled = false;

    async function fetchRestaurants() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("restaurant_reviews")
        .select("*");

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const allRestaurants = data ?? [];
      setRestaurants(allRestaurants);

      setLoading(false);
    }

    fetchRestaurants();

    return () => {
      cancelled = true;
    };
  }, []);

  return { restaurants, loading, error };
}
