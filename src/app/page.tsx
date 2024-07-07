"use client";

import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Player } from "textalive-app-api";

import { MusicContext } from "@/components/MusicProvider";
import { LoadingScreen } from "@/components/screen/LoadingScreen";
import { PlayScreen } from "@/components/screen/PlayScreen";
import { ResultScreen } from "@/components/screen/ResultScreen";
import { TitleScreen } from "@/components/screen/TitleScreen";
import { TutorialScreen } from "@/components/screen/TutorialScreen";
import { ScreenType, useScreen } from "@/hooks/useScreen";

const renderScreen = (player: Player | undefined, screen: ScreenType) => {
  if (!player) {
    return <LoadingScreen key="loading" />;
  }

  switch (screen) {
    case "TITLE":
      return <TitleScreen key="title" />;
    case "TUTORIAL":
      return <TutorialScreen key="tutorial" />;
    case "PLAY":
      return <PlayScreen key="play" />;
    case "RESULT":
      return <ResultScreen key="result" />;
  }
};

export default function AppPage() {
  const { player } = useContext(MusicContext);
  const { data: screen } = useScreen();

  return (
    <AnimatePresence mode="wait">
      {renderScreen(player, screen)}
    </AnimatePresence>
  );
}
