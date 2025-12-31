"use client";

import { Tables } from "@/utils/supabase/supabase.types";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

interface MapProps {
  markers?: Tables<"restaurant_reviews">[];
}

type Restaurant = Tables<"restaurant_reviews">;

const getMarkerColor = (review: number) => {
  if (review >= 9) return "bg-green-700";
  if (review >= 8) return "bg-green-400";
  if (review >= 7) return "bg-yellow-400";
  if (review >= 6) return "bg-amber-500";
  if (review >= 5) return "bg-red-400";
  return "bg-red-500";
};

export const MapComponent = ({ markers }: MapProps) => {
  const [selected, setSelected] = useState<Restaurant | null>(null);

  if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not defined in environment variables");
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI
        mapId="1eb4899f0ee6dde7c5f85cbd"
        onClick={() => setSelected(null)}
      >
        {markers?.map((marker) => (
          <AdvancedMarker
            key={marker.id}
            position={{ lat: marker.lat!, lng: marker.long! }}
            onClick={() => setSelected(marker)}
          >
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-semibold shadow-lg cursor-pointer transition-transform ${
                selected?.id === marker.id ? "scale-110" : ""
              } ${getMarkerColor(marker.review!)}`}
            >
              {marker.review!.toFixed(1)}
            </div>
          </AdvancedMarker>
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat!, lng: selected.long! }}
            onCloseClick={() => setSelected(null)}
            headerContent={
              <h1 className="font-semibold text-slate-800 mb-1">
                <a
                  href={`https://www.google.com/maps/place/?q=place_id:${selected.google_maps_place_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selected.name ?? "Restaurant"}
                </a>
              </h1>
            }
          >
            <div className="max-w-xs">
              <p className="text-sm font-medium text-amber-600 mb-1">
                Rating: {selected.review!.toFixed(1)}
              </p>

              {selected.description && (
                <p className="text-sm text-zinc-700">{selected.description}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};
