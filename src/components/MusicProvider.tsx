"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IBeat, IPhrase, Player, PlayerListener } from "textalive-app-api";

import { emotionsDict } from "@/configs/emotionsDict";

export type MusicType = {
  beat: IBeat | undefined;
  emotion: EmotionType;
  isFinish: boolean;
  isPlay: boolean;
  phrase: IPhrase | undefined;
  player: Player | undefined;
  setBeat: Dispatch<SetStateAction<IBeat | undefined>> | undefined;
  setEmotion: Dispatch<SetStateAction<EmotionType>> | undefined;
  setIsFinish: Dispatch<SetStateAction<boolean>> | undefined;
  setIsPlay: Dispatch<SetStateAction<boolean>> | undefined;
  setPhrase: Dispatch<SetStateAction<IPhrase | undefined>> | undefined;
  setPlayer: Dispatch<SetStateAction<Player | undefined>> | undefined;
};
export type EmotionType = "HAPPY" | "SAD" | "NEUTRAL";

export const MusicContext = createContext<MusicType>({
  beat: undefined,
  emotion: "NEUTRAL",
  isFinish: false,
  isPlay: false,
  phrase: undefined,
  player: undefined,
  setBeat: undefined,
  setEmotion: undefined,
  setIsPlay: undefined,
  setIsFinish: undefined,
  setPhrase: undefined,
  setPlayer: undefined,
});

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [beat, setBeat] = useState<IBeat | undefined>(undefined);
  const [emotion, setEmotion] = useState<EmotionType>("NEUTRAL");
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [phrase, setPhrase] = useState<IPhrase | undefined>(undefined);
  const [player, setPlayer] = useState<Player | undefined>(undefined);
  const mediaElementRef = useRef(null);

  const delay = 100;

  useEffect(() => {
    const player = new Player({
      app: {
        token: process.env.NEXT_PUBLIC_TEXTALIVE_TOKEN || "",
      },
      mediaElement: mediaElementRef.current!,
    });

    const playerListener: PlayerListener = {
      onTimerReady: () => {
        let phrase = player.video.firstPhrase;
        let count = 0;

        while (phrase) {
          const emotion = emotionsDict[count];
          phrase.animate = (now, unit) => {
            if (unit.startTime <= now && unit.endTime - delay > now) {
              setPhrase(unit);
              setEmotion(emotion);
            }
          };

          if (phrase.next === null) {
            break;
          }

          phrase = phrase.next;
          count += 1;
        }

        setPlayer(player);
      },
      onTimeUpdate: (position) => {
        if (!player.video.findPhrase(position + delay)) {
          setPhrase(undefined);
        }
        if (player.video.duration - 2000 <= position) {
          setIsFinish(true);
        }
        setBeat(player.findBeat(position + delay) ?? undefined);
      },
      onPlay: () => setIsPlay(true),
      onStop: () => setIsPlay(false),
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
      value={{
        beat,
        emotion,
        isFinish,
        isPlay,
        phrase,
        player,
        setBeat,
        setEmotion,
        setIsFinish,
        setIsPlay,
        setPhrase,
        setPlayer,
      }}
    >
      <div className="hidden" ref={mediaElementRef} />
      {children}
    </MusicContext.Provider>
  );
};
