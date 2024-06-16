import { useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { MusicContext } from "@/components/MusicProvider";
import { phraseToSuparLyrics } from "@/utils/phraseToSuparLyrics";

export const LyricBoard = ({ className = "" }: { className?: string }) => {
  const { phrase } = useContext(MusicContext);
  const lyrics = useMemo(() => {
    const suparLyrics = phrase ? phraseToSuparLyrics(phrase) : [];

    // そのうちコンポーネントに置き換わる
    return suparLyrics.map((suparLyric, index) => {
      if (suparLyric) {
        if (suparLyric.isClickable) {
          return (
            <p key={index} className="text-[32px] text-red-600">
              {suparLyric.body}
            </p>
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
  }, [phrase]);

  return (
    <div className={twMerge("w-full bg-white p-[24px]", className)}>
      <div className="flex flex-row flex-wrap items-start">{lyrics}</div>
    </div>
  );
};
