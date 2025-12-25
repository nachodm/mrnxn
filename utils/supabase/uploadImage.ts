import { createClient } from "@/utils/supabase/client";

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("restaurant-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("restaurant-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
