import { Folder } from "lucide-react";

interface Props {
  name: string;
  onClick: () => void;
  isAll?: boolean;
}

const CategoryCard = ({ name, onClick, isAll = false }: Props) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:shadow-md transition"
    >
      <div
        className={`mb-2 ${
          isAll ? "text-gray-500 dark:text-gray-300" : "text-yellow-600 dark:text-yellow-400"
        }`}
      >
        <Folder size={32} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {isAll ? "View everything" : "View all in this folder"}
      </p>
    </div>
  );
};

export default CategoryCard;
