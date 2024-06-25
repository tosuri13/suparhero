import "@/app/globals.css";

import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";

import { JudgesProvider } from "@/components/JudgesProvider";
import { MusicProvider } from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "SUPARHERO",
  description: "Lyric Application for MAGICAL MIRAI Programming Contest 2024",
};

const zen_maru_gothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  variable: "--font-zen-maru-gothic",
  weight: ["300", "400", "500", "700", "900"],
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" className={`${zen_maru_gothic.variable}`}>
      <body>
        <MusicProvider>
          <JudgesProvider>
            <div className="h-svh w-full overflow-hidden">{children}</div>
          </JudgesProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
