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

// Section IDs in display order
const sectionIds = [
  "home",
  "music",
  "social",
  "alex",
  "luca",
  "lenny",
  "max",
  "laurin",
  "ueber-uns-desktop",
  "konzerte",
  "footer-section",
];

// Map section IDs to logical groups for header text
const sectionToLogicalGroup = (id: string): string => {
  if (["alex", "luca", "lenny", "max", "laurin"].includes(id)) {
    return "ueber-uns";
  }
  if (id === "ueber-uns-desktop") {
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
    return "footer";
  }
  return "default";
};

const pathToSectionId: { [key: string]: string } = {
  "/musik": "music",
  "/konzerte": "konzerte",
  "/social": "social",
  "/ueber-uns": "ueber-uns-desktop", // Default to desktop, mobile handled by visibility or further logic if needed
};

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState("home");
  const [activeLogicalGroup, setActiveLogicalGroup] = useState("default");
  const [headerText, setHeaderText] = useState("Burnheart Mockery");
  const pathname = usePathname();

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

  useEffect(() => {
    const newGroup = sectionToLogicalGroup(activeSectionId);
    setActiveLogicalGroup((prevGroup) =>
      prevGroup !== newGroup ? newGroup : prevGroup
    );
  }, [activeSectionId]);

  useEffect(() => {
    let newHeaderText = "Burnheart Mockery";
    if (activeLogicalGroup === "musik") {
      newHeaderText = "Unsere Musik";
    } else if (activeLogicalGroup === "ueber-uns") {
      newHeaderText = "Über uns";
    } else if (activeLogicalGroup === "konzerte") {
      newHeaderText = "Konzerte";
    } else if (activeLogicalGroup === "social") {
      newHeaderText = "Social";
    } else if (activeLogicalGroup === "footer") {
      newHeaderText = "Navigation";
    }
    setHeaderText(newHeaderText);
  }, [activeLogicalGroup]); // Remove activeSectionId dependency

  useEffect(() => {
    const scrollElement = mainRef.current;
    if (!scrollElement || showIntro) return;

    const observerOptions = {
      root: scrollElement,
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

  // Effect to control the fake scrollbar
  useEffect(() => {
    const mainElement = mainRef.current;
    const trackElement = scrollbarTrackRef.current;
    const thumbElement = scrollbarThumbRef.current;

    let hideTimeoutRef: NodeJS.Timeout | null = null;
    let initialShowTimeoutRef: NodeJS.Timeout | null = null;
    let animationFrameId: number | null = null;
    let scrollEndTimeoutRef: NodeJS.Timeout | null = null;

    // Define helper functions at the beginning of the useEffect
    const hideScrollbar = () => {
      if (trackElement) {
        trackElement.style.opacity = "0";
        trackElement.style.pointerEvents = "none";
      }
    };

    const showScrollbar = () => {
      if (trackElement) {
        trackElement.style.opacity = "1";
        trackElement.style.pointerEvents = "auto";
      }
      if (hideTimeoutRef) {
        clearTimeout(hideTimeoutRef);
      }
      hideTimeoutRef = setTimeout(hideScrollbar, 1500);
    };

    const handleScrollEnd = () => {
      if (!mainElement || !thumbElement) return;
      if (mainElement.scrollTop <= 0.1) {
        thumbElement.style.top = "0px";
      }
    };

    const handleScroll = () => {
      if (!mainElement || !trackElement || !thumbElement) return;

      showScrollbar();

      if (scrollEndTimeoutRef) {
        clearTimeout(scrollEndTimeoutRef);
      }
      scrollEndTimeoutRef = setTimeout(handleScrollEnd, 150);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (!mainElement || !trackElement || !thumbElement) return;

        const { scrollTop, scrollHeight, clientHeight } = mainElement;
        const trackHeight = parseFloat(
          window.getComputedStyle(trackElement).height
        );
        const thumbHeight = parseFloat(
          window.getComputedStyle(thumbElement).height
        );
        const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
        const totalScrollableDist = Math.max(0, scrollHeight - clientHeight);

        let calculatedThumbTop = 0;

        if (totalScrollableDist > 0) {
          const scrollRatio = Math.max(
            0,
            Math.min(1, scrollTop / totalScrollableDist)
          );
          calculatedThumbTop = scrollRatio * maxThumbTop;
        } else {
          calculatedThumbTop = 0;
        }

        const thumbTop = Math.min(Math.max(0, calculatedThumbTop), maxThumbTop);
        thumbElement.style.top = `${thumbTop}px`;
      });
    };

    // Original logic continues here, after function definitions
    if (!mainElement || !trackElement || !thumbElement) {
      hideScrollbar();
      return;
    }

    if (showIntro) {
      hideScrollbar();
      if (initialShowTimeoutRef) clearTimeout(initialShowTimeoutRef);
    } else {
      if (
        initialShowTimeoutRef === null &&
        trackElement.style.opacity === "0"
      ) {
        requestAnimationFrame(() => {
          let scrolledSuccessfully = false;
          const targetSectionIdFromPath = pathname
            ? pathToSectionId[pathname]
            : undefined;

          // 1. Try scrolling based on pathname
          if (targetSectionIdFromPath) {
            const targetElement = document.getElementById(
              targetSectionIdFromPath
            );
            if (targetElement) {
              if (mainElement) {
                const headerHeight =
                  parseFloat(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--header-height"
                    )
                  ) || 0;
                const elementRect = targetElement.getBoundingClientRect();
                const elementTopRelativeToMain =
                  elementRect.top - mainElement.getBoundingClientRect().top;
                const scrollTopPosition =
                  mainElement.scrollTop +
                  elementTopRelativeToMain -
                  headerHeight;
                mainElement.scrollTo({
                  top: scrollTopPosition,
                  behavior: "auto",
                });
              } else {
                targetElement.scrollIntoView({
                  behavior: "auto",
                  block: "start",
                });
              }
              scrolledSuccessfully = true;
            } else {
              console.warn(
                `Home: Could not find element with id='${targetSectionIdFromPath}' from pathname '${pathname}'.`
              );
            }
          }

          // 2. If not scrolled by pathname, try scrolling based on hash (existing logic)
          if (
            !scrolledSuccessfully &&
            typeof window !== "undefined" &&
            window.location.hash
          ) {
            const hashId = window.location.hash.substring(1);
            const targetElement = document.getElementById(hashId);
            if (targetElement) {
              if (mainElement) {
                const headerHeight =
                  parseFloat(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--header-height"
                    )
                  ) || 0;
                const elementRect = targetElement.getBoundingClientRect();
                const elementTopRelativeToMain =
                  elementRect.top - mainElement.getBoundingClientRect().top;
                const scrollTopPosition =
                  mainElement.scrollTop +
                  elementTopRelativeToMain -
                  headerHeight;
                mainElement.scrollTo({
                  top: scrollTopPosition,
                  behavior: "auto",
                });
              } else {
                targetElement.scrollIntoView({
                  behavior: "auto",
                  block: "start",
                });
              }
              scrolledSuccessfully = true;
            } else {
              console.warn(
                `Home: Could not find element with id='${hashId}' from URL hash.`
              );
            }
          }

          // 3. If still not scrolled, scroll to home (fallback)
          if (!scrolledSuccessfully) {
            const firstSection = document.getElementById("home");
            if (firstSection) {
              if (mainElement) {
                mainElement.scrollTo({ top: 0, behavior: "auto" });
              } else {
                firstSection.scrollIntoView({
                  behavior: "auto",
                  block: "start",
                });
              }
            } else {
              console.warn(
                "Home: Could not find element with id='home' to scroll to."
              );
              if (mainElement) mainElement.scrollTop = 0;
            }
          }

          initialShowTimeoutRef = setTimeout(() => {
            showScrollbar();
            handleScroll();
            initialShowTimeoutRef = null;
          }, 50);
        });
      } else if (trackElement.style.opacity === "0") {
        showScrollbar();
        handleScroll();
      }
    }

    const handleTrackMouseEnter = () => {
      if (hideTimeoutRef) clearTimeout(hideTimeoutRef);
      showScrollbar();
    };
    const handleTrackMouseLeave = () => {
      if (hideTimeoutRef) clearTimeout(hideTimeoutRef);
      hideTimeoutRef = setTimeout(hideScrollbar, 500);
    };

    mainElement.addEventListener("scroll", handleScroll, { passive: true });
    trackElement.addEventListener("mouseenter", handleTrackMouseEnter);
    trackElement.addEventListener("mouseleave", handleTrackMouseLeave);
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(mainElement);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (hideTimeoutRef) clearTimeout(hideTimeoutRef);
      if (initialShowTimeoutRef) clearTimeout(initialShowTimeoutRef);
      if (scrollEndTimeoutRef) clearTimeout(scrollEndTimeoutRef);
      mainElement.removeEventListener("scroll", handleScroll);
      trackElement?.removeEventListener("mouseenter", handleTrackMouseEnter);
      trackElement?.removeEventListener("mouseleave", handleTrackMouseLeave);
      resizeObserver.disconnect();
    };
  }, [showIntro, mainRef, scrollbarTrackRef, scrollbarThumbRef, pathname]);

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

        {/* 3. Konzerte Section */}
        <section id="konzerte">
          <Concerts />
        </section>

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
          imageUrl="/alexBg.webp"
          scrollContainerRef={mainRef}
          description={bioDescriptions.alex}
        >
          <></>
        </BioTile>
        <BioTile
          id="luca"
          imageUrl="/lucaBg.webp"
          scrollContainerRef={mainRef}
          description={bioDescriptions.luca}
        >
          <></>
        </BioTile>
        <BioTile
          id="lenny"
          imageUrl="/lennyBg.webp"
          scrollContainerRef={mainRef}
          description={bioDescriptions.lenny}
        >
          <></>
        </BioTile>
        <BioTile
          id="max"
          imageUrl="/maxBg.webp"
          scrollContainerRef={mainRef}
          description={bioDescriptions.max}
        >
          <></>
        </BioTile>
        <BioTile
          id="laurin"
          imageUrl="/laurinBg.webp"
          scrollContainerRef={mainRef}
          description={bioDescriptions.laurin}
        >
          <></>
        </BioTile>

        {/* 4. Footer Section (Sitemap) */}
        <section id="footer-section">
          <Footer />
        </section>

        {/* === NEW ORDER END === */}
      </main>
    </div>
  );
}
