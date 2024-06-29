import { useContext, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ClickableSuparLyric } from "@/components/ClickableSuparLyric";
import { MusicContext } from "@/components/MusicProvider";
import { useUpdateJudges } from "@/hooks/useJudges";
import { usePrevious } from "@/hooks/usePrevious";
import { phraseToSuparLyrics } from "@/utils/phraseToSuparLyrics";

export const LyricBoard = ({ className = "" }: { className?: string }) => {
  const [judge, setJudge] = useState<boolean[]>([]);
  const { phrase } = useContext(MusicContext);
  const { mutate: updateJudges } = useUpdateJudges();
  const prevPhrase = usePrevious(phrase);

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
    if (prevPhrase) {
      updateJudges(judge);
    }
  }, [phrase]);

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
        return <span key={index} className="inline-block w-2" />;
      }
    });
  }, [suparLyrics]);

  return (
    <div
      className={twMerge(
        "bg-background-secondary border-border-primary w-full border-t-8 px-6 py-4",
        className,
      )}
    >
      <div className="flex flex-row flex-wrap items-start">{lyrics}</div>
    </div>
  );
};
