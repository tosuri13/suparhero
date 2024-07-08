import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type RenKyunCommentImageProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLImageElement> &
  MotionProps;

export const RenKyunCommentImage = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: RenKyunCommentImageProps) => {
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
    <motion.img
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge("", className)}
      alt="レンきゅんが褒めてくれる画像"
      src="/renkyun/happy.png"
      {...props}
    />
  );
};
