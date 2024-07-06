import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparButtonVariant =
  | "START"
  | "HOWTOPLAY"
  | "BACKTOTITLE"
  | "RESTART";

const getImageProps = (
  variant: SuparButtonVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "START":
      return {
        alt: "スタートボタン",
        src: "/supar-button/start.png",
      };
    case "HOWTOPLAY":
      return {
        alt: "チュートリアルボタン",
        src: "/supar-button/how-to-play.png",
      };
    case "BACKTOTITLE":
      return {
        alt: "タイトルに戻るボタン",
        src: "/supar-button/back-to-title.png",
      };
    case "RESTART":
      return {
        alt: "リスタートボタン",
        src: "/supar-button/restart.png",
      };
  }
};

export const SuparButton = ({
  variant,
  className = "",
  ...props
}: {
  variant: SuparButtonVariant;
  className?: string;
} & HTMLAttributes<HTMLButtonElement>) => {
  const { alt, src } = getImageProps(variant);

  return (
    <button
      className={twMerge("h-[66px] w-[250px] cursor-pointer", className)}
      {...props}
    >
      <img alt={alt} src={src} />
    </button>
  );
};
