import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { HTMLAttributes, useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { useJudges } from "@/hooks/useJudges";

export type RinChanListeningImageProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const RinChanListeningImage = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: RinChanListeningImageProps) => {
  const [imageSrc, setImagesrc] = useState("/rinchan/default.png");
  const { beat } = useContext(MusicContext);
  const { data: judges } = useJudges();
  const controls = useAnimationControls();

  const initialMotion = { opacity: 0, x: -24 };
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

  useEffect(() => {
    if (judges.length !== 0 && beat) {
      void controls.start(
        { y: [8, 0] },
        { duration: beat.duration / 5000, ease: "easeOut" },
      );
    }
  }, [judges]);

  useEffect(() => {
    if (judges.length === 0) {
      setImagesrc("/rinchan/default.png");
      return;
    }

    setImagesrc(
      judges[judges.length - 1].every((judge) => !judge)
        ? "/rinchan/good.png"
        : "/rinchan/bad.png",
    );
    const timer = setTimeout(() => {
      setImagesrc("/rinchan/default.png");
    }, 600);

    return () => clearTimeout(timer);
  }, [judges]);

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
        <img alt="歌を聞いてくれるリンちゃんの画像" src={imageSrc} />
      </motion.div>
    </motion.div>
  );
};
