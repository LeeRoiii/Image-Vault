import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../supabase";
import Snackbar from "../components/Snackbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const showSnackbar = (message: string, type: "success" | "error" = "success") => {
    setSnackbar({ visible: true, message, type });
    setTimeout(() => setSnackbar({ ...snackbar, visible: false }), 3000);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      showSnackbar(error.message, "error");
      setIsLoading(false);
      return;
    }

    if (!data.session) {
      showSnackbar("No active session", "error");
      setIsLoading(false);
      return;
    }

    showSnackbar("Login successful!", "success");
    setIsLoading(false);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleLogin();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [email, password]);

  return (
    <div className="flex min-h-screen items-center justify-center relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 overflow-hidden">

      {/* Floating background circles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full filter blur-3xl top-[-6rem] left-[-6rem]"
        />
        <motion.div
          initial={{ opacity: 0.1, scale: 1 }}
          animate={{ opacity: 0.2, scale: 1.05 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full filter blur-3xl top-1/2 left-[-8rem]"
        />
        <motion.div
          initial={{ opacity: 0.15, scale: 1 }}
          animate={{ opacity: 0.25, scale: 1.1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full filter blur-3xl bottom-[-6rem] right-[-6rem]"
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl font-bold text-blue-600 dark:text-white mb-2">
                Image Vault
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Keep your moments safe, private, and always accessible
              </p>
            </motion.div>

            <div className="space-y-5">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                      activeInput === "email"
                        ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:outline-none transition-all duration-200`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveInput("email")}
                    onBlur={() => setActiveInput(null)}
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border ${
                      activeInput === "password"
                        ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg focus:outline-none transition-all duration-200`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveInput("password")}
                    onBlur={() => setActiveInput(null)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-300 relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>
              </motion.div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center pt-2 space-y-2"
              >
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign up
                  </a>
                </p>
                <a
                  onClick={() => navigate("/under-development")}
                  className="cursor-pointer text-xs text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors inline-block"
                >
                  Forgot password?
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Snackbar */}
      <AnimatePresence>
        {snackbar.visible && (
          <Snackbar
            visible={snackbar.visible}
            message={snackbar.message}
            type={snackbar.type as "success" | "error"}
            onClose={() => setSnackbar({ ...snackbar, visible: false })}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
