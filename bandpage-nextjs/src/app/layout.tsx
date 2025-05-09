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
  title: "Burnheart Mockery - Deine Band für Rock & Metal",
  description:
    "Burnheart Mockery ist eine Rock- und Metalband aus Leverkusen. Hier findest du unsere Musik, Konzerttermine und mehr.",
  keywords: [
    "Burnheart Mockery",
    "Band",
    "Rock",
    "Metal",
    "Hard Rock",
    "Leverkusen",
    "Musik",
    "Konzerte",
    "Live Musik",
    "Deutsche Band",
    "German Metal Band",
  ],
  openGraph: {
    title: "Burnheart Mockery - Offizielle Webseite",
    description:
      "Entdecke die Musik, Konzerttermine und mehr von Burnheart Mockery aus Leverkusen.",
    url: "https://www.burnheart-mockery.de",
    siteName: "Burnheart Mockery",
    images: [
      {
        url: "https://www.burnheart-mockery.de/logo.png",
        width: 1240,
        height: 1240,
        alt: "Burnheart Mockery Band Logo",
      },
      {
        url: "https://www.burnheart-mockery.de/epk/bandfotoGreenGrass.webp",
        width: 1920,
        height: 1920,
        alt: "Burnheart Mockery Bandfoto",
      },
      {
        url: "https://www.burnheart-mockery.de/epk/bandfoto4.webp",
        width: 1600,
        height: 1280,
        alt: "Burnheart Mockery Bandfoto",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${calistoga.variable} ${titilliumWeb.variable}`}>
        {children}
      </body>
    </html>
  );
}
