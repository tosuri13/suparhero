import "@/app/globals.css";

import type { Metadata } from "next";
import { RocknRoll_One } from "next/font/google";

import { MusicProvider } from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "SUPARHERO",
  description: "Lyric Application for MAGICAL MIRAI Programming Contest 2024",
};

const rocknroll_one = RocknRoll_One({
  subsets: ["latin"],
  variable: "--font-rocknroll-one",
  weight: "400",
});

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp" className={`${rocknroll_one.variable}`}>
      <body>
        <MusicProvider>
          <div className="h-svh w-full overflow-hidden">{children}</div>
        </MusicProvider>
      </body>
    </html>
  );
}
