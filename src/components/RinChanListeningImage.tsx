import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { usePrevious } from "@/hooks/usePrevious";

export const RinChanListeningImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const { beat, phrase } = useContext(MusicContext);
  const prevPhrase = usePrevious(phrase);
  const controls = useAnimationControls();

  useEffect(() => {
    if (prevPhrase && beat) {
      void controls.start(
        { y: [8, 0] },
        { duration: beat.duration / 5000, ease: "easeOut" },
      );
    }
  }, [phrase]);

  return (
    <motion.div animate={controls} className={twMerge("", className)}>
      <img alt="リンちゃんが聞いている画像" src="/rinchan-listening.png" />
    </motion.div>
  );
};
