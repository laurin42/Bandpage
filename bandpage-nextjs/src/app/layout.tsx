import type { Metadata } from "next";
// Remove default font imports if not used
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" dir="ltr">
      {" "}
      {/* Added dir="ltr" from original */}
      <head>
        {/* Add Google Font links from original HTML */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />{" "}
        {/* Use crossOrigin="anonymous" for React */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Calistoga&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        {/* Removed unused Roboto font link for now, can be added if needed */}
        {/* Font Awesome script - consider importing icons directly or using a React library later */}
        <script
          src="https://kit.fontawesome.com/a062562745.js"
          crossOrigin="anonymous"
          async // Add async for better performance
        ></script>
      </head>
      {/* Use Tailwind's dark mode and apply base styles */}
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {/* Removed default font classNames */}
        {children}
      </body>
    </html>
  );
}
