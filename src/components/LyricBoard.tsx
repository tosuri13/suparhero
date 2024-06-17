import { useContext, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ClickableSuparLyric } from "@/components/ClickableSuparLyric";
import { JudgesContext } from "@/components/JudgesProvider";
import { MusicContext } from "@/components/MusicProvider";
import { usePrevious } from "@/hooks/usePrevious";
import { phraseToSuparLyrics } from "@/utils/phraseToSuparLyrics";

export const LyricBoard = ({ className = "" }: { className?: string }) => {
  const [judge, setJudge] = useState<boolean[]>([]);
  const { phrase } = useContext(MusicContext);
  const { setJudges } = useContext(JudgesContext);
  const prevPhrase = usePrevious(phrase);

  useEffect(() => {
    if (prevPhrase && setJudges) {
      setJudges((prev) => [...prev, judge]);
    }
  }, [phrase]);

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

  const lyrics = useMemo(() => {
    let judgeIndexCount = 0;

    return suparLyrics.map((suparLyric, index) => {
      if (suparLyric) {
        if (suparLyric.isClickable) {
          const judgeIndex = judgeIndexCount;
          judgeIndexCount += 1;

          return (
            <ClickableSuparLyric
              key={index}
              suparLyric={suparLyric}
              judgeIndex={judgeIndex}
              setJudge={setJudge}
            />
          );
        } else {
          return (
            <p key={index} className="text-[32px]">
              {suparLyric.body}
            </p>
          );
        }
      } else {
        return <span key={index} className="inline-block w-[8px]" />;
      }
    });
  }, [suparLyrics]);

  return (
    <div className={twMerge("w-full bg-white p-[24px]", className)}>
      <div className="flex flex-row flex-wrap items-start">{lyrics}</div>
    </div>
  );
};
