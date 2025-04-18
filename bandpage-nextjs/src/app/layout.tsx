import type { Metadata } from "next";
import { Calistoga, Titillium_Web } from "next/font/google"; // Import fonts
import "./globals.css";

// Configure fonts
const calistoga = Calistoga({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  variable: "--font-calistoga",
});

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"], // Specify needed weights
  style: ["normal", "italic"], // Specify needed styles
  display: "optional",
  variable: "--font-titillium-web", // CSS variable for Titillium Web
  // Optionally set one as the default by uncommenting className here
  // and applying it to body instead of html
  // className: "font-titillium",
});

export const metadata: Metadata = {
  title: "Burnheart Mockery", // Updated Title
  description: "Official website for the band Burnheart Mockery", // Updated Description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      // Apply font variables
      className={`${calistoga.variable} ${titilliumWeb.variable}`}
    >
      <head>
        {/* Font Awesome script - consider importing icons directly or using a React library later */}
        <script
          src="https://kit.fontawesome.com/a062562745.js"
          crossOrigin="anonymous"
          async // Add async for better performance
        ></script>
      </head>
      {/* Use Tailwind's dark mode and apply base styles */}
      {/* Apply the default font class here if needed */}
      <body
        className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased ${titilliumWeb.className}`}
      >
        {children}
      </body>
    </html>
  );
}
