import { useEffect } from "react";

/**
 * Provides modal-related UX behavior:
 * - Closes on Escape key
 * - Locks body scroll while open
 */
export const useModalBehavior = (onClose: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Lock scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore scroll and cleanup
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
};
