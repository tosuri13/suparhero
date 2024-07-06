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
    <button
      className={twMerge(
        "flex h-[56px] w-[56px] cursor-pointer items-center justify-center",
        className,
      )}
      onClick={handleClick}
    >
      <img alt="ポーズボタン" src="/pause-button.png" />
    </button>
  );
};
