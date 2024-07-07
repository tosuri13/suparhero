import { motion } from "framer-motion";

import { SuparButton } from "@/components/SuparButton";
import { useSetScreen } from "@/hooks/useScreen";

export const TitleScreen = () => {
  const { mutate: setScreen } = useSetScreen();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full items-center justify-center"
    >
      <div className="flex flex-col items-center gap-[100px]">
        <img
          className="max-w-full"
          alt="SUPAEHEROのタイトルロゴ"
          src="/title-logo.png"
        />
        <div className="flex flex-col items-center gap-[16px]">
          <SuparButton variant="START" onClick={() => setScreen("PLAY")} />
          <SuparButton
            variant="HOWTOPLAY"
            onClick={() => setScreen("TUTORIAL")}
          />
        </div>
      </div>
    </motion.div>
  );
};
