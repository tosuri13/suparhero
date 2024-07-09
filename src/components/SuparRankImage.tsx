import { motion, MotionProps } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { RankType } from "@/types/RankType";

const getImageProps = (rank: RankType): { alt: string; src: string } => {
  switch (rank) {
    case "C":
      return {
        alt: "ランクC",
        src: "/supar-rank/rank-c.png",
      };
    case "B":
      return {
        alt: "ランクB",
        src: "/supar-rank/rank-b.png",
      };
    case "A":
      return {
        alt: "ランクA",
        src: "/supar-rank/rank-a.png",
      };
    case "S":
      return {
        alt: "ランクS",
        src: "/supar-rank/rank-s.png",
      };
  }
};

export type SuparRankImageProps = {
  rank: RankType;
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparRankImage = ({
  rank,
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparRankImageProps) => {
  const { alt, src } = getImageProps(rank);

  const initialMotion = { opacity: 0, scale: 1.5 };
  const animateMotion = {
    opacity: 1,
    scale: 1.0,
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
      className={twMerge("h-[106px] w-[113px]", className)}
      {...props}
    >
      <Image
        className="h-auto w-full"
        alt={alt}
        src={src}
        width={208.7}
        height={195.4}
        priority={true}
      />
    </motion.div>
  );
};
