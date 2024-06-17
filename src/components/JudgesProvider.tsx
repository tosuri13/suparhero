"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export type JudgesType = {
  judges: boolean[][];
  setJudges: Dispatch<SetStateAction<boolean[][]>> | undefined;
};

export const JudgesContext = createContext<JudgesType>({
  judges: [],
  setJudges: undefined,
});

export const JudgesProvider = ({ children }: { children: ReactNode }) => {
  const [judges, setJudges] = useState<boolean[][]>([]);

  // TODO: そのうちutilsに切り出してもいいかも
  useEffect(() => {
    if (judges.length !== 0) {
      const flatJudges = judges.flat();
      const accuracy =
        flatJudges.filter((judge) => !judge).length / flatJudges.length;

      console.log(`正解率: ${Math.round(accuracy * 1000) / 10}%`);
    }
  }, [judges]);

  return (
    <JudgesContext.Provider value={{ judges, setJudges }}>
      {children}
    </JudgesContext.Provider>
  );
};
