import { Dispatch, SetStateAction, useState } from "react";

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
  const [isFalse, setIsFalse] = useState(suparLyric.isFalse);

  return (
    <p
      className={`text-[32px] ${isFalse ? "text-red-600" : "text-blue-600"}`}
      onClick={() => {
        setIsFalse(!isFalse);
        setJudge((prevJudge) => {
          const newJudge = [...prevJudge];
          newJudge[judgeIndex] = !newJudge[judgeIndex];

          return newJudge;
        });
      }}
    >
      {suparLyric.body}
    </p>
  );
};
