import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useJudges } from "@/hooks/useJudges";

export const ReactionImage = ({ className = "" }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: judges } = useJudges();

  useEffect(() => {
    if (judges.length === 0) {
      return;
    }

    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [judges]);

  return (
    <>
      {judges.length !== 0 && isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -20 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.1 }}
          className={twMerge("", className)}
        >
          {judges[judges.length - 1].every((judge) => !judge) ? (
            <img alt="良い反応" src="/good-reaction.png" />
          ) : (
            <img alt="悪い反応" src="/bad-reaction.png" />
          )}
        </motion.div>
      )}
    </>
  );
};
