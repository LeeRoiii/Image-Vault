// src/utils/types.ts

// ImageData: represents a single uploaded image
export interface ImageData {
  id: string;             // Unique identifier, often from file path or UUID
  url: string;            // Permanent or public URL to the image in Supabase storage
  signedUrl?: string;     // Temporary signed URL for secure access (private buckets)
  title: string;          // Image title (required)
  description: string;    // Image description
  date: string;           // ISO 8601 formatted upload timestamp
  user_id: string;        // Supabase user ID of the uploader
  category?: string;      // Optional category (e.g., "Travel", "Portrait", etc.)
}

// Snackbar types for global user feedback
export type SnackbarType = "success" | "error" | "info";

export interface SnackbarState {
  visible: boolean;       // Whether the snackbar is shown
  message: string;        // The message to display
  type: SnackbarType;     // Type: success | error | info
}

// Optional: Auth form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

// Optional: Upload payload
export interface UploadImagePayload {
  file: File;
  title?: string;
  description?: string;
  category?: string;
}
