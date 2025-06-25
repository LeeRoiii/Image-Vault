import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { ImageData } from "../utils/types";
import { validateFile } from "../utils/fileUtils";

export function useImageUpload(
  onUpload: (data: ImageData) => void,
  showToast: (msg: string) => void
) {
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUploadCount = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) throw new Error("User not authenticated.");
        setUserId(user.id);

        const { count, error: countError } = await supabase
          .from("images")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        if (countError) throw countError;
        setUploadCount(count ?? 0);
      } catch {
        showToast("Failed to fetch upload count.");
      }
    };

    fetchUploadCount();
  }, []);

  const handleUpload = async (
    file: File,
    title: string,
    description: string,
    category: string,
    onSuccess: () => void
  ) => {
    if (uploadCount >= 2) {
      showToast("You’ve reached the upload limit.");
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      showToast(validationError);
      return;
    }

    setUploading(true);
    try {
      if (!userId) throw new Error("User not loaded yet.");

      const timestamp = Date.now();
      const sanitizedFilename = file.name.replace(/\s+/g, "_");
      const filePath = `${userId}/${timestamp}_${sanitizedFilename}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const newImage: ImageData = {
        id: filePath,
        url: filePath,
        title,
        description,
        category,
        date: new Date().toISOString(),
        user_id: userId,
      };

      const { error: dbError } = await supabase.from("images").insert(newImage);
      if (dbError) throw dbError;

      onUpload(newImage);
      setUploadCount((prev) => prev + 1);
      onSuccess();
    } catch {
      showToast("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return { handleUpload, uploading, uploadCount };
}
