// src/pages/Home.tsx
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { type ImageData } from "../types";
import ImageCard from "../components/ImageCard";
import ImageUploadModal from "../components/ImageUploadModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ImageModal from "../components/ImageModal";
import { supabase } from "../supabase";
import { LogOut, Plus } from "lucide-react";
import EmptyState from "../components/EmptyState";

const PAGE_SIZE = 12;

const HomePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) navigate("/login");
    });
    loadImages(0); // Load first page
  }, []);

  const loadImages = async (pageNumber: number) => {
    setLoading(true);
    const from = pageNumber * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
      return;
    }

    if (data) {
      if (pageNumber === 0) {
        setImages(data);
      } else {
        setImages((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === PAGE_SIZE);
    }
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

  const addImage = (data: ImageData) => {
    setImages((prev) => [data, ...prev]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
              🗂️ Image Vault
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
              Keep your precious moments safe and close
            </p>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                handleLogout();
              }
            }}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-3 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-600"
            aria-label="Logout"
            title="Logout"
            type="button"
          >
            <LogOut size={20} />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>

        {/* Images Grid or Empty State */}
        {images.length === 0 && !loading ? (
          <EmptyState />
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img, index) => {
              const divProps = {
                key: img.id,
                className:
                  "h-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                onDoubleClick: () => setSelectedImage(img),
              };

              if (index === images.length - 1) {
                return (
                  <div ref={lastImageElementRef} {...divProps}>
                    <ImageCard data={img} />
                  </div>
                );
              } else {
                return (
                  <div {...divProps}>
                    <ImageCard data={img} />
                  </div>
                );
              }
            })}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Floating Action Button */}
        <button
          onClick={() => setUploadModalOpen(true)}
          aria-label="Add image"
          title="Add image"
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-white transition"
        >
          <Plus size={28} />
        </button>

        {/* Upload Modal */}
        {uploadModalOpen && (
          <ImageUploadModal
            onUpload={(data) => {
              addImage(data);
              setUploadModalOpen(false);
            }}
            onClose={() => setUploadModalOpen(false)}
          />
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </div>
  );
};

export default HomePage;
