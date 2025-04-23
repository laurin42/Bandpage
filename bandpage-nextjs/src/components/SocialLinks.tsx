import React from "react";
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
    </div>
  );
};

export default SocialLinks;
