import {
  LogOut,
  Folder
} from "lucide-react";
import { useHomePage } from "../hooks/useHomePage";
import CategoryCard from "../components/Cards/CategoryCard";
import EmptyState from "../components/EmptyState";
import ImageCard from "../components/Cards/ImageCard";
import SkeletonCard from "../components/Cards/SkeletonCard";
import Fab from "../components/Fab";
import ImageUploadModal from "../components/Modals/ImageUploadModal";
import CategoryModal from "../components/Modals/CategoryModal";
import ImageModal from "../components/Modals/ImageModal";
import Snackbar from "../components/Snackbar";

const HomePage = () => {
  const {
    images,
    categories,
    selectedCategory,
    uploadModalOpen,
    selectedImage,
    loading,
    showSnackbar,
    categoryView,
    fabOpen,
    categoryModalOpen,
    setUploadModalOpen,
    setSelectedImage,
    setShowSnackbar,
    setCategoryModalOpen,
    setFabOpen,
    setCategoryView,
    lastImageElementRef,
    handleLogout,
    handleUpload,
    handleCategoryClick,
    setSelectedCategory,
    loadImages,
  } = useHomePage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
              📂️ Image Vault
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
              Keep your precious moments safe and close
            </p>
          </div>

          {/* Responsive Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategoryView((prev) => !prev)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg flex items-center transition"
              title="View Categories"
            >
              <Folder size={20} />
              <span className="hidden sm:inline ml-2">Categories</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  handleLogout();
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center transition"
              title="Logout"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline ml-2">Logout</span>
            </button>
          </div>
        </div>

        {/* Category View */}
        {categoryView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CategoryCard
              name="All Images"
              isAll
              onClick={() => {
                setSelectedCategory(null);
                loadImages(0, null);
                setCategoryView(false);
              }}
            />

            {categories.map((cat) => (
              <CategoryCard
                key={cat}
                name={cat}
                onClick={() => handleCategoryClick(cat)}
              />
            ))}
          </div>
        ) : (
          <>
            {selectedCategory && (
              <div className="mb-4">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    loadImages(0, null);
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  ← Back to All Images
                </button>
              </div>
            )}

            {images.length === 0 && !loading ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    ref={index === images.length - 1 ? lastImageElementRef : null}
                    className="cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => {
                      if (window.innerWidth <= 768) setSelectedImage(img);
                    }}
                    onDoubleClick={() => {
                      if (window.innerWidth > 768) setSelectedImage(img);
                    }}
                  >
                    <ImageCard data={img} />
                  </div>
                ))}
                {loading &&
                  Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonCard key={`skeleton-${i}`} />
                  ))}
              </div>
            )}
          </>
        )}

        {/* FAB Component */}
        <Fab
          fabOpen={fabOpen}
          onToggle={() => setFabOpen((prev) => !prev)}
          onUploadClick={() => {
            setUploadModalOpen(true);
            setFabOpen(false);
          }}
          onAddCategoryClick={() => {
            setCategoryModalOpen(true);
            setFabOpen(false);
          }}
        />

        {/* Upload Modal */}
        {uploadModalOpen && (
          <ImageUploadModal
            onUpload={handleUpload}
            onClose={() => setUploadModalOpen(false)}
          />
        )}
      </div>

      {/* Category Modal */}
      {categoryModalOpen && (
        <CategoryModal
          onClose={() => setCategoryModalOpen(false)}
          onCategoryAdded={() => {}}
        />
      )}

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Snackbar */}
      <Snackbar
        message="Image uploaded successfully!"
        type="success"
        visible={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
    </div>
  );
};

export default HomePage;
