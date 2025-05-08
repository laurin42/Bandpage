import { useEffect, useRef } from "react";

interface UseCustomScrollbarProps {
  mainRef: React.RefObject<HTMLElement | null>;
  scrollbarTrackRef: React.RefObject<HTMLDivElement | null>;
  scrollbarThumbRef: React.RefObject<HTMLDivElement | null>;
  showIntro: boolean;
}

const useCustomScrollbar = ({
  mainRef,
  scrollbarTrackRef,
  scrollbarThumbRef,
  showIntro,
}: UseCustomScrollbarProps): void => {
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialShowTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mainElement = mainRef.current;
    const trackElement = scrollbarTrackRef.current;
    const thumbElement = scrollbarThumbRef.current;

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
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(hideScrollbar, 1500);
    };

    const handleScrollEnd = () => {
      if (!mainElement || !thumbElement) return;
      if (mainElement.scrollTop <= 0.1) {
        // Adjusted to a small threshold to account for precision issues
        thumbElement.style.top = "0px";
      }
    };

    const handleScroll = () => {
      if (!mainElement || !trackElement || !thumbElement) return;

      showScrollbar();

      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
      }
      scrollEndTimeoutRef.current = setTimeout(handleScrollEnd, 150);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
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

    if (!mainElement || !trackElement || !thumbElement) {
      hideScrollbar();
      return;
    }

    if (showIntro) {
      hideScrollbar();
      if (initialShowTimeoutRef.current)
        clearTimeout(initialShowTimeoutRef.current);
    } else {
      // Simplified logic for initial show, assuming opacity is the primary control
      if (trackElement.style.opacity === "0") { // Check current style before showing
        requestAnimationFrame(() => {
          // A small delay or waiting for a condition might be needed if elements are not ready
          // For now, directly attempt to show and handle scroll
          showScrollbar();
          handleScroll(); // Initial position calculation
        });
      }
       // Setup initial scrollbar show with a delay
      if (initialShowTimeoutRef.current) clearTimeout(initialShowTimeoutRef.current);
      initialShowTimeoutRef.current = setTimeout(() => {
        showScrollbar();
        handleScroll(); // Initial position calculation
      }, 500); // Delay to ensure layout is stable
    }

    mainElement.addEventListener("scroll", handleScroll);
    // Consider adding resize listener if track/thumb dimensions can change
    // window.addEventListener("resize", handleScroll); 

    return () => {
      mainElement.removeEventListener("scroll", handleScroll);
      // window.removeEventListener("resize", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (initialShowTimeoutRef.current) clearTimeout(initialShowTimeoutRef.current);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    };
  }, [showIntro, mainRef, scrollbarTrackRef, scrollbarThumbRef]); // Add refs to dependencies
};

export default useCustomScrollbar; 