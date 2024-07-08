import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full w-full flex-col items-center justify-center gap-[4px] bg-background-secondary"
    >
      <img
        className="h-16 w-16 animate-spin-loading"
        alt="星の画像"
        src="/loading/star.png"
      />
      <img
        className="h-[54px] w-[327px]"
        alt="Waiting for HERO..."
        src="/loading/waiting-for-hero.png"
      />
    </motion.div>
  );
};
