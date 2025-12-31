"use client";
import { MapComponent } from "@/components/Map";
import { RestaurantCard } from "@/components/RestaurantCard";
import { ViewToggleButton } from "@/components/ViewToggleButton";
import { useRestaurantMarkers } from "@/hooks/useRestaurantMarkers";
import "animate.css";
import AOS from "aos";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMapView, setIsMapView] = useState(true);
  const { restaurants, loading, error } = useRestaurantMarkers();
  const [minRating, setMinRating] = useState<number>(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const toggleView = () => {
    setIsMapView(!isMapView);
  };
  const filteredRestaurants = restaurants.filter((r) => r.review! >= minRating);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, [restaurants]);

  return (
    <>
      {!loading ? (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          {isMapView ? (
            <MapComponent markers={filteredRestaurants} />
          ) : (
            <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="mb-4 text-sm font-medium underline cursor-pointer"
              >
                {filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}
              </button>

              {filtersOpen && (
                <div className="animate__animated animate__fadeInDown mb-6 w-full max-w-md rounded-lg border p-4">
                  <label className="block text-sm font-medium mb-2">
                    Nota mínima: {minRating}
                  </label>

                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
              <p>
                Opiniones gastronómicas que nadie pidió, pero todos necesitan.
              </p>
              <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {filteredRestaurants.map((r) => (
                    <RestaurantCard key={r.id} r={r} />
                  ))}
                </div>
              </div>
            </main>
          )}
          <ViewToggleButton isMapView={isMapView} onToggle={toggleView} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
