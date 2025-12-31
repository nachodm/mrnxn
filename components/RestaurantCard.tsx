import { Tables } from "@/utils/supabase/supabase.types";
import Image from "next/image";

type RestaurantRow = Tables<"restaurant_reviews">;
interface Restaurant {
  r: RestaurantRow;
}
const getMarkerColor = (review: number) => {
  if (review >= 9) return "text-green-700";
  if (review >= 8) return "text-green-400";
  if (review >= 7) return "text-yellow-400";
  if (review >= 6) return "text-amber-500";
  if (review >= 5) return "text-red-400";
  return "text-red-500";
};

export const RestaurantCard = (props: Restaurant) => {
  const { r } = props;
  return (
    <div
      key={r.id}
      className="bg-white dark:bg-zinc-800 rounded-sm shadow-md flex"
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom"
    >
      <div className="relative w-30 flex-shrink-0">
        <Image
          src={r.picture ? `/images/${r.picture}.jpg` : "/images/default.jpg"}
          alt={r.name!}
          fill
          className="object-cover rounded-l-sm"
        />
      </div>

      <div className="flex flex-col p-4">
        <h2 className="text-lg font-semibold text-black dark:text-zinc-50 mb-1">
          {r.name}
        </h2>

        {r.review !== null && (
          <p className={`text-sm font-medium ${getMarkerColor(r.review)} mb-2`}>
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
    </div>
  );
};
