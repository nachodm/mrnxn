"use client";
import { MapComponent } from "@/components/Map";
import { RestaurantCard } from "@/components/RestaurantCard";
import { ViewToggleButton } from "@/components/ViewToggleButton";
import { useRestaurantMarkers } from "@/hooks/useRestaurantMarkers";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMapView, setIsMapView] = useState(true);
  const { restaurants, loading, error } = useRestaurantMarkers();
  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  return (
    <>
      {!loading ? (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          {isMapView ? (
            <MapComponent markers={restaurants} />
          ) : (
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
              <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {restaurants.map((r) => (
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
