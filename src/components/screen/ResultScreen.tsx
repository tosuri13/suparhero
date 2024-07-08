import { motion } from "framer-motion";
import { useContext, useMemo } from "react";

import { MusicContext } from "@/components/MusicProvider";
import { SuparBanner } from "@/components/SuparBanner";
import { SuparButton } from "@/components/SuparButton";
import {
  SuparRankImage,
  SuparRankImageVariant,
} from "@/components/SuparRankImage";
import { useJudges } from "@/hooks/useJudges";
import { useSetScreen } from "@/hooks/useScreen";

import { SuparCommentImage } from "../SuparCommentImage";

const getRank = (accuracy: number): SuparRankImageVariant => {
  if (accuracy <= 50.0) {
    return "C";
  } else if (accuracy < 75.0) {
    return "B";
  } else if (accuracy < 90.0) {
    return "A";
  } else {
    return "S";
  }
};

export const ResultScreen = () => {
  const { player, setBeat, setIsFinish, setIsPlay, setPhrase } =
    useContext(MusicContext);
  const { data: judges } = useJudges();
  const { mutate: setScreen } = useSetScreen();

  const accuracy = useMemo(() => {
    if (judges.length !== 0) {
      const flatJudges = judges.flat();
      const accuracy =
        flatJudges.filter((judge) => !judge).length / flatJudges.length;

      return Math.round(accuracy * 1000) / 10;
    } else {
      return 0.0;
    }
  }, [judges]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex h-full items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <SuparBanner variant="RESULT" />
        <div className="relative flex h-[171px] w-[326px] flex-row items-center">
          <img className="absolute" alt="スコアボード" src="/score-board.png" />
          <div className="relative flex h-full w-full flex-row justify-center">
            <p className="absolute left-[38px] top-[68px] text-[32px]">{`${accuracy}%`}</p>
            <SuparRankImage
              variant={getRank(accuracy)}
              className="absolute left-[188px] top-[54px]"
            />
          </div>
        </div>
        <SuparButton
          className="mt-[16px]"
          variant="BACKTOTITLE"
          onClick={handleBackToTitleClick}
        />
        <div className="relative h-[280px] w-full">
          <SuparCommentImage
            variant={getRank(accuracy)}
            className="absolute left-[12px] top-[48px]"
          />
          <img
            alt="レンきゅんが褒めてくれる画像"
            src="/renkyun/happy.png"
            className="absolute -right-[8%] top-0 w-[240px]"
          />
        </div>
      </div>
    </motion.div>
  );
};
