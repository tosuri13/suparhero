import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparRankImageVariant = "C" | "B" | "A" | "S";

const getImageProps = (
  variant: SuparRankImageVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "C":
      return {
        alt: "ランクC",
        src: "/supar-rank/rank-c.png",
      };
    case "B":
      return {
        alt: "ランクB",
        src: "/supar-rank/rank-b.png",
      };
    case "A":
      return {
        alt: "ランクA",
        src: "/supar-rank/rank-a.png",
      };
    case "S":
      return {
        alt: "ランクS",
        src: "/supar-rank/rank-s.png",
      };
  }
};

export const SuparRankImage = ({
  variant,
  className = "",
  ...props
}: {
  variant: SuparRankImageVariant;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const { alt, src } = getImageProps(variant);

  return (
    <div className={twMerge("h-[106px] w-[113px]", className)} {...props}>
      <img alt={alt} src={src} />
    </div>
  );
};
