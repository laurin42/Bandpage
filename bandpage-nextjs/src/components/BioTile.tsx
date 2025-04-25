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
  const [showOverlay, setShowOverlay] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        if (!timeoutIdRef.current) {
          timeoutIdRef.current = setTimeout(() => {
            setShowOverlay(true);
            timeoutIdRef.current = null;
          }, 500);
        }
      } else {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
        setShowOverlay(false);
      }
    };

    const options: IntersectionObserverInit = {
      root: scrollContainerRef.current,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    };

    let headerHeightPx = 0;
    let baseFontSize = 16; // Default base font size
    const bufferRem = 1.25; // Define buffer in rem (e.g., 1.25rem = 20px if base is 16px)
    let bufferPx = bufferRem * baseFontSize; // Default buffer in px

    if (typeof window !== "undefined") {
      try {
        const styles = window.getComputedStyle(document.documentElement);
        baseFontSize = parseFloat(styles.fontSize) || 16; // Get actual base font size
        bufferPx = bufferRem * baseFontSize; // Recalculate buffer in px

        const headerHeightValue = styles
          .getPropertyValue("--header-height")
          ?.trim();
        if (headerHeightValue) {
          if (headerHeightValue.endsWith("rem")) {
            headerHeightPx = parseFloat(headerHeightValue) * baseFontSize;
          } else if (headerHeightValue.endsWith("px")) {
            headerHeightPx = parseFloat(headerHeightValue);
          }
        }
      } catch (e) {
        console.error("Error reading styles or --header-height:", e);
      }
      // Adjust rootMargin using the calculated pixel values
      options.rootMargin = `-${headerHeightPx + bufferPx}px 0px -10% 0px`;
      // console.log(`[BioTile ${id}] Using baseFontSize: ${baseFontSize}px, buffer: ${bufferPx}px, header: ${headerHeightPx}px -> rootMargin: ${options.rootMargin}`);
    }

    const observer = new IntersectionObserver(observerCallback, options);
    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    } else {
      console.error(`[BioTile ${id}] Target element not found for observer.`);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      observer.disconnect();
    };
  }, [id, scrollContainerRef, targetRef]);

  return (
    <section
      ref={targetRef}
      id={id}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
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
