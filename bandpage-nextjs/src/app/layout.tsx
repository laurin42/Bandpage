import type { Metadata } from "next";
import { Calistoga, Titillium_Web } from "next/font/google";
import "@/styles/globals.scss";
import "@/styles/layout.scss";

const calistoga = Calistoga({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-calistoga",
  display: "swap",
});

const titilliumWeb = Titillium_Web({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-titillium-web",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Burnheart Mockery",
  description: "Official Website of the Band Burnheart Mockery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${calistoga.variable} ${titilliumWeb.variable}`}>
        {children}
      </body>
    </html>
  );
}
