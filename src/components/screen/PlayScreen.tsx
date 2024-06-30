import { useContext, useEffect, useState } from "react";

import { LyricBoard } from "@/components/LyricBoard";
import { MusicContext } from "@/components/MusicProvider";
import { PauseButton } from "@/components/PauseButton";
import { ReactionImage } from "@/components/ReactionImage";
import { RenkyunSingingImage } from "@/components/RenKyunSingingImage";
import { RinChanListeningImage } from "@/components/RinChanListeningImage";
import { useClearJudges } from "@/hooks/useJudges";

import { PauseScreen } from "./PauseScreen";

export const PlayScreen = () => {
  const [isPause, setIsPause] = useState(false);
  const { player } = useContext(MusicContext);
  const { mutate: clearJudges } = useClearJudges();

  useEffect(() => {
    if (player) {
      clearJudges();

      const timer = setTimeout(() => {
        player.requestPlay();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [player]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end overflow-hidden">
      {isPause && (
        <PauseScreen
          className="absolute left-0 top-0 z-20"
          setIsPause={setIsPause}
        />
      )}
      <PauseButton className="absolute right-3 top-3" setIsPause={setIsPause} />
      <ReactionImage className="absolute left-[24%] top-[12%] z-10 w-[30%]" />
      <RinChanListeningImage className="absolute -left-[14%] bottom-[20%] w-[64%]" />
      <RenkyunSingingImage className="absolute -right-[12%] bottom-[20%] w-[64%]" />
      <LyricBoard className="z-10 h-[28%]" />
    </div>
  );
};
