import { motion, MotionProps } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparTitleLogoImageProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparTitleLogoImage = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparTitleLogoImageProps) => {
  const initialMotion = { opacity: 0, scale: 0.5, y: 80 };
  const animateMotion = {
    opacity: 1,
    scale: 1.0,
    y: 0,
    transition: { delay: enterAnimationDelay },
  };
  const exitMotion = {
    opacity: 0,
    transition: { delay: exitAnimationDelay },
  };

  return (
    <motion.div
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge("max-w-full", className)}
      {...props}
    >
      <Image
        className="h-auto w-full"
        alt="SUPAEHEROのタイトルロゴ"
        src="/title/suparhero-logo.png"
        width={432}
        height={254.5}
        priority={true}
      />
    </motion.div>
  );
};
