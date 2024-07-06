import { motion } from "framer-motion";
import { useContext, useMemo } from "react";

import { MusicContext } from "@/components/MusicProvider";
import { useJudges } from "@/hooks/useJudges";
import { useSetScreen } from "@/hooks/useScreen";

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
      <div className="flex flex-col items-center gap-8 pb-[320px]">
        <p className="text-[32px] text-text-primary">Result</p>
        <div className="flex flex-col items-center gap-[18px]">
          <p className="text-[24px] text-text-primary">{`Accuracy: ${accuracy}%`}</p>
          <div className="flex flex-row items-center gap-3">
            {Array.from({ length: getStarsCount(accuracy) }).map((_, index) => (
              <img
                key={index}
                className="h-16 w-16"
                alt="評価用の星"
                src="/star-primary.png"
              />
            ))}
          </div>
        </div>
        <p
          className="cursor-pointer text-[24px] text-text-primary"
          onClick={handleBackToTitleClick}
        >
          Back to Title
        </p>
      </div>
      <img
        alt="レンきゅんからのコメント(えらいっ!!)"
        src="/comment-tmp.png"
        className="absolute left-[2%] top-[60%] w-[56%]"
      />
      <img
        alt="レンきゅんが褒めてくれる画像"
        src="/renkyun-happy-image.png"
        className="absolute -bottom-[12%] -right-[12%] w-[60%]"
      />
    </motion.div>
  );
};

const getStarsCount = (accuracy: number): number => {
  if (accuracy <= 50.0) {
    return 1;
  } else if (accuracy <= 80.0) {
    return 2;
  } else {
    return 3;
  }
};
