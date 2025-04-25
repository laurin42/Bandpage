"use client"; // Still needed if any client-side interaction remains, otherwise can remove

import React from "react"; // Removed useRef, useState, useEffect
import Link from "next/link";
import {
  Home,
  Music,
  Users,
  Share2,
  CalendarDays,
  FileText,
  BookUser,
  Info,
} from "lucide-react"; // Import icons
import "@/styles/footer.css"; // Styles for the footer

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <h3>Sitemap</h3>

      {/* Sitemap Tree with Icons */}
      <div className="sitemap-tree">
        <div className="sitemap-node level-0">
          <Home size={16} className="sitemap-icon" />
          <Link href="/#home">Startseite</Link>
        </div>
        <div className="sitemap-node level-1">
          <Music size={16} className="sitemap-icon" />
          <Link href="/#music">Musik</Link>
        </div>
        <div className="sitemap-node level-1">
          <Users size={16} className="sitemap-icon" />
          <Link href="/#alex">Über uns</Link>
        </div>
        <div className="sitemap-node level-1">
          <Share2 size={16} className="sitemap-icon" />
          <Link href="/#social">Social Media</Link>
        </div>
        <div className="sitemap-node level-1">
          <CalendarDays size={16} className="sitemap-icon" />
          <Link href="/#konzerte">Konzerte</Link>
        </div>

        {/* Links zu externen/separaten Seiten */}
        <div className="sitemap-node level-0 separator">
          {/* Optionaler Platzhalter oder Titel für separate Links */}
        </div>
        <div className="sitemap-node level-1">
          <FileText size={16} className="sitemap-icon" />
          <Link href="/epk">EPK</Link>
        </div>
        <div className="sitemap-node level-1">
          <BookUser size={16} className="sitemap-icon" />
          <Link href="/booking">Booking</Link>
        </div>
        <div className="sitemap-node level-1">
          <Info size={16} className="sitemap-icon" />
          <Link href="/impressum">Impressum</Link>
        </div>
      </div>

      <p className="copyright">
        &copy; {currentYear} Burnheart Mockery. Alle Rechte vorbehalten.
      </p>
    </footer>
  );
};

export default Footer;
