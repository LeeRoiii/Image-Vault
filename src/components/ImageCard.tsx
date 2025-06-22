// src/components/ImageCard.tsx
import type { ImageData } from "../types";

interface Props {
  data: ImageData;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }); // e.g. May 13, 2003
  } catch {
    return dateStr;
  }
};

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-4 h-4 mr-1 text-blue-600 dark:text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
    <line x1={16} y1={2} x2={16} y2={6} />
    <line x1={8} y1={2} x2={8} y2={6} />
    <line x1={3} y1={10} x2={21} y2={10} />
  </svg>
);

const ImageCard = ({ data }: Props) => {
  return (
    <article
      tabIndex={0}
      className="relative flex flex-col rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transform hover:scale-[1.04] transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 h-full"
      aria-label={`Image titled ${data.title || "Untitled"}`}
    >
      <div className="relative h-52 overflow-hidden rounded-t-3xl">
        <img
          src={data.url}
          alt={data.title || "User uploaded image"}
          className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 ease-in-out transform hover:scale-110"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-3xl pointer-events-none" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-xl font-semibold text-gray-900 dark:text-white truncate"
          title={data.title}
        >
          {data.title || "Untitled"}
        </h3>
        <p
          className="mt-2 flex-grow text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3"
          title={data.description || "No description available"}
        >
          {data.description || "No description available."}
        </p>

        <time
          dateTime={new Date(data.date).toISOString()}
          className="mt-4 inline-flex items-center self-start rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 text-xs font-medium select-none"
        >
          <CalendarIcon />
          {formatDate(data.date)}
        </time>
      </div>
    </article>
  );
};

export default ImageCard;
