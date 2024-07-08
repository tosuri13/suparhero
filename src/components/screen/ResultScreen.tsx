import { useMemo } from "react";

import { RenKyunCommentImage } from "@/components/RenKyunCommentImage";
import { SuparBanner } from "@/components/SuparBanner";
import { SuparButton } from "@/components/SuparButton";
import { SuparCommentImage } from "@/components/SuparCommentImage";
import { SuparScoreBoard } from "@/components/SuparScoreBoard";
import { useJudges } from "@/hooks/useJudges";
import { useSetScreen } from "@/hooks/useScreen";
import { getRank } from "@/utils/getRank";

export const ResultScreen = () => {
  const { data: judges } = useJudges();
  const { mutate: setScreen } = useSetScreen();

  const accuracy = useMemo(() => {
    if (judges.length !== 0) {
      const flatJudges = judges.flat();
      const accuracy =
        flatJudges.filter((judge) => !judge).length / flatJudges.length;

      return Math.round(accuracy * 1000) / 10;
    } else {
      return 0.0;
    }
  }, [judges]);

  const handleBackToTitleClick = () => {
    setScreen("TITLE");
  };

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-[8px]">
        <SuparBanner variant="RESULT" />
        <SuparScoreBoard
          accuracy={accuracy}
          enterAnimationDelay={0.1}
          exitAnimationDelay={0.1}
        />
        <SuparButton
          className="mt-[16px]"
          variant="BACKTOTITLE"
          onClick={handleBackToTitleClick}
          enterAnimationDelay={0.2}
          exitAnimationDelay={0.2}
        />
        <div className="relative h-[280px] w-full">
          <SuparCommentImage
            rank={getRank(accuracy)}
            className="absolute left-[12px] top-[48px]"
            enterAnimationDelay={0.8}
            exitAnimationDelay={0.3}
          />
          <RenKyunCommentImage
            className="absolute -right-[8%] top-0 w-[240px]"
            enterAnimationDelay={0.3}
            exitAnimationDelay={0.3}
          />
        </div>
      </div>
    </div>
  );
};
