import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { type ImageData } from "../types";
import ImageCard from "../components/ImageCard";
import ImageUploadModal from "../components/ImageUploadModal";
import ImageModal from "../components/ImageModal";
import { supabase } from "../supabase";
import { LogOut, Folder } from "lucide-react";
import EmptyState from "../components/EmptyState";
import Snackbar from "../components/Snackbar";
import SkeletonCard from "../components/SkeletonCard";
import CategoryModal from "../components/CategoryModal";
import CategoryCard from "../components/CategoryCard";
import Fab from "../components/Fab";

const PAGE_SIZE = 12;

const HomePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryView, setCategoryView] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/login");
    });
    fetchCategories();
    loadImages(0);
  }, []);

  const fetchCategories = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) return;

    const { data, error } = await supabase
      .from("images")
      .select("category")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    const uniqueCategories = Array.from(
      new Set(data.map((img) => img.category).filter(Boolean))
    );
    setCategories(uniqueCategories);
  };

  const loadImages = async (pageNumber: number, category = selectedCategory) => {
    setLoading(true);
    const from = pageNumber * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      setLoading(false);
      return;
    }

    let query = supabase
      .from("images")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .range(from, to);

    if (category) query = query.eq("category", category);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
      return;
    }

    const imagesWithSignedUrls = await Promise.all(
      data.map(async (img) => {
        const { data: signed } = await supabase.storage
          .from("images")
          .createSignedUrl(img.url, 3600);

        return {
          ...img,
          signedUrl: signed?.signedUrl || "",
        };
      })
    );

    if (pageNumber === 0) {
      setImages(imagesWithSignedUrls);
    } else {
      setImages((prev) => [...prev, ...imagesWithSignedUrls]);
    }

    setHasMore(data.length === PAGE_SIZE);
    setLoading(false);
  };

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (page === 0) return;
    loadImages(page);
  }, [page]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleUpload = () => {
    setUploadModalOpen(false);
    setPage(0);
    loadImages(0);
    fetchCategories();
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 5000);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(0);
    setCategoryView(false);
    loadImages(0, category);
  };

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
                setPage(0);
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
                    setPage(0);
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
          onCategoryAdded={fetchCategories}
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
