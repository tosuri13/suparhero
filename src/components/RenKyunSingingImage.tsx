import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { HTMLAttributes, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { EmotionType, MusicContext } from "@/components/MusicProvider";

const getSrcImagefromEmotion = (emotion: EmotionType) => {
  switch (emotion) {
    case "HAPPY":
      return "/renkyun/happy.png";
    case "SAD":
      return "/renkyun/sad.png";
    case "NEUTRAL":
      return "/renkyun/neutral.png";
  }
};

export type RenkyunSingingImageProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const RenkyunSingingImage = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: RenkyunSingingImageProps) => {
  const { beat, phrase, emotion } = useContext(MusicContext);
  const controls = useAnimationControls();

  const initialMotion = { opacity: 0, x: 24 };
  const animateMotion = {
    opacity: 1,
    x: 0,
    transition: { delay: enterAnimationDelay },
  };
  const exitMotion = {
    opacity: 0,
    x: 24,
    transition: { delay: exitAnimationDelay },
  };

  useEffect(() => {
    if (beat) {
      void controls.start(
        { y: [8, 0] },
        { duration: beat.duration / 5000, ease: "easeOut" },
      );
    }
  }, [beat]);

  return (
    <motion.div
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge("", className)}
      {...props}
    >
      <motion.div animate={controls} className="h-full w-full">
        <img
          alt="レンきゅんが歌っている画像"
          src={
            phrase
              ? getSrcImagefromEmotion(emotion)
              : "/renkyun/not-singing.png"
          }
        />
      </motion.div>
    </motion.div>
  );
};
