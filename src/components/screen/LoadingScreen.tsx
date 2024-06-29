export const LoadingScreen = () => {
  return (
    <div className="bg-background-secondary flex h-full w-full flex-col items-center justify-center gap-2">
      <img
        className="animate-spin-slow h-16 w-16"
        alt="ローディングのアイコン"
        src="/star.png"
      />
      <p className="text-text-secondary text-[32px]">Wait for the Hero...</p>
    </div>
  );
};
