import { useState } from "react";
import { motion } from "framer-motion";
import type { ImageData } from "../types";

interface Props {
  data: ImageData;
}

const ImageCard = ({ data }: Props) => {
  const imageUrl = data.signedUrl || data.url;
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.article
      tabIndex={0}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 h-full"
      aria-label={`Image titled ${data.title || "Untitled"}`}
    >
      {/* Image Preview */}
      <div className="relative h-52 overflow-hidden rounded-t-3xl bg-gray-200 dark:bg-gray-700">
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
            <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 9.75h.008v.008H9.75v-.008zM21 21H3V3h18v18zM8.25 16.5l2.25-3 2.25 3 3-4L19.5 18H4.5l3.75-4.5z" />
            </svg>
          </div>
        )}

        <img
          src={error ? "/fallback.jpg" : imageUrl}
          alt={data.title || "User uploaded image"}
          className={`w-full h-full object-cover rounded-t-3xl transition duration-700 ease-in-out transform ${
            loaded ? "opacity-100" : "blur-sm opacity-0"
          } hover:scale-110`}
          loading="lazy"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-3xl pointer-events-none" />

        {/* Filename Tooltip */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate max-w-[80%]">
          {data.url.split("/").pop()}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className="text-xl font-semibold text-gray-900 dark:text-white truncate group-hover:underline transition-all duration-200"
          title={data.title}
        >
          {data.title || "Untitled"}
        </h3>

        {/* Description */}
        <p
          className="mt-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3"
          title={data.description || "No description available"}
        >
          {data.description || "No description available."}
        </p>

        {/* Category */}
        {data.category && (
          <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
            Category: {data.category}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ImageCard;
