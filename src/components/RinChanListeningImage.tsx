import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { JudgesContext } from "@/components/JudgesProvider";
import { MusicContext } from "@/components/MusicProvider";

export const RinChanListeningImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const { beat } = useContext(MusicContext);
  const { judges } = useContext(JudgesContext);
  const controls = useAnimationControls();

  useEffect(() => {
    if (judges.length !== 0 && beat) {
      void controls.start(
        { y: [8, 0] },
        { duration: beat.duration / 5000, ease: "easeOut" },
      );
    }
  }, [judges]);

  return (
    <motion.div animate={controls} className={twMerge("", className)}>
      <img alt="リンちゃんが聞いている画像" src="/rinchan-listening.png" />
    </motion.div>
  );
};
