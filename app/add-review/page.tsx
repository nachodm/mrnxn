"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { loadGooglePlaces } from "@/utils/loadGooglePlaces";
import { TablesInsert } from "@/utils/supabase/supabase.types";
import { uploadImage } from "@/utils/supabase/uploadImage";

type NewRestaurant = TablesInsert<"restaurant_reviews">;

export default function AddReview() {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<NewRestaurant>({
    name: "",
    review: null,
    description: "",
    lat: null,
    long: null,
    google_maps_place_id: null,
    picture: null,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGooglePlaces(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!).then(() => {
      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        { fields: ["place_id", "geometry", "name"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        setForm((prev) => ({
          ...prev,
          name: place.name ?? prev.name,
          google_maps_place_id: place.place_id ?? null,
          lat: place.geometry!.location!.lat(),
          long: place.geometry!.location!.lng(),
        }));
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let pictureUrl = null;
    if (imageFile) {
      pictureUrl = await uploadImage(imageFile);
    }

    await supabase.from("restaurant_reviews").insert({
      ...form,
      picture: pictureUrl,
    });

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white dark:bg-zinc-900 p-6 rounded shadow"
      >
        <h1 className="text-3xl font-semibold">Add a Review</h1>

        <input
          ref={inputRef}
          placeholder="Search restaurant (Google)"
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="number"
          step="0.5"
          min="0"
          max="10"
          placeholder="Rating"
          onChange={(e) => setForm({ ...form, review: Number(e.target.value) })}
          className="w-full rounded border px-3 py-2"
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="w-full"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Saving…" : "Add Review"}
        </button>
      </form>
    </div>
  );
}
