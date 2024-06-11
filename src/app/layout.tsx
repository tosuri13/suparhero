import "@/app/globals.css";

import type { Metadata } from "next";

import { MusicProvider } from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "SUPARHERO",
  description: "Lyric Application for MAGICAL MIRAI Programming Contest 2024",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
