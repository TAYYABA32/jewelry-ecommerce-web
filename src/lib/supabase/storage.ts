import "server-only";

import { createSupabaseAdminClient } from "./admin";

const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "product-images";

export async function uploadProductImage(file: File, path: string) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteProductImage(path: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}
