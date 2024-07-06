import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full w-full flex-col items-center justify-center gap-2 bg-background-secondary"
    >
      <img
        className="animate-spin-loading h-16 w-16"
        alt="ローディングのアイコン"
        src="/star-secondary.png"
      />
      <p className="text-[32px] text-text-secondary">Wait for the Hero...</p>
    </motion.div>
  );
};
