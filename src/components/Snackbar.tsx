import React from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = "success",
  visible,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center justify-center
        transition-all duration-300
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
      style={{ minWidth: 48, minHeight: 48 }}
      aria-live="assertive"
      role="alert"
    >
      {/* Desktop: Full snackbar */}
      <div
        className={`hidden sm:flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg text-white select-none
          ${
            type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
      >
        {type === "success" ? (
          <CheckCircle size={20} />
        ) : (
          <XCircle size={20} />
        )}
        <span className="whitespace-nowrap">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:underline focus:outline-none"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>

      {/* Mobile: Circle icon only */}
      <button
        onClick={onClose}
        className={`sm:hidden flex items-center justify-center rounded-full
          w-12 h-12
          ${
            type === "success" ? "bg-green-600" : "bg-red-600"
          }
          text-white
          shadow-lg
          focus:outline-none
          `}
        aria-label={type === "success" ? "Success notification" : "Error notification"}
      >
        {type === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
      </button>
    </div>
  );
};

export default Snackbar;
