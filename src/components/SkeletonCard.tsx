import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="animate-pulse rounded-2xl bg-gradient-to-br from-white/80 to-gray-100 dark:from-gray-800/60 dark:to-gray-900/40
      border border-gray-200 dark:border-gray-700 shadow-md p-4 space-y-4"
    >
      {/* Image area */}
      <div className="h-44 w-full bg-gray-200 dark:bg-gray-700 rounded-xl" />

      {/* Title */}
      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />

      {/* Line 1 */}
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Line 2 */}
      <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />

      {/* Line 3 */}
      <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
    </motion.div>
  );
};

export default SkeletonCard;
