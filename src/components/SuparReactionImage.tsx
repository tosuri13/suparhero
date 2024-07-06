import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useJudges } from "@/hooks/useJudges";

export const SuparReactionImage = ({
  className = "",
}: {
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: judges } = useJudges();

  useEffect(() => {
    if (judges.length === 0) {
      return;
    }

    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [judges]);

  return (
    <>
      {judges.length !== 0 && isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -20 }}
          transition={{ duration: 0.1 }}
          className={twMerge("h-[102px] w-[104px]", className)}
        >
          {judges[judges.length - 1].every((judge) => !judge) ? (
            <img alt="良い反応" src="/supar-reaction/good.png" />
          ) : (
            <img alt="悪い反応" src="/supar-reaction/bad.png" />
          )}
        </motion.div>
      )}
    </>
  );
};
