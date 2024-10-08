import { motion, useAnimationControls } from "framer-motion";
import Image from "next-export-optimize-images/image";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useJudges } from "@/hooks/useJudges";

export const SuparReactionImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const { data: judges } = useJudges();
  const controls = useAnimationControls();

  useEffect(() => {
    if (judges.length === 0) {
      return;
    }

    void controls.start({
      opacity: [0, 1, 1, 0],
      y: [16, 0, 0, 16],
      transition: {
        ease: "linear",
        duration: 0.5,
        times: [0, 0.2, 0.9, 1],
      },
    });
  }, [judges]);

  return (
    <>
      {judges.length !== 0 && (
        <motion.div
          animate={controls}
          className={twMerge("h-[102px] w-[104px]", className)}
        >
          {judges[judges.length - 1].every((judge) => !judge) ? (
            <Image
              className="h-auto w-full"
              alt="良い反応"
              src="/supar-reaction/good.png"
              width={124.7}
              height={122.5}
            />
          ) : (
            <Image
              className="h-auto w-full"
              alt="悪い反応"
              src="/supar-reaction/bad.png"
              width={124.7}
              height={122.5}
            />
          )}
        </motion.div>
      )}
    </>
  );
};
