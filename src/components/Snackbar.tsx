import React from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = "success",
  visible,
  onClose,
}) => {
  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "info":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <XCircle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return null;
    }
  };

  const getMobileIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={24} />;
      case "error":
        return <XCircle size={24} />;
      case "info":
        return <Info size={24} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center justify-center transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{ minWidth: 48, minHeight: 48 }}
      aria-live="assertive"
      role="alert"
    >
      {/* Desktop: Full snackbar */}
      <div
        className={`hidden sm:flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg text-white select-none ${getBgColor()}`}
      >
        {getIcon()}
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
        className={`sm:hidden flex items-center justify-center rounded-full w-12 h-12 ${getBgColor()} text-white shadow-lg focus:outline-none`}
        aria-label={`${type} notification`}
      >
        {getMobileIcon()}
      </button>
    </div>
  );
};

export default Snackbar;
