import { SuparBanner } from "@/components/SuparBanner";
import { SuparButton } from "@/components/SuparButton";
import { SuparDescriptionCarousel } from "@/components/SuparDescriptionCarousel";
import { useSetScreen } from "@/hooks/useScreen";

export const TutorialScreen = () => {
  const { mutate: setScreen } = useSetScreen();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SuparBanner variant="HOWTOPLAY" />
        <SuparDescriptionCarousel
          enterAnimationDelay={0.1}
          exitAnimationDelay={0.1}
        />
        <SuparButton
          variant="BACKTOTITLE"
          onClick={() => setScreen("TITLE")}
          enterAnimationDelay={0.2}
          exitAnimationDelay={0.2}
        />
      </div>
    </div>
  );
};
