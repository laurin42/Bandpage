"use client"; // Still needed if any client-side interaction remains, otherwise can remove

import React from "react"; // Removed useRef, useState, useEffect
import Link from "next/link";
import "@/styles/footer.css"; // Styles for the footer

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <nav className="footer-nav">
          <h3>Sitemap</h3>
          <ul>
            <li>
              <Link href="/#home">Home</Link>
            </li>
            <li>
              <Link href="/#music">Musik</Link>
            </li>
            <li>
              <Link href="/#alex">Über uns</Link>{" "}
              {/* Link zum ersten BioTile */}
            </li>
            <li>
              <Link href="/#social">Social Media</Link>
            </li>
            <li>
              <Link href="/#konzerte">Konzerte</Link>
            </li>
            <li>
              <Link href="/epk">EPK</Link>
            </li>
            <li>
              <Link href="/booking">Booking</Link>
            </li>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-info">
          {/* Optional: Logo oder anderer Inhalt hier */}
          <p className="copyright">
            &copy; {currentYear} Burnheart Mockery. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
