import { useState, useRef } from "react";
import { supabase } from "../../supabase";
import { useModalBehavior } from "../../hooks/useModalBehavior";


interface Props {
  onClose: () => void;
  onCategoryAdded: () => void;
}

const CategoryModal = ({ onClose, onCategoryAdded }: Props) => {
  const [newCategory, setNewCategory] = useState("");
  const [saving, setSaving] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useModalBehavior(onClose); // Escape key & scroll lock

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current && !saving) {
      onClose();
    }
  };

  const handleSave = async () => {
    if (!newCategory.trim()) {
      alert("Category name is required.");
      return;
    }

    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("categories").insert({
      name: newCategory.trim(),
      user_id: user?.id,
    });

    setNewCategory("");
    onCategoryAdded();
    onClose();
    setSaving(false);
  };

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Add New Category
        </h2>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={saving}
        />
        <button
          onClick={handleSave}
          disabled={saving || !newCategory.trim()}
          className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium transition ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          }`}
        >
          {saving ? "Saving..." : "Add Category"}
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
