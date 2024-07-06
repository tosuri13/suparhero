import "@/app/globals.css";

import type { Metadata } from "next";
import { RocknRoll_One } from "next/font/google";

import { MusicProvider } from "@/components/MusicProvider";
import { TanstackQueryProvider } from "@/components/TanstackQueryProvider";

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
        <TanstackQueryProvider>
          <MusicProvider>
            <div className="flex h-svh w-full justify-center overflow-hidden bg-[url('/app-background.png')] bg-cover">
              <div className="h-full w-full max-w-md bg-background-primary">
                <div className="h-full w-full bg-[url('/game-background.png')] bg-cover">
                  {children}
                </div>
              </div>
            </div>
          </MusicProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
