import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SuparButtonVariant = "START" | "HOWTOPLAY" | "BACKTOTITLE" | "RESTART";

const getImageProps = (
  variant: SuparButtonVariant,
): { alt: string; src: string } => {
  let imageProps = { alt: "", src: "" };

  if (variant === "START") {
    imageProps = {
      alt: "スタートボタン",
      src: "/supar-button/start.png",
    };
  }

  if (variant === "HOWTOPLAY") {
    imageProps = {
      alt: "チュートリアルボタン",
      src: "/supar-button/how-to-play.png",
    };
  }

  if (variant === "BACKTOTITLE") {
    imageProps = {
      alt: "タイトルに戻るボタン",
      src: "/supar-button/back-to-title.png",
    };
  }

  if (variant === "RESTART") {
    imageProps = {
      alt: "ボタン",
      src: "/supar-button/restart.png",
    };
  }

  return imageProps;
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
