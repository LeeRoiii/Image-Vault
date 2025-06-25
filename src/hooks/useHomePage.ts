// src/hooks/useHomePage.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { type ImageData } from "../utils/types";
const PAGE_SIZE = 12;

export const useHomePage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.id) return;

    const { data } = await supabase
      .from("images")
      .select("category")
      .eq("user_id", user.id);

    if (!data) return;

    const uniqueCategories = Array.from(
      new Set(data.map((img) => img.category).filter(Boolean))
    );
    setCategories(uniqueCategories);
  };

  const loadImages = async (pageNumber: number, category = selectedCategory) => {
    setLoading(true);
    const from = pageNumber * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: { user } } = await supabase.auth.getUser();
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

    const { data } = await query;
    if (!data) {
      setLoading(false);
      return;
    }

    const imagesWithSignedUrls = await Promise.all(
      data.map(async (img) => {
        const { data: signed } = await supabase.storage
          .from("images")
          .createSignedUrl(img.url, 3600);
        return { ...img, signedUrl: signed?.signedUrl || "" };
      })
    );

    setImages((prev) => (pageNumber === 0 ? imagesWithSignedUrls : [...prev, ...imagesWithSignedUrls]));
    setHasMore(data.length === PAGE_SIZE);
    setLoading(false);
  };

  const lastImageElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

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

  return {
    images,
    categories,
    selectedCategory,
    uploadModalOpen,
    selectedImage,
    loading,
    hasMore,
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
  };
};
