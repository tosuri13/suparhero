"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IBeat,
  Player,
  PlayerListener,
} from "textalive-app-api";

import { formatPhrase } from "@/utils/formatPhrase";

export type MusicType = {
  player: Player | undefined;
  beat: IBeat | undefined;
  isPlay: boolean;
  lyric: string;
};

export const MusicContext = createContext<MusicType>({
  player: undefined,
  beat: undefined,
  isPlay: false,
  lyric: "",
});

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const [beat, setBeat] = useState<IBeat | undefined>(undefined);
  const [lyric, setLyric] = useState<string>("");
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const mediaElementRef = useRef(null);

  useEffect(() => {
    const player = new Player({
      app: {
        token: process.env.NEXT_PUBLIC_TEXTALIVE_TOKEN!,
      },
      mediaElement: mediaElementRef.current!,
    });

    const playerListener: PlayerListener = {
      onTimerReady: () => {
        let phrase = player.video.firstPhrase;
        while (phrase) {
          const formattedPhrase = formatPhrase(phrase);
          phrase.animate = (now, unit) => {
            if (unit.startTime <= now && unit.endTime > now) {
              setLyric(formattedPhrase);
            }
          };

          if (phrase.next === null) {
            break;
          }
          phrase = phrase.next;
        }

        setPlayer(player);
      },
      onTimeUpdate: (position) => {
        setBeat(player.findBeat(position) ?? undefined);
      },
      onPlay: () => setIsPlay(true),
      onPause: () => setIsPlay(false),
    };

    void player.createFromSongUrl("https://piapro.jp/t/hZ35/20240130103028", {
      video: {
        beatId: 4592293,
        chordId: 2727635,
        repetitiveSegmentId: 2824326,
        lyricId: 59415,
        lyricDiffId: 13962,
      },
    });
    player.addListener(playerListener);
  }, []);

  return (
    <MusicContext.Provider
      value={{ player, beat, isPlay, lyric }}
    >
      <div className="hidden" ref={mediaElementRef} />
      {children}
    </MusicContext.Provider>
  );
};
