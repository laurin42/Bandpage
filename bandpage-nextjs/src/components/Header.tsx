"use client"; // Make it a client component for useState and onClick

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"; // Use Next.js Link for navigation
import { clsx } from "clsx"; // Import clsx
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
} from "lucide-react"; // Import icons and needed icons
import "@/styles/header.css"; // Import header styles

// Define props interface
interface HeaderProps {
  headerText: string;
  introComplete: boolean;
}

const animationDuration = 300; // ms, should match CSS animation duration

// Update component signature to accept props
const Header: React.FC<HeaderProps> = ({ headerText, introComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKontaktSubMenuOpen, setIsKontaktSubMenuOpen] = useState(false);

  // State for text animation
  const [displayedText, setDisplayedText] = useState(headerText);
  const [animationClass, setAnimationClass] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for timeouts

  useEffect(() => {
    // Clear any previous timeouts if headerText changes rapidly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (headerText !== displayedText) {
      setAnimationClass("slide-out"); // Start slide-out animation

      timeoutRef.current = setTimeout(() => {
        setDisplayedText(headerText); // Update text after slide-out
        setAnimationClass("slide-in"); // Start slide-in animation

        timeoutRef.current = setTimeout(() => {
          setAnimationClass(""); // Reset animation class after slide-in
        }, animationDuration);
      }, animationDuration);
    }

    // Cleanup timeout on unmount or before next effect run
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [headerText, displayedText]); // Rerun effect if prop changes or internal text updates

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsKontaktSubMenuOpen(false);
  };

  const toggleKontaktSubMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsKontaktSubMenuOpen(!isKontaktSubMenuOpen);
  };

  return (
    <>
      {/* The visible header bar - Applies animation */}
      <header className={`${isMenuOpen ? "header-hidden" : ""}`}>
        <div className="header-content">
          {/* Add wrapper for animation clipping */}
          <div
            className={clsx(
              "brand-name-wrapper",
              introComplete && "element-visible"
            )}
          >
            {/* Replace Link with span for non-interactive display */}
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

      {/* Mobile Menu & Backdrop - Siblings to header, rendered conditionally */}
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
                <Link href="/#alex" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Users size={18} className="menu-icon" />
                    Über uns
                  </span>
                </Link>
              </li>{" "}
              {/* Assuming #bio is the target */}
              <li>
                <Link href="/#social" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Share2 size={18} className="menu-icon" />
                    Social Media
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/#konzerte" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Calendar size={18} className="menu-icon" />
                    Konzerte
                  </span>
                </Link>
              </li>{" "}
              {/* Add concert section later */}
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
              {/* Impressum as top-level item */}
              <li>
                <Link href="/impressum" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Info size={18} className="menu-icon" />
                    Impressum
                  </span>
                </Link>
              </li>
            </ul>

            {/* Remove logo image */}
            {/* <img src="/logo.png" alt="Logo" className="menu-logo" /> */}
          </nav>
          {/* Backdrop - Also rendered conditionally */}
          <div className="menu-backdrop" onClick={toggleMenu}></div>
        </>
      )}
    </>
  );
};

export default Header;
