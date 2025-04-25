"use client"; // Mark as client component

import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import Bio from "@/components/Bio"; // Removed import
import BioTile from "@/components/BioTile";
import IntroAnimation from "@/components/IntroAnimation";
import MusicSection from "@/components/MusicSection";
import Concerts from "@/components/Concerts";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import "@/styles/page.css";
import "@/styles/social-section.css";
import { useRef, useState, useEffect } from "react";

// Define bio descriptions
const bioDescriptions: { [key: string]: string } = {
  alex: "ist der charismatische Frontmann und Lead-Sänger. Seine kraftvolle Stimme und energiegeladene Bühnenpräsenz ziehen das Publikum in den Bann. Er schreibt die meisten Songtexte.",
  luca: "zaubert an der Leadgitarre. Seine Soli sind legendär und reichen von gefühlvollen Melodien bis zu schnellen Riffs. Er ist der kreative Kopf hinter vielen Arrangements.",
  lenny:
    "sorgt am Schlagzeug für den nötigen Groove und ein sicheres Timing – das Rückgrat unseres Sounds. Nebenbei kümmert er sich auch um alles, was mit Musikproduktion zu tun hat: Aufnehmen, Mixen und Mastern – alles aus einer Hand.",
  max: "liefert an der Rhythmusgitarre das solide Fundament. Seine Akkorde und Rhythmen geben den Songs Struktur und Drive. Er ist das harmonische Uhrwerk der Band.",
  laurin:
    "bedient den Bass und sorgt für die tiefen Frequenzen. Seine Basslines sind groovig und melodisch zugleich. Er verbindet Rhythmus und Harmonie auf einzigartige Weise.",
};

// Section IDs in display order - UPDATED
const sectionIds = [
  "home",
  "music",
  // "bio", // Removed bio section
  "alex",
  "luca",
  "lenny",
  "max",
  "laurin",
  "konzerte",
  "social",
  "footer-section", // Add footer ID
];

// Map section IDs to logical groups for header text
const sectionToLogicalGroup = (id: string): string => {
  if (["alex", "luca", "lenny", "max", "laurin"].includes(id)) {
    return "ueber-uns";
  }
  if (id === "music") {
    return "musik";
  }
  if (id === "konzerte") {
    return "konzerte";
  }
  if (id === "social") {
    return "social";
  }
  if (id === "footer-section") {
    // Map footer to its group
    return "footer";
  }
  // 'home' maps to 'default' (Burnheart Mockery)
  // 'bio' removed
  return "default";
};

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  // Initialize state consistently for server and initial client render
  const [showIntro, setShowIntro] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState("home");
  const [activeLogicalGroup, setActiveLogicalGroup] = useState("default");
  const [headerText, setHeaderText] = useState("Burnheart Mockery");

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Store the flag in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("introPlayed", "true");
    }
  };

  // Effect to check sessionStorage AFTER hydration and update state if needed
  useEffect(() => {
    if (sessionStorage.getItem("introPlayed") === "true") {
      setShowIntro(false);
    }
    // Run only once on mount
  }, []);

  // Update logical group directly when active section ID changes
  useEffect(() => {
    const newGroup = sectionToLogicalGroup(activeSectionId);
    setActiveLogicalGroup((prevGroup) =>
      prevGroup !== newGroup ? newGroup : prevGroup
    );
  }, [activeSectionId]);

  // Update header text based on the active logical group
  useEffect(() => {
    let newHeaderText = "Burnheart Mockery"; // Default for 'home'
    if (activeLogicalGroup === "musik") {
      newHeaderText = "Unsere Musik";
    } else if (activeLogicalGroup === "ueber-uns") {
      newHeaderText = "Über uns";
    } else if (activeLogicalGroup === "konzerte") {
      newHeaderText = "Konzerte";
    } else if (activeLogicalGroup === "social") {
      newHeaderText = "Social Media";
    } else if (activeLogicalGroup === "footer") {
      // Add case for footer
      newHeaderText = "Navigation"; // Or "Sitemap"
    }
    // Removed check for activeSectionId === 'bio'
    setHeaderText(newHeaderText);
  }, [activeLogicalGroup]); // Remove activeSectionId dependency

  // Effect to handle Intersection Observer (remains the same, observes fewer IDs)
  useEffect(() => {
    const scrollElement = mainRef.current;
    if (!scrollElement || showIntro) return;
    let headerHeight = 60;
    // ... header height calculation ...
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
    const observerOptions = {
      root: scrollElement,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0.6,
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId((prevId) =>
            entry.target.id !== prevId ? entry.target.id : prevId
          );
        }
      });
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    // Observe remaining sections
    sectionIds.forEach((id) => {
      const sectionElement = document.getElementById(id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, [showIntro]);

  return (
    <div>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <Header headerText={headerText} introComplete={!showIntro} />

      <main ref={mainRef}>
        <section id="home">
          <Hero introComplete={!showIntro} />
        </section>

        <MusicSection />

        {/* Bio section removed */}
        {/* 
        <section id="bio">
          <Bio />
        </section> 
        */}

        <BioTile
          id="alex"
          imageUrl="/alexBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.alex}
        >
          <></>
        </BioTile>

        {/* ... other BioTiles ... */}
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

        {/* Add Social Section (Now before Konzerte) */}
        <section id="social" className="social-section-bg">
          <div className="social-section-overlay">
            <SocialLinks />
          </div>
        </section>

        {/* Konzerte Section (Now after Social) */}
        <section id="konzerte">
          <Concerts />
        </section>

        {/* Wrap Footer in a section for consistent layout and scroll spying */}
        <section id="footer-section">
          <Footer />
        </section>
      </main>
    </div>
  );
}
