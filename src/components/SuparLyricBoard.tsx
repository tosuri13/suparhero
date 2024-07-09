import { motion, MotionProps, useAnimationControls } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { HTMLAttributes } from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { SuparLyricClickable } from "@/components/SuparLyricClickable";
import { SuparLyricUnclickable } from "@/components/SuparLyricUnclickable";
import { useUpdateJudges } from "@/hooks/useJudges";
import { usePrevious } from "@/hooks/usePrevious";
import { phraseToSuparLyrics } from "@/utils/phraseToSuparLyrics";

export type SuparLyricBoardProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparLyricBoard = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparLyricBoardProps) => {
  const [judge, setJudge] = useState<boolean[]>([]);
  const { isPlay, phrase } = useContext(MusicContext);
  const { mutate: updateJudges } = useUpdateJudges();
  const prevPhrase = usePrevious(phrase);
  const controls = useAnimationControls();

  const initialMotion = { opacity: 0, x: 24 };
  const animateMotion = {
    opacity: 1,
    x: 0,
    transition: { delay: enterAnimationDelay },
  };
  const exitMotion = {
    opacity: 0,
    x: 24,
    transition: { delay: exitAnimationDelay },
  };

  const suparLyrics = useMemo(
    () => (phrase ? phraseToSuparLyrics(phrase) : []),
    [phrase],
  );

  useEffect(() => {
    setJudge(
      suparLyrics
        .filter((suparLyric) => Boolean(suparLyric?.isClickable))
        .map((suparLyric) => suparLyric!.isFalse),
    );
  }, [suparLyrics]);

  useEffect(() => {
    if (phrase) {
      void controls.start({
        opacity: [0, 1, 1, 0],
        y: [4, 0, 0, 4],
        transition: {
          ease: "linear",
          duration: phrase.duration / 1000 - 0.1,
          times: [0, 0.02, 0.98, 1],
        },
      });
    }
    if (prevPhrase) {
      updateJudges(judge);
    }
  }, [phrase]);

  useEffect(() => {
    if (!isPlay) {
      controls.stop();
    }
  }, [isPlay]);

  const lyrics = useMemo(() => {
    let judgeIndexCount = 0;

    return suparLyrics.map((suparLyric, index) => {
      if (suparLyric) {
        if (suparLyric.isClickable) {
          const judgeIndex = judgeIndexCount;
          judgeIndexCount += 1;

          return (
            <SuparLyricClickable
              key={index}
              suparLyric={suparLyric}
              judgeIndex={judgeIndex}
              setJudge={setJudge}
            />
          );
        } else {
          return <SuparLyricUnclickable key={index} suparLyric={suparLyric} />;
        }
      } else {
        return <span key={index} className="inline-block w-2" />;
      }
    });
  }, [suparLyrics]);

  return (
    <motion.div
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge(
        "relative h-[240px] min-h-[240px] w-full px-[32px] pb-[12px] pt-[58px]",
        className,
      )}
      {...props}
    >
      <Image
        className="absolute bottom-0 left-0 h-[240px] w-full"
        alt="歌詞ボード"
        src="/play/lyric-board.png"
        width={497.5}
        height={242}
      />
      <motion.div
        animate={controls}
        className="relative flex flex-row flex-wrap items-start"
      >
        {lyrics}
      </motion.div>
    </motion.div>
  );
};
