import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  // TODO: Add logo rotation logic
  // TODO: Convert CSS to Tailwind classes

  return (
    <header className="sticky top-0 z-10 bg-black shadow-[20px_-130px_96px_91px_rgba(9,9,9,0.7)] w-full">
      <nav className="relative py-5 font-['Calistoga'] text-clamp-nav">
        <Link
          href="#home"
          id="logo-image"
          className="flex justify-center w-full absolute top-0 z-10"
        >
          {/* Use Next.js Image component for optimization */}
          {/* TODO: Verify image path after moving assets */}
          <Image
            src="/logo.png" // Assuming logo.png is moved to public folder
            alt="Band Logo"
            width={100} // Adjust width/height as needed
            height={100}
            className="absolute top-0 h-28 object-contain" // Tailwind equivalent of .logo styles
            priority // Prioritize loading the logo
          />
        </Link>
        <ul className="flex w-full">
          <li className="flex justify-around w-1/2">
            <Link
              href="#home"
              className="text-gray-200 hover:text-white text-lg"
            >
              Home
            </Link>
            <a
              href="https://wonderl.ink/@burnheart-mockery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white text-lg"
            >
              Social
            </a>
          </li>
          <li className="flex justify-around w-1/2">
            <Link
              href="#concerts"
              className="text-gray-200 hover:text-white text-lg"
            >
              Gigs
            </Link>
            {/* TODO: Update booking link if migrating contact page */}
            <Link
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white text-lg"
            >
              Booking
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
