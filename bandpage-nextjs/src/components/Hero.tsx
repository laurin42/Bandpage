"use client"; // Make client component to receive props and use clsx

import React from "react";
// import Image from "next/image"; // Removed unused import
import "@/styles/hero.css"; // Keep CSS for basic hero section styling
import clsx from "clsx"; // Import clsx
import { ArrowDown } from "lucide-react"; // Import the icon

interface HeroProps {
  introComplete: boolean;
}

const Hero: React.FC<HeroProps> = ({ introComplete }) => {
  // Function to handle smooth scrolling
  const scrollToMusic = () => {
    document.getElementById("music")?.scrollIntoView({ behavior: "smooth" });
  };

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

      {/* Hero Content Container - Positioned at the bottom */}
      <div className={clsx("hero-content", introComplete && "content-visible")}>
        {/* Optional: Add a heading or slogan here */}
        {/* <h1>Burnheart Mockery</h1> */}

        {/* Call to Action Button */}
        <button onClick={scrollToMusic} className="cta-button">
          Jetzt reinhören
          <ArrowDown size={22} className="arrow-icon" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
