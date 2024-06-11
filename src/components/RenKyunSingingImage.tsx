import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export const RenkyunSingingImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const { beat } = useContext(MusicContext);
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
      <img alt="レンきゅんが歌っている画像" src="/renkyun-singing.png" />
    </motion.div>
  );
};
