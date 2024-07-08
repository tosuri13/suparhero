import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { RankType } from "@/types/RankType";

const getImageProps = (rank: RankType): { alt: string; src: string } => {
  switch (rank) {
    case "C":
      return {
        alt: "もう一回!!",
        src: "/supar-comment/comment-c.png",
      };
    case "B":
      return {
        alt: "まだまだ!!",
        src: "/supar-comment/comment-b.png",
      };
    case "A":
      return {
        alt: "すごいっ!!",
        src: "/supar-comment/comment-a.png",
      };
    case "S":
      return {
        alt: "えらいっ!!",
        src: "/supar-comment/comment-s.png",
      };
  }
};

export type SuparCommentImageProps = {
  rank: RankType;
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparCommentImage = ({
  rank,
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparCommentImageProps) => {
  const { alt, src } = getImageProps(rank);

  const initialMotion = { opacity: 0, scale: 0.5, y: 40 };
  const animateMotion = {
    opacity: 1,
    scale: 1.0,
    y: 0,
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
      className={twMerge("h-[150px] w-[200px]", className)}
      {...props}
    >
      <img alt={alt} src={src} />
    </motion.div>
  );
};
