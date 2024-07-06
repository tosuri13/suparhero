import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparBannerVariant = "HOWTOPLAY" | "PAUSE" | "RESULT";

const getImageProps = (
  variant: SuparBannerVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "HOWTOPLAY":
      return {
        alt: "チュートリアルバナー",
        src: "/supar-banner/how-to-play.png",
      };
    case "PAUSE":
      return {
        alt: "ポーズバナー",
        src: "/supar-banner/pause.png",
      };
    case "RESULT":
      return {
        alt: "リザルトバナー",
        src: "/supar-banner/result.png",
      };
  }
};

export const SuparBanner = ({
  variant,
  className = "",
  ...props
}: {
  variant: SuparBannerVariant;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const { alt, src } = getImageProps(variant);

  return (
    <div className={twMerge("h-[115px] w-[380px]", className)} {...props}>
      <img alt={alt} src={src} />
    </div>
  );
};
