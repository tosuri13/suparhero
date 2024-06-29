"use client";

import { useContext } from "react";

import { MusicContext } from "@/components/MusicProvider";
import { LoadingScreen } from "@/components/screen/LoadingScreen";
import { PlayScreen } from "@/components/screen/PlayScreen";
import { TitleScreen } from "@/components/screen/TitleScreen";
import { useScreen } from "@/hooks/useScreen";

export default function AppPage() {
  const { player } = useContext(MusicContext);
  const { data: screen } = useScreen();

  if (!player) {
    return <LoadingScreen />;
  }

  if (screen === "TITLE") {
    return <TitleScreen />;
  }

  if (screen === "PLAY") {
    return <PlayScreen />;
  }

  if (screen === "RESULT") {
    return <TitleScreen />;
  }
}
