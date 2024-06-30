import { Dispatch, SetStateAction, useContext } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";

export const PauseButton = ({
  className = "",
  setIsPause,
}: {
  className?: string;
  setIsPause: Dispatch<SetStateAction<boolean>>;
}) => {
  const { player } = useContext(MusicContext);

  const handleClick = () => {
    if (player) {
      setIsPause(true);
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
      <div className="bg-background-secondary h-full w-2" />
      <div className="bg-background-secondary h-full w-2" />
    </div>
  );
};
