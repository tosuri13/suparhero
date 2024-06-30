import { useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export const PauseButton = ({ className = "" }: { className?: string }) => {
  const { player, setIsPlay } = useContext(MusicContext);

  const handleClick = () => {
    if (player && setIsPlay) {
      setIsPlay(false);
      player.requestPause();
    }
  };

  return (
    <div
      className={twMerge(
        "flex h-6 w-6 cursor-pointer flex-row justify-between",
        className,
      )}
      onClick={handleClick}
    >
      <div className="h-full w-2 bg-background-secondary" />
      <div className="h-full w-2 bg-background-secondary" />
    </div>
  );
};
