import { useContext, useEffect, useState } from "react";

import { MusicContext } from "@/components/MusicProvider";
import { RenkyunSingingImage } from "@/components/RenKyunSingingImage";
import { RinChanListeningImage } from "@/components/RinChanListeningImage";
import { PauseScreen } from "@/components/screen/PauseScreen";
import { SuparLyricBoard } from "@/components/SuparLyricBoard";
import { SuparPauseButton } from "@/components/SuparPauseButton";
import { SuparReactionImage } from "@/components/SuparReactionImage";
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
    <div className="relative flex h-full w-full flex-col items-center justify-end">
      {!isPlay && !isWaiting && (
        <PauseScreen className="absolute left-0 top-0 z-20" />
      )}
      <SuparPauseButton
        key="supar-pause-button"
        className="absolute right-3 top-3 z-10"
        exitAnimationDelay={0.3}
      />
      <SuparReactionImage className="absolute left-[24%] top-[12%] z-10" />
      <RinChanListeningImage
        key="rinchan-listening-image"
        className="absolute -left-[14%] bottom-[20%] w-[64%]"
        enterAnimationDelay={0.2}
        exitAnimationDelay={0.1}
      />
      <RenkyunSingingImage
        key="renkyun-singing-image"
        className="absolute -right-[12%] bottom-[20%] w-[64%]"
        enterAnimationDelay={0.3}
      />
      <SuparLyricBoard
        key="supar-lyric-board"
        enterAnimationDelay={0.1}
        exitAnimationDelay={0.2}
      />
    </div>
  );
};
