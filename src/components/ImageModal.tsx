// src/components/ImageModal.tsx
import React from "react";
import { type ImageData } from "../types";
import { X } from "lucide-react";

interface Props {
  image: ImageData;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: Props) => {
  // Prevent body scroll when modal is open
  // This can also be done via effect in parent but here for simplicity
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close"
          title="Close"
        >
          <X size={28} />
        </button>

        <img
          src={image.url}
          alt={image.title}
          className="w-full max-h-[70vh] object-contain rounded-t-lg"
        />
        <div className="p-6 text-gray-800 dark:text-gray-100">
          <h2 className="text-2xl font-semibold mb-2">{image.title}</h2>
          <p className="mb-4 whitespace-pre-wrap">{image.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Uploaded on: {image.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;