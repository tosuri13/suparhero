import { useContext } from "react";

import { MusicContext } from "@/components/MusicProvider";
import { SuparButton } from "@/components/SuparButton";
import { SuparTitleLogoImage } from "@/components/SuparTitleLogoImage";
import { useClearJudges } from "@/hooks/useJudges";
import { useSetScreen } from "@/hooks/useScreen";

export const TitleScreen = () => {
  const { player, setBeat, setIsFinish, setIsPlay, setPhrase } =
    useContext(MusicContext);
  const { mutate: clearJudges } = useClearJudges();
  const { mutate: setScreen } = useSetScreen();

  const handleStartClick = () => {
    if (player && setBeat && setIsFinish && setIsPlay && setPhrase) {
      player.requestMediaSeek(0);
      setBeat(undefined);
      setPhrase(undefined);
      setIsFinish(false);
      setIsPlay(true);
    }
    clearJudges();
    setScreen("PLAY");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[100px]">
        <SuparTitleLogoImage />
        <div className="flex flex-col items-center gap-[16px]">
          <SuparButton
            variant="START"
            onClick={handleStartClick}
            enterAnimationDelay={0.3}
            exitAnimationDelay={0.1}
          />
          <SuparButton
            variant="HOWTOPLAY"
            onClick={() => setScreen("TUTORIAL")}
            enterAnimationDelay={0.4}
            exitAnimationDelay={0.2}
          />
        </div>
      </div>
    </div>
  );
};
