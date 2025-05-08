"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BioTile from "@/components/BioTile";
import IntroAnimation from "@/components/IntroAnimation";
import MusicSection from "@/components/MusicSection";
import Concerts from "@/components/Concerts";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import "@/styles/page.scss";
import "@/styles/social-section.scss";
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useCustomScrollbar from "@/hooks/useCustomScrollbar";
import useSectionObserver from "@/hooks/useSectionObserver";
import {
  bioDescriptions,
  sectionIds,
  sectionToLogicalGroup,
  pathToSectionId,
} from "@/data/pageData";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const pathname = usePathname();

  useCustomScrollbar({
    mainRef,
    scrollbarTrackRef,
    scrollbarThumbRef,
    showIntro,
  });

  // Use the new section observer hook
  const { headerText } = useSectionObserver({
    mainRef,
    sectionIds,
    sectionToLogicalGroup,
    showIntro,
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("introPlayed", "true");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("introPlayed") === "true") {
      setShowIntro(false);
    }
  }, []);

  // Effect to scroll to section based on pathname or hash after intro
  useEffect(() => {
    if (showIntro || !mainRef.current) return;

    const mainElement = mainRef.current;
    let scrolled = false;

    const scrollToSection = (sectionId: string | undefined) => {
      if (!sectionId) return false;
      const targetElement = document.getElementById(sectionId);
      if (targetElement && mainElement) {
        // Simple scrollIntoView, can be refined with offset if header overlaps
        // const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
        // const elementTopRelativeToMain = targetElement.getBoundingClientRect().top - mainElement.getBoundingClientRect().top;
        // mainElement.scrollTop = mainElement.scrollTop + elementTopRelativeToMain - headerHeight;
        targetElement.scrollIntoView({ behavior: "auto" });
        return true;
      }
      return false;
    };

    // 1. Try scrolling based on pathname
    let targetSectionIdFromPath: string | undefined = undefined;
    if (pathname) {
      targetSectionIdFromPath = pathToSectionId[pathname];
    }
    if (targetSectionIdFromPath) {
      scrolled = scrollToSection(targetSectionIdFromPath);
    }

    // 2. If not scrolled by pathname, try scrolling based on hash
    if (!scrolled && typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.substring(1);
      scrolled = scrollToSection(hashId);
    }

    // 3. If still not scrolled, ensure it's at the top (e.g., for "/")
    //    or if the path is "/" and no specific section was mapped.
    if (!scrolled && pathname === "/") {
      mainElement.scrollTop = 0;
      // setActiveSectionId("home"); // Optionally reset active section
    }
  }, [showIntro, pathname, mainRef]); // mainRef is stable, but good to include if its .current is key

  return (
    <div>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <Header headerText={headerText} introComplete={!showIntro} />

      {/* Fake Scrollbar Container - Positioned above Header */}
      <div ref={scrollbarTrackRef} className="fake-scrollbar-track">
        <div ref={scrollbarThumbRef} className="fake-scrollbar-thumb"></div>
      </div>

      <main ref={mainRef}>
        <Hero id="home" introComplete={!showIntro} />

        <MusicSection />

        {/* === NEW ORDER START === */}

        {/* 1. Social Section */}
        <section id="social" className="social-section-bg">
          <div className="social-section-overlay">
            <SocialLinks />
          </div>
        </section>

        {/* 2a. Desktop "Über uns" Section (Hidden below lg) */}
        <section id="ueber-uns-desktop">
          <div className="member-grid">
            <div className="member-item alex">
              <div className="overlay-base">
                <h2>Alex</h2>
                <p>{bioDescriptions.alex}</p>
              </div>
            </div>
            <div className="member-item luca">
              <div className="overlay-base">
                <h2>Luca</h2>
                <p>{bioDescriptions.luca}</p>
              </div>
            </div>
            <div className="member-item lenny">
              <div className="overlay-base">
                <h2>Lenny</h2>
                <p>{bioDescriptions.lenny}</p>
              </div>
            </div>
            <div className="member-item max">
              <div className="overlay-base">
                <h2>Max</h2>
                <p>{bioDescriptions.max}</p>
              </div>
            </div>
            <div className="member-item laurin">
              <div className="overlay-base">
                <h2>Laurin</h2>
                <p>{bioDescriptions.laurin}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2b. Mobile/Tablet BioTiles Section (Hidden above lg) */}
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

        {/* 3. Konzerte Section */}
        <section id="konzerte">
          <Concerts />
        </section>

        {/* 4. Footer Section (Sitemap) */}
        <section id="footer-section">
          <Footer />
        </section>

        {/* === NEW ORDER END === */}
      </main>
    </div>
  );
}
