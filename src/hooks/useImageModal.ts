import { useEffect } from "react";

/**
 * Hook to manage modal behavior:
 * - Closes on ESC key
 * - Locks body scroll
 */
export const useImageModal = (onClose: () => void) => {
  useEffect(() => {
    if (typeof onClose !== "function") {
      console.warn("useImageModal: onClose is not a function");
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore scroll behavior
      document.body.style.overflow = originalOverflow;

      // Remove listener
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
};
