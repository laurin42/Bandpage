"use client";

import React, { useState, useEffect, useRef, RefObject } from "react";
import clsx from "clsx";
import "@/styles/layout.css";

interface BioTileProps {
  id: string;
  imageUrl: string;
  children: React.ReactNode;
  scrollContainerRef: RefObject<HTMLElement | null>;
  description: string;
}

const BioTile: React.FC<BioTileProps> = ({
  id,
  imageUrl,
  children,
  scrollContainerRef,
  description,
}) => {
  console.log("[BioTile RENDER] Rendering component with id:", id);
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    console.log("[BioTile EFFECT] Initializing useEffect for id:", id);
    const scrollElement = scrollContainerRef.current;

    // Get header height once
    let headerHeight = 0;
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
          headerHeight = parseFloat(headerHeightValue) * (baseFontSize || 16); // Use detected or default base font size
        } else if (headerHeightValue.endsWith("px")) {
          headerHeight = parseFloat(headerHeightValue);
        } else if (headerHeightValue) {
          console.warn(
            `[BioTile ${id}] Unknown unit for --header-height: ${headerHeightValue}. Using 0.`
          );
        }
      } catch (error) {
        console.error(`[BioTile ${id}] Error reading --header-height:`, error);
      }
    }
    console.log(`[BioTile ${id}] Using Header Height: ${headerHeight}px`);

    if (!scrollElement) {
      console.error(`[BioTile ${id}] Scroll container element not found.`);
      return;
    }

    console.log(`[BioTile ${id}] Attaching scroll listener to:`, scrollElement);

    const handleScroll = () => {
      console.log(
        "[BioTile SCROLL] Scroll event detected for id:",
        id,
        "on element:",
        scrollElement
      );
      const section = document.getElementById(id);
      console.log(`[BioTile ${id}] Found section:`, section);
      if (scrollElement && section) {
        // Check scrollElement again just in case
        const containerRect = scrollElement.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();

        const sectionTopRelativeToContainer =
          sectionRect.top - containerRect.top;
        const sectionBottomRelativeToContainer =
          sectionRect.bottom - containerRect.top;
        const containerVisibleHeight = scrollElement.clientHeight;

        // Visibility check considering header height
        const isNowVisible =
          sectionBottomRelativeToContainer > headerHeight && // Bottom edge must be below header
          sectionTopRelativeToContainer < containerVisibleHeight; // Top edge must be above container bottom

        console.log(
          `[BioTile ${id}] SectionTopRel: ${sectionTopRelativeToContainer.toFixed(
            2
          )}, SectionBottomRel: ${sectionBottomRelativeToContainer.toFixed(
            2
          )}, ContainerHeight: ${containerVisibleHeight}, HeaderHeight: ${headerHeight}, IsVisible: ${isNowVisible}`
        );

        // State update logic based on isNowVisible
        if (isNowVisible && !isVisibleRef.current) {
          isVisibleRef.current = true;
          console.log(`[BioTile ${id}] Became visible. Starting timer...`);
          if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current); // Clear just in case
          timeoutIdRef.current = setTimeout(() => {
            // Double-check visibility RIGHT BEFORE showing the overlay
            const currentSection = document.getElementById(id);
            const currentScrollElement = scrollContainerRef.current; // Re-access ref
            let stillVisible = false;
            if (currentSection && currentScrollElement) {
              const currentContainerRect =
                currentScrollElement.getBoundingClientRect();
              const currentSectionRect = currentSection.getBoundingClientRect();
              const currentTopRel =
                currentSectionRect.top - currentContainerRect.top;
              const currentBottomRel =
                currentSectionRect.bottom - currentContainerRect.top;
              const currentContainerHeight = currentScrollElement.clientHeight;
              // Use the same visibility logic including headerHeight
              stillVisible =
                currentBottomRel > headerHeight &&
                currentTopRel < currentContainerHeight;
            }

            if (stillVisible) {
              console.log(
                `[BioTile ${id}] Timer finished, tile STILL visible. Setting overlay TRUE.`
              );
              setShowOverlay(true);
            } else {
              console.log(
                `[BioTile ${id}] Timer finished, but tile NO LONGER visible. NOT setting overlay TRUE.`
              );
              // Optional: Ensure state is false if somehow became true
              setShowOverlay(false);
            }
            timeoutIdRef.current = null; // Clear ref after execution
          }, 1000);
        } else if (!isNowVisible && isVisibleRef.current) {
          isVisibleRef.current = false;
          console.log(`[BioTile ${id}] Became hidden.`);
          if (timeoutIdRef.current) {
            console.log(`[BioTile ${id}] Clearing pending timer.`);
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
          }
          console.log(`[BioTile ${id}] Setting overlay state to FALSE.`);
          setShowOverlay(false);
        }
      }
    };

    requestAnimationFrame(handleScroll);

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      console.log(
        `[BioTile ${id}] Cleaning up listener for element:`,
        scrollElement
      );
      scrollElement.removeEventListener("scroll", handleScroll);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [id, scrollContainerRef]);

  console.log(`[BioTile ${id}] State showOverlay:`, showOverlay);

  return (
    <section id={id} style={{ backgroundImage: `url(${imageUrl})` }}>
      {children}
      <div className={clsx("overlay-base", showOverlay && "overlay-visible")}>
        <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </h2>
        <p style={{ margin: 0 }}>{description}</p>
      </div>
    </section>
  );
};

export default BioTile;
