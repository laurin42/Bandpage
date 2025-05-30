"use client";

import React from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import "@/styles/epk.scss";
import { Download, Mail } from "lucide-react";
import { FaTiktok, FaSpotify, FaInstagram } from "react-icons/fa";

const bandInfo = {
  name: "Burnheart Mockery",
  bio: "In den vernebelten Höhlen einer vergessenen Hippie-Kommune formte sich das Schicksal von Burnheart Mockery. Axl, der Gorilla unter den Sängern und spiritueller Bandleader, fand hier seine musikalischen Brüder: Luca, der kreative Geist, taucht in den Wirbelwind der Sologitarre ein, während Max, das Uhrwerk der Melodie, mit seinen Rhythmusgitarrenklängen die Seelen berührt. Lenny, Meister der Schießbude und Taktgeber, lenkt die Truppe durch lange Nächte, während Laurin - für die tiefen Frequenzen zuständig - kosmische Basslines durch die Galaxien schickt.",
  contact: {
    email: "kontakt@burnheart-mockery.de",
  },
  socialMedia: [
    {
      platform: "TikTok",
      url: "https://www.tiktok.com/@burnheart.mockery",
      Icon: FaTiktok,
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/burnheart.mockery/",
      Icon: FaInstagram,
    },
    {
      platform: "Spotify",
      url: "https://open.spotify.com/intl-de/artist/31X9W5Pdf6ajRZOZaUD6RJ",
      Icon: FaSpotify,
    },
  ],
  photos: [
    { url: "/epk/bandfoto1.webp", alt: "Burnheart Mockery EPK Photo 1" },

    { url: "/epk/bandfotoElevator.webp", alt: "Burnheart Mockery EPK Photo 3" },
    {
      url: "/epk/bandfotoGreenGrass.webp",
      alt: "Burnheart Mockery EPK Photo 3",
    },
    {
      url: "/epk/bandfotoKunstnacht.webp",
      alt: "Burnheart Mockery EPK Photo 3",
    },
    { url: "/epk/bandfotoMystic1.webp", alt: "Burnheart Mockery EPK Photo 3" },
  ],
};

const EPK: React.FC = () => {
  const generatePdf = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    let currentY = margin;
    const usableWidth = pageWidth - 2 * margin;
    const defaultFont = doc.getFont().fontName;

    // --- PDF Content ---

    doc.setFontSize(22);
    doc.setFont(defaultFont, "bold");
    doc.text(bandInfo.name + " - EPK", margin, currentY);
    currentY += 15;
    doc.setFont(defaultFont, "normal");

    doc.setFontSize(14);
    doc.setFont(defaultFont, "bold");
    doc.text("Biografie", margin, currentY);
    currentY += 7;
    doc.setFontSize(10);
    doc.setFont(defaultFont, "normal");
    const bioLines = doc.splitTextToSize(bandInfo.bio, usableWidth);
    doc.text(bioLines, margin, currentY);
    currentY += bioLines.length * 4 + 10;

    if (currentY > pageHeight - margin - 20) {
      doc.addPage();
      currentY = margin;
    }
    doc.setFontSize(14);
    doc.setFont(defaultFont, "bold");
    doc.text("Kontakt", margin, currentY);
    currentY += 7;
    doc.setFontSize(10);
    doc.setFont(defaultFont, "normal");
    if (bandInfo.contact.email) {
      doc.text(`Email: ${bandInfo.contact.email}`, margin, currentY);
      try {
        doc.link(margin, currentY - 3, 50, 5, {
          url: `mailto:${bandInfo.contact.email}`,
        });
      } catch {
        console.warn("Could not create email link in PDF");
      }
      currentY += 6;
    }
    currentY += 4;

    if (bandInfo.socialMedia.length > 0) {
      if (
        currentY >
        pageHeight - margin - (bandInfo.socialMedia.length * 6 + 10)
      ) {
        doc.addPage();
        currentY = margin;
      }
      doc.setFontSize(14);
      doc.setFont(defaultFont, "bold");
      doc.text("Social Media", margin, currentY);
      currentY += 7;
      doc.setFontSize(10);
      doc.setFont(defaultFont, "normal");
      bandInfo.socialMedia.forEach((social) => {
        doc.text(`${social.platform}: ${social.url}`, margin, currentY);
        try {
          doc.link(margin, currentY - 3, usableWidth, 5, { url: social.url });
        } catch {
          console.warn("Could not create social link in PDF");
        }
        currentY += 6;
      });
      currentY += 4;
    }

    doc.save(`${bandInfo.name.replace(/\s+/g, "_")}_EPK.pdf`);
  };

  return (
    <section className="epk-section-wrapper">
      <div className="epk-container">
        <div className="epk-header">
          <h1>Electronic Press Kit</h1>
          <button onClick={generatePdf} className="download-button">
            <Download size={18} /> EPK als PDF herunterladen
          </button>
        </div>

        <section className="epk-section bio-section">
          <h2>Biografie</h2>
          <p>{bandInfo.bio}</p>
        </section>

        <section className="epk-section photos-section">
          <h2>Bandfotos</h2>
          <div className="photo-gallery">
            {bandInfo.photos.map((photo, index) => (
              <div key={index} className="photo-item">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="epk-section contact-section">
          <h2>Kontakt & Social Media</h2>
          <div className="contact-details">
            {bandInfo.contact.email && (
              <p>
                <Mail size={16} />{" "}
                <a href={`mailto:${bandInfo.contact.email}`}>
                  {bandInfo.contact.email}
                </a>
              </p>
            )}
          </div>
          <div className="social-links">
            {bandInfo.socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {social.Icon && <social.Icon size={20} />} {social.platform}
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default EPK;
