export const LoadingScreen = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-background-secondary">
      <img
        className="h-16 w-16 animate-spin-slow"
        alt="ローディングのアイコン"
        src="/star.png"
      />
      <p className="text-[32px] text-text-secondary">Wait for the Hero...</p>
    </div>
  );
};
