import { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
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
        "flex h-full w-full items-center justify-center bg-background-pause",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-[32px] text-text-primary">Pause</p>
        <div className="flex flex-col items-center justify-center gap-1">
          <p
            className="cursor-pointer text-[24px] text-text-primary"
            onClick={handleRestartClick}
          >
            Restart
          </p>
          <p
            className="cursor-pointer text-[24px] text-text-primary"
            onClick={handleBackToTitleClick}
          >
            Back to Title
          </p>
        </div>
      </div>
    </div>
  );
};
