import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SuparCommentImageVariant = "C" | "B" | "A" | "S";

const getImageProps = (
  variant: SuparCommentImageVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "C":
      return {
        alt: "もう一回!!",
        src: "/supar-comment/comment-c.png",
      };
    case "B":
      return {
        alt: "まだまだ!!",
        src: "/supar-comment/comment-b.png",
      };
    case "A":
      return {
        alt: "すごいっ!!",
        src: "/supar-comment/comment-a.png",
      };
    case "S":
      return {
        alt: "えらいっ!!",
        src: "/supar-comment/comment-s.png",
      };
  }
};

export const SuparCommentImage = ({
  variant,
  className = "",
  ...props
}: {
  variant: SuparCommentImageVariant;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const { alt, src } = getImageProps(variant);

  return (
    <div className={twMerge("h-[150px] w-[200px]", className)} {...props}>
      <img alt={alt} src={src} />
    </div>
  );
};
