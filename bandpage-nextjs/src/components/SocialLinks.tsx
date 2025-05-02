import React, { useState, useEffect, useRef } from "react";
import CuriousIcon from "@/assets/icons/curious.svg";
import FingerScrollIcon from "@/assets/icons/finger-scroll.svg";
import {
  FaTiktok,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaAmazon,
  FaApple,
} from "react-icons/fa";

interface SocialLink {
  platform: string;
  url: string;
  Icon: React.ElementType;
}

const socialLinksData: SocialLink[] = [
  {
    platform: "TikTok",
    url: "https://tiktok.com/@burnheart.mockery",
    Icon: FaTiktok,
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/burnheart.mockery",
    Icon: FaInstagram,
  },
  {
    platform: "Spotify",
    url: "https://open.spotify.com/intl-de/artist/31X9W5Pdf6ajRZOZaUD6RJ",
    Icon: FaSpotify,
  },
  {
    platform: "YouTube Music",
    url: "https://www.youtube.com/channel/UCSIHktug-Pryjjs9wtSrZmg",
    Icon: FaYoutube,
  },
  {
    platform: "Amazon Music",
    url: "https://music.amazon.de/artists/B0BKVPFYYZ/burnheart-mockery",
    Icon: FaAmazon,
  },
  {
    platform: "Apple Music",
    url: "https://music.apple.com/de/artist/burnheart-mockery/1658880000",
    Icon: FaApple,
  },
];

const SocialLinks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`social-links-container ${isVisible ? "visible" : ""}`}
    >
      <CuriousIcon className="cta-curious-svg animate-item-1" />
      <div className="social-links-group">
        {socialLinksData.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item animate-link-item"
          >
            <link.Icon className="social-link-icon" />
            <span>{link.platform}</span>
          </a>
        ))}
      </div>

      {/* Removed the horizontal rule */}
      {/* <hr className="cta-separator" /> */}

      {/* New SVG Scroll CTA - Icon on the right */}
      <div className="cta-scroll-svg animate-item-3">
        {/* Text first */}
        <span>...oder scroll weiter</span>
        {/* Icon second */}
        <FingerScrollIcon className="cta-arrow-down-svg" />
      </div>
    </div>
  );
};

export default SocialLinks;
