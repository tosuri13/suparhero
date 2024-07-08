import { motion, MotionProps, useAnimationControls } from "framer-motion";
import { HTMLAttributes, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export type SuparEffectImageVariant = "GOOD" | "BAD";

const getImageProps = (
  variant: SuparEffectImageVariant,
): { alt: string; src: string } => {
  switch (variant) {
    case "GOOD":
      return {
        alt: "良いエフェクト",
        src: "/supar-effect/good.png",
      };
    case "BAD":
      return {
        alt: "悪いエフェクト",
        src: "/supar-effect/bad.png",
      };
  }
};

export type SuparEffectImageProps = {
  variant: SuparEffectImageVariant;
  className?: string;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparEffectImage = ({
  variant,
  className = "",
  ...props
}: SuparEffectImageProps) => {
  const { alt, src } = getImageProps(variant);
  const controls = useAnimationControls();

  useEffect(() => {
    void controls.start({
      opacity: [1, 0],
      scale: [0.9, 1.2],
      transition: {
        ease: "easeOut",
        duration: 0.4,
        times: [0, 1],
      },
    });
  }, []);

  return (
    <motion.div
      animate={controls}
      className={twMerge("w-[80px] min-w-[80px]", className)}
      {...props}
    >
      <img alt={alt} src={src} />
    </motion.div>
  );
};
