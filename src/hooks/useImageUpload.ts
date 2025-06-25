// hooks/useImageUpload.ts
import { useState } from "react";
import { supabase } from "../supabase";
import { type ImageData } from "../types";
import { isValidFile, sanitizeFileName } from "../utils/fileUtils";
import { logError } from "../utils/errorLogger";

export const useImageUpload = (onUpload: (data: ImageData) => void, showToast: (msg: string) => void) => {
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const handleUpload = async (
    file: File,
    title: string,
    description: string,
    category: string,
    onSuccess: () => void
  ) => {
    if (uploadCount >= 2) return;

    if (!isValidFile(file)) {
      showToast("Invalid file. Only images under 5MB are allowed.");
      return;
    }

    setUploading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not authenticated.");

      const sanitizedFileName = sanitizeFileName(file.name);
      const timestamp = Date.now();
      const filePath = `${user.id}/${timestamp}_${sanitizedFileName}`;

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
        user_id: user.id,
      };

      const { error: dbError } = await supabase.from("images").insert(newImage);
      if (dbError) throw dbError;

      onUpload(newImage);
      onSuccess();

      setUploadCount((prev) => {
        if (prev + 1 >= 2) showToast("🎉 Thanks for testing! You've reached the upload limit.");
        return prev + 1;
      });
    } catch (err: any) {
      logError(err);
      showToast(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    handleUpload,
    uploading,
    uploadCount,
  };
};
