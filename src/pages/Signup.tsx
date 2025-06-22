import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase";
import Snackbar from "../components/Snackbar";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({ visible: false, message: "", type: "success" });

  const showSnackbar = (message: string, type: "success" | "error" = "success") => {
    setSnackbar({ visible: true, message, type });
    setTimeout(() => setSnackbar(prev => ({ ...prev, visible: false })), 3000);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      showSnackbar("Invalid email format.", "error");
      return;
    }

    if (password.length < 6) {
      showSnackbar("Password must be at least 6 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showSnackbar("Passwords do not match.", "error");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Use the full production URL for redirect after email confirmation
        emailRedirectTo:
          process.env.NODE_ENV === "production"
            ? "https://your-production-domain.com/login"
            : `${window.location.origin}/login`,
      },
    });

    if (error) {
      showSnackbar("Signup failed: " + error.message, "error");
      setIsLoading(false);
      return;
    }

    showSnackbar("Signup successful! Check your email.", "success");
    setIsLoading(false);
    setTimeout(() => navigate("/login"), 2500); // allow time to read message
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      {/* Snackbar */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatePresence>
          {snackbar.visible && (
            <Snackbar
              visible={snackbar.visible}
              message={snackbar.message}
              type={snackbar.type}
              onClose={() => setSnackbar({ ...snackbar, visible: false })}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30" />

          <div className="p-8 relative z-10 text-center">
            {/* Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold text-blue-600 dark:text-white mb-1">
                Image Vault
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Create your secure image locker account
              </p>
            </motion.div>

            {/* Form */}
            <div className="space-y-5 text-left">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-2 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {/* Signup Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-300 relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </motion.div>

              {/* Link to Login */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-2"
              >
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="cursor-pointer text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Log in
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
