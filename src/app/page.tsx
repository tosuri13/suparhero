"use client";

import { useContext } from "react";

import { LyricBoard } from "@/components/LyricBoard";
import { MusicContext } from "@/components/MusicProvider";
import { RenkyunSingingImage } from "@/components/RenKyunSingingImage";

export default function AppPage() {
  const { player } = useContext(MusicContext);

  if (!player) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>😴 読み込み中ですん...</p>
      </div>
    );
  }

  const handleClick = () => {
    player.isPlaying ? player.requestPause() : player.requestPlay();
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-between bg-[url('/background.png')]">
      <h1 className="text-[32px]" onClick={() => handleClick()}>
        SUPARHERO
      </h1>
      <RenkyunSingingImage className="absolute -right-[16%] bottom-[8%] w-[64%]" />
      <LyricBoard className="z-10 h-[30%]" />
    </div>
  );
}
