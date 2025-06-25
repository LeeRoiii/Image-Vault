export interface ImageData {
  id: string;             // Unique identifier (usually the file path)
  url: string;            // Original file path in Supabase storage
  signedUrl?: string;     // Optional signed URL (for private bucket access)
  title: string;          // Image title
  description: string;    // Image description
  date: string;           // ISO string date of upload
  user_id: string;        // ID of the user who uploaded the image
  category?: string;      // Optional category (e.g., "Nature", "Portrait")
}
