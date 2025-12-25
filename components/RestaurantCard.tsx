import { Tables } from "@/utils/supabase/supabase.types";

type RestaurantRow = Tables<"restaurant_reviews">;
interface Restaurant {
  r: RestaurantRow;
}
export const RestaurantCard = (props: Restaurant) => {
  const { r } = props;
  return (
    <div
      key={r.id}
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 flex flex-col"
    >
      <h2 className="text-lg font-semibold text-black dark:text-zinc-50 mb-1">
        {r.name ?? "Unknown Restaurant"}
      </h2>
      {r.review !== null && (
        <p className="text-sm font-medium text-amber-500 mb-2">
          Rating: {r.review.toFixed(1)}
        </p>
      )}
      {r.description && (
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          {r.description}
        </p>
      )}
      {r.lat !== null && r.long !== null && (
        <p className="text-xs text-zinc-400 mt-2">
          {r.lat.toFixed(4)}, {r.long.toFixed(4)}
        </p>
      )}
    </div>
  );
};
