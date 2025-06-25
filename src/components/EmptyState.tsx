import { ImagePlus } from "lucide-react";
import { motion } from "framer-motion";

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center mt-24 text-gray-500 dark:text-gray-400 select-none px-4"
    >
      {/* Floating Icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="p-6 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 mb-6 shadow-md"
      >
        <ImagePlus size={48} className="text-gray-500 dark:text-gray-300" />
      </motion.div>

      {/* Headline */}
      <h2 className="text-2xl font-bold text-center mb-2">No Images Found</h2>

      {/* Subtext */}
      <p className="text-sm text-center max-w-xs mb-2">
        You haven’t uploaded any images yet.
      </p>
      <p className="text-sm text-center max-w-xs">
        Tap the <span className="font-semibold text-blue-600 dark:text-blue-400">+</span> button below to start adding your memories.
      </p>
    </motion.div>
  );
};

export default EmptyState;
