import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

const carouselItems = [
  {
    src: "/tutorial/page-1.png",
    description: (
      <>
        何の影響か突然「SUPERHEROになるんだ!!」と言い出したレンくん...
        <br />
        その決意をリンちゃんに聞いてもらおうとしているけれど、なんだか単語が間違っているみたい!!
      </>
    ),
  },
  {
    src: "/tutorial/page-2.png",
    description: (
      <>
        <span className="text-[14px] text-text-clickable">赤色</span>
        になっている単語が出てきたら、間違っていないかチェックしてあげよう!!
        <br />
        もし間違っていたら単語をタップして、リンちゃんに気づかれる前にこっそり直してあげよう!!
      </>
    ),
  },
  {
    src: "/tutorial/page-3.png",
    description: (
      <>
        間違えていない単語をタップしちゃったり、間違えている単語をスルーしないように気をつけてね!!
      </>
    ),
  },
];

export type SuparDescriptionCarouselProps = {
  className?: string;
  animationDisable?: boolean;
  enterAnimationDelay?: number;
  exitAnimationDelay?: number;
} & HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const SuparDescriptionCarousel = ({
  className = "",
  animationDisable = false,
  enterAnimationDelay = 0.0,
  exitAnimationDelay = 0.0,
  ...props
}: SuparDescriptionCarouselProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [directionFactor, setDirectionFactor] = useState(0);

  const initialMotion = { opacity: 0, x: 24 };
  const animateMotion = {
    opacity: 1,
    x: 0,
    transition: { delay: enterAnimationDelay },
  };
  const exitMotion = {
    opacity: 0,
    x: -48,
    transition: { delay: exitAnimationDelay },
  };

  return (
    <motion.div
      initial={!animationDisable ? initialMotion : {}}
      animate={!animationDisable ? animateMotion : {}}
      exit={!animationDisable ? exitMotion : {}}
      transition={{ duration: 0.2 }}
      className={twMerge(
        "flex w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      <div className="flex w-full flex-row items-center justify-center gap-[24px]">
        {carouselIndex !== 0 ? (
          <img
            className="w-[48px] cursor-pointer"
            alt="前のページへ"
            src="/tutorial/left-arrow.png"
            onClick={() => {
              setDirectionFactor(-1);
              setCarouselIndex((prev) => prev - 1);
            }}
          />
        ) : (
          <span className="w-[48px]" />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, x: directionFactor * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -directionFactor * 24 }}
            transition={{ duration: 0.1 }}
            className="flex w-[212px] border-[4px] border-border-secondary bg-background-secondary p-[2px]"
          >
            <img
              alt="チュートリアルの画像"
              src={carouselItems[carouselIndex].src}
            />
          </motion.div>
        </AnimatePresence>
        {carouselIndex !== carouselItems.length - 1 ? (
          <img
            className="w-[48px] cursor-pointer"
            alt="次のページへ"
            src="/tutorial/right-arrow.png"
            onClick={() => {
              setDirectionFactor(1);
              setCarouselIndex((prev) => prev + 1);
            }}
          />
        ) : (
          <span className="w-[48px]" />
        )}
      </div>
      <div className="relative mb-[16px] mt-[8px] flex h-[112px] w-[368px] items-center justify-center">
        <img
          className="absolute"
          alt="説明ボード"
          src="/tutorial/description-board.png"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, x: directionFactor * 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -directionFactor * 8 }}
            transition={{ duration: 0.1 }}
            className="relative flex h-full w-full items-start justify-start"
          >
            <p className="mx-[20px] my-[14px] text-[14px] text-text-tertiary">
              {carouselItems[carouselIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
