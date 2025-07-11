import { useRef, useState, useEffect } from "react";
import { type ImageData } from "../../utils/types";
import { useImageUpload } from "../../hooks/useImageUpload";
import { supabase } from "../../supabase";

interface Props {
  onUpload: (data: ImageData) => void;
  onClose: () => void;
}

const ImageUploadModal = ({ onUpload, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
    console.log("Toast:", message);
  };

  const { handleUpload, uploading, uploadCount } = useImageUpload(onUpload, showToast);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from("categories")
          .select("name")
          .eq("user_id", user.id);

        const names = data?.map((item) => item.name).filter(Boolean) || [];
        setCategories(names);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = () => {
    if (!image) return showToast("Please select an image.");
    if (!category.trim()) return showToast("Please select a category.");

    handleUpload(image, title, description, category, () => {
      resetForm();
      onClose();
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setImage(null);
    setPreviewUrl(null);
  };

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current && !uploading) onClose();
  };

  return (
    <>
      <div
        ref={modalRef}
        onClick={onOverlayClick}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        aria-modal="true"
        role="dialog"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto relative p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            disabled={uploading}
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Upload New Image
          </h2>

          {uploadCount >= 2 ? (
            <div className="text-center text-green-600 dark:text-green-400 font-medium">
              You’ve reached the upload limit. Thank you for testing!
            </div>
          ) : (
            <div className="space-y-5">
              {/* Image Picker */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                      <svg
                        className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF (MAX. 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  placeholder="Enter a description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={uploading}
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={uploading}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleSubmit}
                disabled={uploading || !image}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                  uploading || !image
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                }`}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optional: Snackbar still exists for fallback (dev logs only) */}
      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity">
          🎉 Thanks for testing! You've reached the upload limit.
        </div>
      )}
    </>
  );
};

export default ImageUploadModal;
// This code defines a modal component for uploading images, allowing users to add titles, descriptions, and categories.
// It includes a file input for selecting images, a preview of the selected image, and a dropdown for selecting categories. 