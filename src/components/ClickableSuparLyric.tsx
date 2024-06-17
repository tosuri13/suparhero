import { Dispatch, SetStateAction, useState } from "react";

import { incorrectsDict } from "@/configs/incorrectsDict";
import { SuparLyric } from "@/types/SuparLyric";

export const ClickableSuparLyric = ({
  suparLyric,
  judgeIndex,
  setJudge,
}: {
  suparLyric: SuparLyric;
  judgeIndex: number;
  setJudge: Dispatch<SetStateAction<boolean[]>>;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <p
      className={`text-[32px] ${isClicked ? "text-gray-600" : "text-red-600"}`}
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
    </p>
  );
};

const getLyricBody = (suparLyric: SuparLyric, isClicked: boolean): string => {
  if (suparLyric.isFalse && !isClicked) {
    const incorrects = incorrectsDict[suparLyric.body];
    const randomIndex = Math.floor(Math.random() * incorrects.length);

    return incorrects[randomIndex];
  } else {
    return suparLyric.body;
  }
};
