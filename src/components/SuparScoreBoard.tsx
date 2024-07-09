import { AnimatePresence, motion, MotionProps } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { SuparRankImage } from "@/components/SuparRankImage";
import { getRank } from "@/utils/getRank";

export type SuparScoreBoardProps = {
  accuracy: number;
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparScoreBoard = ({
  accuracy,
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparScoreBoardProps) => {
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
      className={twMerge(
        "relative flex h-[171px] w-[326px] flex-row items-center",
        className,
      )}
      {...props}
    >
      <Image
        className="absolute h-auto w-full"
        alt="スコアボード"
        src="/result/score-board.png"
        width={327}
        height={171}
      />
      <div className="relative flex h-full w-full flex-row justify-center">
        <p className="absolute left-[38px] top-[68px] text-[32px]">{`${accuracy}%`}</p>
        <AnimatePresence>
          <SuparRankImage
            rank={getRank(accuracy)}
            className="absolute left-[188px] top-[54px]"
            enterAnimationDelay={enterAnimationDelay + 0.3}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
