import { motion } from "framer-motion";
import Image from "next-export-optimize-images/image";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full w-full flex-col items-center justify-center gap-[4px] bg-background-secondary"
    >
      <Image
        className="h-[64px] w-[64px] animate-spin-loading"
        alt="星の画像"
        src="/loading/star.png"
        width={64}
        height={64}
      />
      <Image
        className="h-[54px] w-[327px]"
        alt="Waiting for HERO..."
        src="/loading/waiting-for-hero.png"
        width={327}
        height={54}
      />
    </motion.div>
  );
};
