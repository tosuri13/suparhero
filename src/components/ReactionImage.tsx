import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { JudgesContext } from "@/components/JudgesProvider";

export const ReactionImage = ({ className = "" }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { judges } = useContext(JudgesContext);

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
      {isVisible && (
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
