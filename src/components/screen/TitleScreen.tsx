import { useSetScreen } from "@/hooks/useScreen";

export const TitleScreen = () => {
  const { mutate: setScreen } = useSetScreen();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-[100px]">
        <img
          className="max-w-full"
          alt="SUPAEHEROのタイトルロゴ"
          src="/title-logo.png"
        />
        <p
          className="cursor-pointer text-[32px] text-text-primary"
          onClick={() => setScreen("PLAY")}
        >
          Tap to Start
        </p>
      </div>
    </div>
  );
};
