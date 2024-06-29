import "@/app/globals.css";

import type { Metadata } from "next";
import { RocknRoll_One } from "next/font/google";

import { JudgesProvider } from "@/components/JudgesProvider";
import { MusicProvider } from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "SUPARHERO",
  description: "Lyric Application for MAGICAL MIRAI Programming Contest 2024",
};

const rocknRollOne = RocknRoll_One({
  subsets: ["latin"],
  variable: "--font-rocknroll-one",
  weight: ["400"],
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" className={`${rocknRollOne.variable}`}>
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
