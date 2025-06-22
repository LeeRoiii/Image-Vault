import { motion } from "framer-motion";
import { Cog } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnderDevelopmentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30" />

          <div className="p-8 relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold text-blue-600 dark:text-white mb-2">Coming Soon</h1>
              <p className="text-gray-500 dark:text-gray-300">
                This feature is still under development.
              </p>
            </motion.div>

            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="flex justify-center mb-6"
            >
              <Cog className="w-16 h-16 text-blue-500 dark:text-blue-400" />
            </motion.div>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg shadow transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderDevelopmentPage;
