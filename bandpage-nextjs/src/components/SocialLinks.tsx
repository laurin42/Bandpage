import React from "react";
import Image from "next/image"; // Ensure Image is imported
import NeugierigIcon from "@/assets/icons/neugierig.svg"; // Import SVG from src/assets as component
import {
  FaTiktok,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaAmazon,
} from "react-icons/fa"; // Import necessary icons

// Define the structure for a social link
interface SocialLink {
  platform: string;
  url: string;
  Icon: React.ElementType; // Type for React component (icon)
}

// Placeholder data - REPLACE URLS LATER!
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
];

const SocialLinks = () => {
  return (
    <div className="social-links-container">
      {/* Removed H3 heading */}
      {/* <h1 className="cta-subheading">Neugierig geworden?</h1> */}

      {/* Removed old SVG Call to Action */}
      {/* <div className="cta-svg-link">
        <span>Sieh dir hier mehr an</span>
        <Image
          src="/icons/redo.svg"
          alt="Mehr ansehen Pfeil"
          className="cta-redo-svg"
          width={32}
          height={32}
        />
      </div> */}

      {/* Render SVG component inline */}
      <NeugierigIcon className="cta-neugierig-svg" />

      {socialLinksData.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-item"
        >
          <link.Icon className="social-link-icon" />
          <span>{link.platform}</span>
        </a>
      ))}

      {/* Removed the horizontal rule */}
      {/* <hr className="cta-separator" /> */}

      {/* New SVG Scroll CTA - Ensure Image is used here too */}
      <div className="cta-scroll-svg">
        <span>...oder hier</span>
        <Image // Ensure Image is used here
          src="/icons/arrow-down.svg" // Using arrow-down.svg
          alt="Nach unten scrollen"
          className="cta-arrow-down-svg"
          width={32} // Adjust size as needed
          height={32}
        />
      </div>
    </div>
  );
};

export default SocialLinks;
