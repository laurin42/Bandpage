"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import "@/styles/introAnimation.scss";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [applyAnimationClass, setApplyAnimationClass] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const initialDelay = 200;
  const fadeAnimationDuration = 1600;
  const animationHoldBeforeFade = 200;

  useEffect(() => {
    setIsMounted(true);

    const applyClassTimer = setTimeout(() => {
      setApplyAnimationClass(true);
    }, initialDelay);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, initialDelay + animationHoldBeforeFade + fadeAnimationDuration + 100);

    return () => {
      clearTimeout(applyClassTimer);
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
          applyAnimationClass && "intro-logo-animate"
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
