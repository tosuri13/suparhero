import { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { SuparBanner } from "@/components/SuparBanner";
import { SuparButton } from "@/components/SuparButton";
import { useSetScreen } from "@/hooks/useScreen";

export const PauseScreen = ({ className = "" }: { className?: string }) => {
  const { player, setBeat, setIsFinish, setIsPlay, setPhrase } =
    useContext(MusicContext);
  const { mutate: setScreen } = useSetScreen();

  const handleRestartClick = () => {
    if (player && setIsPlay) {
      player.requestPlay();
    }
  };

  const handleBackToTitleClick = () => {
    if (player && setBeat && setIsFinish && setIsPlay && setPhrase) {
      setBeat(undefined);
      setPhrase(undefined);
      setIsPlay(false);
      setIsFinish(false);
      setScreen("TITLE");
      player.requestStop();
    }
  };

  return (
    <div
      className={twMerge(
        "flex h-full w-full flex-col items-center justify-center bg-background-pause",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-[80px]">
        <SuparBanner variant="PAUSE" />
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <SuparButton variant="RESTART" onClick={handleRestartClick} />
          <SuparButton variant="BACKTOTITLE" onClick={handleBackToTitleClick} />
        </div>
      </div>
    </div>
  );
};
