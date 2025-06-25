import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleResetPassword, isLoading, success } = useResetPassword();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const onSubmit = () => {
    if (password.trim()) {
      handleResetPassword(password);
    }
  };

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
            <h2 className="text-2xl font-bold text-blue-600 dark:text-white">Create New Password</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Set your new password below to regain access to your account.
            </p>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all pr-12"
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmit}
              disabled={isLoading || password.trim() === ""}
              className={`w-full py-3 font-medium rounded-lg transition-all duration-300 ${
                isLoading || password.trim() === ""
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              } text-white`}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-sm text-green-600 dark:text-green-400">
                Password updated! Redirecting...
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
