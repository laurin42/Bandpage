"use client"; // Mark as client component

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import BioTile from "@/components/BioTile";
import IntroAnimation from "@/components/IntroAnimation";
import MusicSection from "@/components/MusicSection";
import "@/styles/page.css";
import { useRef, useState, useEffect } from "react";

// Simple throttle function (simplified types)
function throttle(
  func: (...args: any[]) => void,
  limit: number
): (...args: any[]) => void {
  let inThrottle: boolean;
  return function (...args) {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      func.apply(this, args);
    }
  };
}

// Define bio descriptions
const bioDescriptions: { [key: string]: string } = {
  alex: "ist der charismatische Frontmann und Lead-Sänger. Seine kraftvolle Stimme und energiegeladene Bühnenpräsenz ziehen das Publikum in den Bann. Er schreibt die meisten Songtexte.",
  luca: "zaubert an der Leadgitarre. Seine Soli sind legendär und reichen von gefühlvollen Melodien bis zu schnellen Riffs. Er ist der kreative Kopf hinter vielen Arrangements.",
  lenny:
    "sorgt am Schlagzeug für den richtigen Groove. Mit präzisem Timing und dynamischem Spiel bildet er das rhythmische Rückgrat der Band. Er ist der Puls von Burnheart Mockery.",
  max: "liefert an der Rhythmusgitarre das solide Fundament. Seine Akkorde und Rhythmen geben den Songs Struktur und Drive. Er ist das harmonische Uhrwerk der Band.",
  laurin:
    "bedient den Bass und sorgt für die tiefen Frequenzen. Seine Basslines sind groovig und melodisch zugleich. Er verbindet Rhythmus und Harmonie auf einzigartige Weise.",
};

// Section IDs in display order
const sectionIds = [
  "home",
  "bio",
  "music",
  "alex",
  "luca",
  "lenny",
  "max",
  "laurin",
];

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState("home"); // State for active section
  const [headerText, setHeaderText] = useState("Burnheart Mockery"); // State for header text

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Update header text based on active section
  useEffect(() => {
    let newHeaderText = "Burnheart Mockery"; // Default
    if (activeSectionId === "music") {
      newHeaderText = "Musik";
    } else if (
      ["alex", "luca", "lenny", "max", "laurin"].includes(activeSectionId)
    ) {
      newHeaderText = "Über uns";
    } // 'home' and 'bio' keep the default
    setHeaderText(newHeaderText);
  }, [activeSectionId]);

  // Effect to handle scroll and update active section
  useEffect(() => {
    const scrollElement = mainRef.current;
    if (!scrollElement) return;

    // Get header height (similar logic to BioTile)
    let headerHeight = 60; // Default fallback
    if (typeof window !== "undefined") {
      try {
        const rootStyle = window.getComputedStyle(document.documentElement);
        const headerHeightValue = rootStyle
          .getPropertyValue("--header-height")
          .trim();
        if (headerHeightValue.endsWith("rem")) {
          const baseFontSize = parseFloat(
            window.getComputedStyle(document.documentElement).fontSize
          );
          headerHeight = parseFloat(headerHeightValue) * (baseFontSize || 16);
        } else if (headerHeightValue.endsWith("px")) {
          headerHeight = parseFloat(headerHeightValue);
        }
      } catch {}
    }

    const handleScroll = () => {
      let currentActiveId = "home"; // Default to home
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const containerRect = scrollElement.getBoundingClientRect();
          const topRelativeToContainer = rect.top - containerRect.top;

          // Consider a section active if its top is within a certain range below the header
          // Adjust the threshold (e.g., 150) as needed for sensitivity
          const activationThreshold = headerHeight + 150;
          if (
            topRelativeToContainer >= 0 &&
            topRelativeToContainer < activationThreshold
          ) {
            // Calculate distance of the section's top from the header bottom
            const distance = Math.abs(topRelativeToContainer - headerHeight);
            if (distance < minDistance) {
              minDistance = distance;
              currentActiveId = id;
            }
          }
        }
      }
      // Only update state if the active section has actually changed
      setActiveSectionId((prevId) =>
        prevId !== currentActiveId ? currentActiveId : prevId
      );
    };

    // Throttle the scroll handler
    const throttledHandleScroll = throttle(handleScroll, 150); // Check every 150ms

    scrollElement.addEventListener("scroll", throttledHandleScroll, {
      passive: true,
    });
    // Initial check
    handleScroll();

    return () => {
      scrollElement.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [showIntro]); // Re-run if showIntro changes (e.g., after intro completes)

  return (
    <div>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <Header headerText={headerText} />
      <main ref={mainRef}>
        <section id="home">
          <Hero introComplete={!showIntro} />
        </section>

        <section id="bio">
          <Bio />
        </section>

        <MusicSection />

        <BioTile
          id="alex"
          imageUrl="/alexBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.alex}
        >
          <></>
        </BioTile>

        <BioTile
          id="luca"
          imageUrl="/lucaBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.luca}
        >
          <></>
        </BioTile>

        <BioTile
          id="lenny"
          imageUrl="/lennyBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.lenny}
        >
          <></>
        </BioTile>

        <BioTile
          id="max"
          imageUrl="/maxBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.max}
        >
          <></>
        </BioTile>

        <BioTile
          id="laurin"
          imageUrl="/laurinBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.laurin}
        >
          <></>
        </BioTile>
      </main>
    </div>
  );
}
