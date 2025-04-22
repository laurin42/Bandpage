"use client"; // Make client component to receive props and use clsx

import React from "react";
// import Image from "next/image"; // Removed unused import
import "@/styles/hero.css"; // Keep CSS for basic hero section styling
import clsx from "clsx"; // Import clsx

interface HeroProps {
  introComplete: boolean;
}

const Hero: React.FC<HeroProps> = ({ introComplete }) => {
  // Simple component displaying the background image
  return (
    <section
      id="home"
      className="hero-section" // Keep basic class if needed for layout.css targeting
      style={{
        backgroundImage: `url(/bpBackground.png)`,
        backgroundColor: "black", // Ensure background color remains
        // Other necessary base styles can remain or be in CSS
      }}
    >
      {/* Black overlay that fades out */}
      <div
        className={clsx(
          "hero-background-overlay",
          introComplete && "overlay-hidden" // Add class when intro is complete
        )}
      ></div>
      {/* Content inside the hero section, if any, goes here */}
      {/* For now, it just displays the background */}
    </section>
  );
};

export default Hero;
