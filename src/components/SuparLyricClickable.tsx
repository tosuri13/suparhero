import { Dispatch, SetStateAction, useState } from "react";

import { SuparEffectImage } from "@/components/SuparEffectImage";
import { incorrectsDict } from "@/configs/incorrectsDict";
import { SuparLyricType } from "@/types/SuparLyricType";

const getLyricBody = (
  suparLyric: SuparLyricType,
  isClicked: boolean,
): string => {
  if (suparLyric.isFalse && !isClicked) {
    const incorrects = incorrectsDict[suparLyric.body];
    const randomIndex = Math.floor(Math.random() * incorrects.length);

    return incorrects[randomIndex];
  } else {
    return suparLyric.body;
  }
};

export const SuparLyricClickable = ({
  suparLyric,
  judgeIndex,
  setJudge,
}: {
  suparLyric: SuparLyricType;
  judgeIndex: number;
  setJudge: Dispatch<SetStateAction<boolean[]>>;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <p
      className={`relative cursor-pointer text-[32px] ${isClicked ? "text-text-clicked" : "text-text-clickable"}`}
      onClick={() => {
        if (!isClicked) {
          setIsClicked(true);
          setJudge((prevJudge) => {
            const newJudge = [...prevJudge];
            newJudge[judgeIndex] = !newJudge[judgeIndex];

            return newJudge;
          });
        }
      }}
    >
      {getLyricBody(suparLyric, isClicked)}
      {isClicked && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <SuparEffectImage variant={suparLyric.isFalse ? "GOOD" : "BAD"} />
        </div>
      )}
    </p>
  );
};
