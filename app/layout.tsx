import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Happy Birthday Bao",
  description: "A memory scroll for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${playfair.variable} ${notoSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
