"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  Menu,
  X,
  Home,
  Music,
  Users,
  Share2,
  Calendar,
  Mail,
  Dot,
  Info,
} from "lucide-react";
import "@/styles/header.scss";

interface HeaderProps {
  headerText: string;
  introComplete: boolean;
}

const animationDuration = 300;

const Header: React.FC<HeaderProps> = ({ headerText, introComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKontaktSubMenuOpen, setIsKontaktSubMenuOpen] = useState(false);

  const [displayedText, setDisplayedText] = useState(headerText);
  const [animationClass, setAnimationClass] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (headerText !== displayedText) {
      setAnimationClass("slide-out");

      timeoutRef.current = setTimeout(() => {
        setDisplayedText(headerText);
        setAnimationClass("slide-in");

        timeoutRef.current = setTimeout(() => {
          setAnimationClass("");
        }, animationDuration);
      }, animationDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [headerText, displayedText]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsKontaktSubMenuOpen(false);
  };

  const handleScrollTo = (targetIdMobile: string, targetIdDesktop: string) => {
    toggleMenu(); // Close the menu

    // Check if we are likely in desktop view based on screen width
    const isDesktop = window.innerWidth >= 1024; // Assuming 'lg' breakpoint is 1024px

    const targetId = isDesktop ? targetIdDesktop : targetIdMobile;
    const element = document.getElementById(targetId);

    if (element) {
      // Use smooth scrolling
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback or error handling if element not found
      console.warn(`Element with ID ${targetId} not found.`);
      // Optionally, try the other ID as a fallback
      const fallbackId = isDesktop ? targetIdMobile : targetIdDesktop;
      const fallbackElement = document.getElementById(fallbackId);
      fallbackElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleKontaktSubMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsKontaktSubMenuOpen(!isKontaktSubMenuOpen);
  };

  return (
    <>
      <header>
        <div className="header-content">
          <div
            className={clsx(
              "brand-name-wrapper",
              introComplete && "element-visible"
            )}
          >
            <span className={clsx("brand-name", animationClass)}>
              {displayedText}
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className={clsx("menu-button", introComplete && "element-visible")}
            aria-label="Toggle menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <>
          <nav className={`mobile-menu open`}>
            <button
              onClick={toggleMenu}
              className="close-button"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <ul>
              <li>
                <Link href="/#home" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Home size={18} className="menu-icon" />
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#music" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Music size={18} className="menu-icon" />
                    Musik
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#social" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Share2 size={18} className="menu-icon" />
                    Social Media
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleScrollTo("alex", "ueber-uns-desktop")}
                  className="menu-link-button"
                >
                  <span className="menu-item-content">
                    <Users size={18} className="menu-icon" />
                    Über uns
                  </span>
                </button>
              </li>
              <li>
                <Link href="/#konzerte" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Calendar size={18} className="menu-icon" />
                    Konzerte
                  </span>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <button
                  onClick={toggleKontaktSubMenu}
                  className="menu-parent-button"
                >
                  <span className="menu-item-content">
                    <Mail size={18} className="menu-icon" />
                    Kontakt und Infos
                  </span>
                </button>
                {isKontaktSubMenuOpen && (
                  <ul className="sub-menu">
                    <li>
                      <Link href="/booking" onClick={toggleMenu}>
                        <span className="menu-item-content">
                          <Dot size={10} className="menu-icon" />
                          Bookinganfragen
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/epk" onClick={toggleMenu}>
                        <span className="menu-item-content">
                          <Dot size={10} className="menu-icon" />
                          Electronic Press Kit
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link href="/impressum" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Info size={18} className="menu-icon" />
                    Impressum
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="menu-backdrop" onClick={toggleMenu}></div>
        </>
      )}
    </>
  );
};

export default Header;
