"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type JudgeType = {
  judges: boolean[];
  setJudges: Dispatch<SetStateAction<boolean[]>> | undefined;
};

export const JudgeContext = createContext<JudgeType>({
  judges: [],
  setJudges: undefined,
});

export const JudgeProvider = ({ children }: { children: ReactNode }) => {
  const [judges, setJudges] = useState<boolean[]>([]);

  return (
    <JudgeContext.Provider value={{ judges, setJudges }}>
      {children}
    </JudgeContext.Provider>
  );
};
