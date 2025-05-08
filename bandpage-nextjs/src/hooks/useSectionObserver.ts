import { useState, useEffect, RefObject } from 'react';

interface UseSectionObserverProps {
  mainRef: RefObject<HTMLElement | null>;
  sectionIds: string[];
  sectionToLogicalGroup: (id: string) => string;
  showIntro: boolean;
}

interface UseSectionObserverReturn {
  activeSectionId: string;
  activeLogicalGroup: string;
  headerText: string;
}

const useSectionObserver = ({
  mainRef,
  sectionIds,
  sectionToLogicalGroup,
  showIntro,
}: UseSectionObserverProps): UseSectionObserverReturn => {
  const [activeSectionId, setActiveSectionId] = useState("home");
  const [activeLogicalGroup, setActiveLogicalGroup] = useState("default");
  const [headerText, setHeaderText] = useState("Burnheart Mockery");

  useEffect(() => {
    const newGroup = sectionToLogicalGroup(activeSectionId);
    setActiveLogicalGroup((prevGroup) =>
      prevGroup !== newGroup ? newGroup : prevGroup
    );
  }, [activeSectionId, sectionToLogicalGroup]);

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
  }, [activeLogicalGroup]);

  useEffect(() => {
    const scrollElement = mainRef.current;
    if (!scrollElement || showIntro) return;

    const observerOptions = {
      root: scrollElement,
      threshold: 0.6, // Consider making this configurable if needed
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
  }, [showIntro, mainRef, sectionIds]); // sectionToLogicalGroup is stable

  return { activeSectionId, activeLogicalGroup, headerText };
};

export default useSectionObserver; 