import type { Metadata } from "next";
import { Calistoga, Titillium_Web } from "next/font/google"; // Import fonts
import "@/styles/globals.css"; // Import the newly created globals.css
import "@/styles/layout.css"; // Added import for CSS file

// Configure fonts
const calistoga = Calistoga({
  weight: "400", // Calistoga usually only has 400 weight
  subsets: ["latin"],
  variable: "--font-calistoga", // CSS variable name
  display: "swap",
});

const titilliumWeb = Titillium_Web({
  weight: ["400", "600", "700"], // Include needed weights
  subsets: ["latin"],
  variable: "--font-titillium-web", // CSS variable name
  display: "swap",
});

// const inter = Inter({ subsets: ["latin"] }); // Keep if needed, otherwise remove

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
      {/* Apply font variables to body */}
      <body className={`${calistoga.variable} ${titilliumWeb.variable}`}>
        {children}
      </body>
    </html>
  );
}
