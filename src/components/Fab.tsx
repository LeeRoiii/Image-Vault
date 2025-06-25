import { type FC } from "react";
import { Plus, FolderPlus, MoreVertical } from "lucide-react";
import clsx from "clsx";

interface FabProps {
  fabOpen: boolean;
  onToggle: () => void;
  onUploadClick: () => void;
  onAddCategoryClick: () => void;
}

const Fab: FC<FabProps> = ({
  fabOpen,
  onToggle,
  onUploadClick,
  onAddCategoryClick,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2 group">
      {/* Action Buttons */}
      <div
        className={clsx(
          "flex flex-col space-y-3 transition-all duration-300 ease-in-out transform",
          fabOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        {/* Add Category */}
        <button
          onClick={onAddCategoryClick}
          className="relative bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition"
        >
          <FolderPlus size={20} className="mr-2" />
          Add Category
         
        </button>

        {/* Upload Image */}
        <button
          onClick={onUploadClick}
          className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center transition"
        >
          <Plus size={20} className="mr-2" />
          Upload Image
        </button>
      </div>

      {/* FAB Toggle Button */}
      <button
        onClick={onToggle}
        className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-900 text-white shadow-lg flex items-center justify-center transition duration-200"
      >
        <MoreVertical size={28} />
      </button>
    </div>
  );
};

export default Fab;
