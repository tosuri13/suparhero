import { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { SuparBanner } from "@/components/SuparBanner";
import { SuparButton } from "@/components/SuparButton";
import { useSetScreen } from "@/hooks/useScreen";

export const PauseScreen = ({ className = "" }: { className?: string }) => {
  const { player, setIsPlay } = useContext(MusicContext);
  const { mutate: setScreen } = useSetScreen();

  const handleRestartClick = () => {
    if (player && setIsPlay) {
      setIsPlay(true);
      player.requestPlay();
    }
  };

  const handleBackToTitleClick = () => {
    if (player) {
      player.requestStop();
      player.requestMediaSeek(0);
      setScreen("TITLE");
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
        <SuparBanner variant="PAUSE" animationDisable />
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <SuparButton
            variant="RESTART"
            onClick={handleRestartClick}
            animationDisable
          />
          <SuparButton
            variant="BACKTOTITLE"
            onClick={handleBackToTitleClick}
            animationDisable
          />
        </div>
      </div>
    </div>
  );
};
