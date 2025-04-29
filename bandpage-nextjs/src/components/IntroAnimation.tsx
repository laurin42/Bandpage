"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import "@/styles/introAnimation.scss";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const animationDuration = 3500;

  useEffect(() => {
    setIsMounted(true);

    const startTimer = setTimeout(() => {
      setStartAnimation(true);
    }, 200);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, animationDuration + 100);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

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
          startAnimation && "intro-logo-animate"
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
