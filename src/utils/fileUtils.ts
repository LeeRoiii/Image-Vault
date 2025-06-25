const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

export function isValidFile(file: File): boolean {
  return ALLOWED_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE;
}

export function sanitizeFileName(fileName: string): string {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\-.]/gi, "_") // Replace invalid characters with _
    .replace(/_+/g, "_")             // Collapse multiple underscores
    .replace(/^_+|_+$/g, "");        // Trim leading/trailing underscores
}
