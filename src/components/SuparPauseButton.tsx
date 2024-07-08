import { motion, MotionProps } from "framer-motion";
import { HTMLAttributes, useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export type SuparPauseButtonProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLButtonElement> &
  MotionProps;

export const SuparPauseButton = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparPauseButtonProps) => {
  const { player, setIsPlay } = useContext(MusicContext);

  const initialMotion = { opacity: 0, y: -24 };
  const animateMotion = {
    opacity: 1,
    y: 0,
    transition: { delay: enterAnimationDelay },
  };
  const exitMotion = {
    opacity: 0,
    y: -24,
    transition: { delay: exitAnimationDelay },
  };

  const handleClick = () => {
    if (player && setIsPlay) {
      setIsPlay(false);
      player.requestPause();
    }
  };

  return (
    <motion.button
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge(
        "flex h-[56px] w-[56px] cursor-pointer items-center justify-center",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <img alt="ポーズボタン" src="/pause-button.png" />
    </motion.button>
  );
};
