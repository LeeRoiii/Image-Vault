import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { type ImageData } from "../types";

interface Props {
  image: ImageData;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: Props) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Download Button (Top Left) */}
          <a
            href={image.signedUrl || image.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white z-10"
            aria-label="Download"
            title="Download"
          >
            <Download size={28} />
          </a>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Image Container */}
          <div className="flex items-center justify-center w-full h-[70vh]">
            <img
              src={image.signedUrl || image.url}
              alt={image.title || "Uploaded image"}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/fallback.jpg";
              }}
            />
          </div>

          {/* Details */}
          <div className="p-6 text-gray-800 dark:text-gray-100">
            <h2 className="text-2xl font-bold mb-2 truncate">{image.title}</h2>
            <p className="mb-3 text-sm whitespace-pre-wrap">{image.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Uploaded on:{" "}
              {new Date(image.date).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageModal;
