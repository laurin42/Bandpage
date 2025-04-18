"use client"; // Make it a client component for useState and onClick

import React, { useState } from "react";
import Link from "next/link"; // Use Next.js Link for navigation
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
} from "lucide-react"; // Import icons and needed icons
import "@/styles/header.css"; // Import header styles

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isKontaktSubMenuOpen, setIsKontaktSubMenuOpen] = useState(false);

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
          <Link href="/" className="brand-name">
            Burnheart Mockery
          </Link>

          <button
            onClick={toggleMenu}
            className="menu-button"
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
                <Link href="#home" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Home size={18} className="menu-icon" />
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#musik" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Music size={18} className="menu-icon" />
                    Musik
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#ueber-uns" onClick={toggleMenu}>
                  <span className="menu-item-content">
                    <Users size={18} className="menu-icon" />
                    Über uns
                  </span>
                </Link>
              </li>{" "}
              {/* Assuming #bio is the target */}
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                >
                  <span className="menu-item-content">
                    <Share2 size={18} className="menu-icon" />
                    Social Media
                  </span>
                </a>
              </li>
              <li>
                <Link href="#konzerte" onClick={toggleMenu}>
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
                    <li>
                      <Link href="/impressum" onClick={toggleMenu}>
                        <span className="menu-item-content">
                          <Dot size={10} className="menu-icon" />
                          Impressum
                        </span>
                      </Link>
                    </li>
                  </ul>
                )}
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
