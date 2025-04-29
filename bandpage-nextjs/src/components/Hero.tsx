"use client";

import React from "react";
import "@/styles/hero.scss";
import clsx from "clsx";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  id: string;
  introComplete: boolean;
}

const Hero: React.FC<HeroProps> = ({ id, introComplete }) => {
  const scrollToMusic = () => {
    document.getElementById("music")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id={id} className="hero-section">
      {/* Black overlay that fades out */}
      <div
        className={clsx(
          "hero-background-overlay",
          introComplete && "overlay-hidden"
        )}
      ></div>

      <div className={clsx("hero-content", introComplete && "content-visible")}>
        {/* <h1>Burnheart Mockery</h1> */}

        <button onClick={scrollToMusic} className="cta-button">
          Jetzt reinhören
          <ArrowDown size={22} className="arrow-icon" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
