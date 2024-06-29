import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { useJudges } from "@/hooks/useJudges";

export const RinChanListeningImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const [imageSrc, setImagesrc] = useState("/rinchan-default-image.png");
  const { beat } = useContext(MusicContext);
  const { data: judges } = useJudges();
  const controls = useAnimationControls();

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
      return;
    }

    setImagesrc(
      judges[judges.length - 1].every((judge) => !judge)
        ? "/rinchan-good-reaction-image.png"
        : "/rinchan-bad-reaction-image.png",
    );
    const timer = setTimeout(() => {
      setImagesrc("/rinchan-default-image.png");
    }, 600);

    return () => clearTimeout(timer);
  }, [judges]);

  return (
    <motion.div animate={controls} className={twMerge("", className)}>
      <img alt="可愛いリンちゃんの画像" src={imageSrc} />
    </motion.div>
  );
};
