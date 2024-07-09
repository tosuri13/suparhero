import { motion, MotionProps } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparButtonVariant =
  | "START"
  | "HOWTOPLAY"
  | "BACKTOTITLE"
  | "RESTART";

const getImageProps = (
  variant: SuparButtonVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "START":
      return {
        alt: "スタートボタン",
        src: "/supar-button/start.png",
      };
    case "HOWTOPLAY":
      return {
        alt: "チュートリアルボタン",
        src: "/supar-button/how-to-play.png",
      };
    case "BACKTOTITLE":
      return {
        alt: "タイトルに戻るボタン",
        src: "/supar-button/back-to-title.png",
      };
    case "RESTART":
      return {
        alt: "リスタートボタン",
        src: "/supar-button/restart.png",
      };
  }
};

export type SuparButtonProps = {
  variant: SuparButtonVariant;
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLButtonElement> &
  MotionProps;

export const SuparButton = ({
  variant,
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparButtonProps) => {
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
    <motion.button
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge("h-[66px] w-[246px] cursor-pointer", className)}
      {...props}
    >
      <Image
        className="h-auto w-full"
        alt={alt}
        src={src}
        width={250}
        height={66}
        priority={true}
      />
    </motion.button>
  );
};
