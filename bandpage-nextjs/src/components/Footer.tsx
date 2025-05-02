"use client";

import React from "react";
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
} from "lucide-react";
import UserLock from "@/assets/icons/userLock.svg";
import "@/styles/footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer-inner">
        <div className="footer-content-main">
          <h3></h3>
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
              <Share2 size={16} className="sitemap-icon" />
              <Link href="/#social">Social Media</Link>
            </div>
            <div className="sitemap-node level-1">
              <Users size={16} className="sitemap-icon" />
              <Link href="/#alex">Über uns</Link>
            </div>
            <div className="sitemap-node level-1">
              <CalendarDays size={16} className="sitemap-icon" />
              <Link href="/#konzerte">Konzerte</Link>
            </div>

            <div className="sitemap-node level-0 separator"></div>
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
            <div className="sitemap-node level-1">
              <UserLock size={16} className="sitemap-icon" />
              <Link href="/privacyPolicy">Datenschutz</Link>
            </div>
          </div>
        </div>

        <p className="copyright">
          &copy; {currentYear} Burnheart Mockery. Alle Rechte vorbehalten.
        </p>
      </div>
    </>
  );
};

export default Footer;
