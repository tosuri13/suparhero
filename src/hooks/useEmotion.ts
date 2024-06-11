import { useContext, useEffect, useState } from "react";

import { MusicContext } from "@/components/MusicProvider";

export type EmotionType = "HAPPY" | "RELAXED" | "ANGRY" | "SAD";

export const useEmotion = () => {
  const [emotion, setEmotion] = useState<EmotionType>("RELAXED");
  const { player, lyric, medianValenceArousal } = useContext(MusicContext);

  useEffect(() => {
    if (player && medianValenceArousal) {
      const { v: medianValence, a: medianArousal } = medianValenceArousal;
      const position = player.timer.position;
      const { v: valence, a: arousal } =
        player.data.getValenceArousal(position);

      if (valence >= medianValence && arousal >= medianArousal) {
        setEmotion("HAPPY");
      }
      if (valence >= medianValence && arousal < medianArousal) {
        setEmotion("RELAXED");
      }
      if (valence < medianValence && arousal >= medianArousal) {
        setEmotion("ANGRY");
      }
      if (valence < medianValence && arousal < medianArousal) {
        setEmotion("SAD");
      }
    }
  }, [player, lyric, medianValenceArousal]);

  return { emotion };
};
