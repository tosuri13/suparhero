import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { SuparBanner } from "@/components/SuparBanner";
import { SuparButton } from "@/components/SuparButton";
import { useSetScreen } from "@/hooks/useScreen";

const pages = [
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

export const TutorialScreen = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [directionFactor, setDirectionFactor] = useState(0);
  const { mutate: setScreen } = useSetScreen();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SuparBanner variant="HOWTOPLAY" />
        <div className="flex w-full flex-row items-center justify-center gap-[24px]">
          {pageIndex !== 0 ? (
            <img
              className="w-[48px] cursor-pointer"
              alt="前のページへ"
              src="/left-arrow.png"
              onClick={() => {
                setDirectionFactor(-1);
                setPageIndex((prev) => prev - 1);
              }}
            />
          ) : (
            <span className="w-[48px]" />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={pageIndex}
              initial={{ opacity: 0, x: directionFactor * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -directionFactor * 24 }}
              transition={{ duration: 0.1 }}
              className="border-border-secondary flex w-[212px] border-[4px] bg-background-secondary p-[2px]"
            >
              <img alt="チュートリアルの画像" src={pages[pageIndex].src} />
            </motion.div>
          </AnimatePresence>
          {pageIndex !== pages.length - 1 ? (
            <img
              className="w-[48px] cursor-pointer"
              alt="次のページへ"
              src="/right-arrow.png"
              onClick={() => {
                setDirectionFactor(1);
                setPageIndex((prev) => prev + 1);
              }}
            />
          ) : (
            <span className="w-[48px]" />
          )}
        </div>
        <div className="relative mb-[16px] mt-[8px] flex h-[112px] w-[368px] items-start justify-start">
          <img
            className="absolute"
            alt="説明ボード"
            src="/description-board.png"
          />
          <p className="text-text-tertiary relative mx-[20px] my-[14px] text-[14px]">
            {pages[pageIndex].description}
          </p>
        </div>
        <SuparButton variant="BACKTOTITLE" onClick={() => setScreen("TITLE")} />
      </div>
    </motion.div>
  );
};
