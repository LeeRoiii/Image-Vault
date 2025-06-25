import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Snackbar from "../components/Snackbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error" | "info",
  });

  const { handleForgotPassword, isLoading } = useForgotPassword(setSnackbar);

  return (
    <div className="flex min-h-screen items-center justify-center relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 overflow-hidden">
      
      {/* Background animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full filter blur-3xl top-[-6rem] left-[-6rem]"
        />
        <motion.div
          initial={{ opacity: 0.1, scale: 1 }}
          animate={{ opacity: 0.2, scale: 1.05 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full filter blur-3xl top-1/2 left-[-8rem]"
        />
        <motion.div
          initial={{ opacity: 0.15, scale: 1 }}
          animate={{ opacity: 0.25, scale: 1.1 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          className="absolute w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full filter blur-3xl bottom-[-6rem] right-[-6rem]"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8 space-y-6 text-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-white">Forgot Password</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enter your email address and we'll send you a reset link.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
            />
            <button
              onClick={() => handleForgotPassword(email)}
              disabled={isLoading || !email}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-all duration-300"
            >
              {isLoading ? <LoadingSpinner /> : "Send Reset Email"}
            </button>

            {/* Back to Login */}
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-blue-600 dark:text-white-400 hover:underline mt-2"
            >
              Back to Login
            </button>
          </div>
        </div>
      </motion.div>

      {/* Snackbar */}
      <Snackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, visible: false })}
      />
    </div>
  );
};

export default ForgotPasswordPage;
