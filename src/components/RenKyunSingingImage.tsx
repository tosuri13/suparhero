import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { EmotionType } from "@/types/EmotionType";

const getSrcImagefromEmotion = (emotion: EmotionType) => {
  switch (emotion) {
    case "HAPPY":
      return "/renkyun-happy-image.png";
    case "SAD":
      return "/renkyun-sad-image.png";
    case "NEUTRAL":
      return "/renkyun-neutral-image.png";
  }
};

export const RenkyunSingingImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const { beat, phrase, emotion } = useContext(MusicContext);
  const controls = useAnimationControls();

  useEffect(() => {
    if (beat) {
      void controls.start(
        { y: [8, 0] },
        { duration: beat.duration / 5000, ease: "easeOut" },
      );
    }
  }, [beat]);

  return (
    <motion.div animate={controls} className={twMerge("", className)}>
      <img
        alt="レンきゅんが歌っている画像"
        src={
          phrase
            ? getSrcImagefromEmotion(emotion)
            : "/renkyun-not-singing-image.png"
        }
      />
    </motion.div>
  );
};
