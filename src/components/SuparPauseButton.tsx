import { motion, MotionProps } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes, useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export type SuparPauseButtonProps = {
  className?: string;
  disable?: boolean;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLButtonElement> &
  MotionProps;

export const SuparPauseButton = ({
  className = "",
  disable = false,
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
    if (player && setIsPlay && !disable) {
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
        `flex h-[56px] w-[56px]  items-center justify-center ${disable ? "cursor-default" : "cursor-pointer"}`,
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Image
        className="h-auto w-full"
        alt="ポーズボタン"
        src="/play/pause-button.png"
        width={68.5}
        height={67.5}
      />
    </motion.button>
  );
};
