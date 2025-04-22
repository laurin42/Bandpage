"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import "@/styles/introAnimation.css"; // Use a dedicated CSS file

interface IntroAnimationProps {
  onComplete: () => void; // Callback when animation finishes
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track mount status
  const animationDuration = 3500; // Animation duration in ms

  useEffect(() => {
    setIsMounted(true); // Component is mounted

    // Start animation shortly after mount
    const startTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 200); // Small delay

    // Call onComplete after animation duration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, animationDuration + 100); // Add delay to ensure animation visually finishes

    // Cleanup timers on unmount
    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]); // Include onComplete in dependency array

  // Render null initially or if not mounted to avoid premature rendering server-side
  if (!isMounted) {
    return null;
  }

  return (
    <div className="intro-logo-container">
      <Image
        src="/logo.png"
        alt="Burnheart Mockery Logo Animation"
        width={500}
        height={500}
        priority
        className={clsx(
          "intro-animated-logo",
          startAnimation && "intro-logo-animate" // Use specific class names
        )}
        style={{
          maxWidth: "80%",
          maxHeight: "80%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default IntroAnimation;
