import { SuparButton } from "@/components/SuparButton";
import { SuparTitleLogoImage } from "@/components/SuparTitleLogoImage";
import { useSetScreen } from "@/hooks/useScreen";

export const TitleScreen = () => {
  const { mutate: setScreen } = useSetScreen();

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-[100px]">
        <SuparTitleLogoImage />
        <div className="flex flex-col items-center gap-[16px]">
          <SuparButton
            variant="START"
            onClick={() => setScreen("PLAY")}
            enterAnimationDelay={0.1}
          />
          <SuparButton
            variant="HOWTOPLAY"
            onClick={() => setScreen("TUTORIAL")}
            enterAnimationDelay={0.2}
            exitAnimationDelay={0.1}
          />
        </div>
      </div>
    </div>
  );
};
