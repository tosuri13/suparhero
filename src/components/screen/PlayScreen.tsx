import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

import { LyricBoard } from "@/components/LyricBoard";
import { MusicContext } from "@/components/MusicProvider";
import { PauseButton } from "@/components/PauseButton";
import { ReactionImage } from "@/components/ReactionImage";
import { RenkyunSingingImage } from "@/components/RenKyunSingingImage";
import { RinChanListeningImage } from "@/components/RinChanListeningImage";
import { PauseScreen } from "@/components/screen/PauseScreen";
import { useClearJudges } from "@/hooks/useJudges";
import { useSetScreen } from "@/hooks/useScreen";

export const PlayScreen = () => {
  const [isWaiting, setIsWaiting] = useState(true);
  const { player, isFinish, isPlay } = useContext(MusicContext);
  const { mutate: clearJudges } = useClearJudges();
  const { mutate: setScreen } = useSetScreen();

  useEffect(() => {
    if (player) {
      clearJudges();

      const timer = setTimeout(() => {
        setIsWaiting(false);
        player.requestPlay();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [player]);

  useEffect(() => {
    if (isFinish) {
      setScreen("RESULT");
    }
  }, [isFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-full w-full flex-col items-center justify-end overflow-hidden"
    >
      {!isPlay && !isWaiting && (
        <PauseScreen className="absolute left-0 top-0 z-20" />
      )}
      <PauseButton className="absolute right-3 top-3" />
      <ReactionImage className="absolute left-[24%] top-[12%] z-10 w-[30%]" />
      <RinChanListeningImage className="absolute -left-[14%] bottom-[20%] w-[64%]" />
      <RenkyunSingingImage className="absolute -right-[12%] bottom-[20%] w-[64%]" />
      <LyricBoard className="z-10 h-[28%]" />
    </motion.div>
  );
};
