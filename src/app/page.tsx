"use client";

import { useContext } from "react";

import { MusicContext } from "@/components/MusicProvider";

export default function AppPage() {
  const { player } = useContext(MusicContext);

  if (!player) {
    return (
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        <div className="flex grow items-center justify-center">
          <p>😴 読み込み中ですん...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <h1>SUPARHERO</h1>
    </div>
  );
}
