import { ImagePlus } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-gray-400 dark:text-gray-600 select-none">
      <div className="p-6 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 animate-pulse">
        <ImagePlus size={48} />
      </div>
      <p className="text-lg font-semibold mb-2">No images uploaded yet</p>
      <p className="max-w-xs text-center text-sm">
        Click the <span className="font-bold">+</span> button below to add your first image.
      </p>
    </div>
  );
};

export default EmptyState;
