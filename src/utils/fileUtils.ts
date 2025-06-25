export function validateFile(file: File): string | null {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (file.size > maxSize) {
    return "File size exceeds 5MB limit.";
  }

  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Only JPG, PNG, GIF allowed.";
  }

  return null;
}
export function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
}