import { motion, MotionProps } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparBannerVariant = "HOWTOPLAY" | "PAUSE" | "RESULT";

const getImageProps = (
  variant: SuparBannerVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "HOWTOPLAY":
      return {
        alt: "チュートリアルバナー",
        src: "/supar-banner/how-to-play.png",
      };
    case "PAUSE":
      return {
        alt: "ポーズバナー",
        src: "/supar-banner/pause.png",
      };
    case "RESULT":
      return {
        alt: "リザルトバナー",
        src: "/supar-banner/result.png",
      };
  }
};

export type SuparBunnerProps = {
  variant: SuparBannerVariant;
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparBanner = ({
  variant,
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparBunnerProps) => {
  const { alt, src } = getImageProps(variant);

  const initialMotion = { opacity: 0, x: 24 };
  const animateMotion = {
    opacity: 1,
    x: 0,
    transition: { delay: enterAnimationDelay },
  };
  const exitMotion = {
    opacity: 0,
    x: -24,
    transition: { delay: exitAnimationDelay },
  };

  return (
    <motion.div
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge("h-[115px] w-[380px]", className)}
      {...props}
    >
      <Image
        className="h-auto w-full"
        alt={alt}
        src={src}
        width={380}
        height={115}
        priority={true}
      />
    </motion.div>
  );
};
