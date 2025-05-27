"use client";

import React from "react";
import "@/styles/concerts.scss";
import NewsletterForm from "@/components/NewsletterForm";
import Image from "next/image";

const Concerts = () => {
  const handleNewsletterSignup = async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message:
            result.message ||
            "Anmeldung fehlgeschlagen. Bitte versuche es später erneut.",
        };
      }

      return {
        success: true,
        message:
          result.message || "Anmeldung erfolgreich! Bitte prüfe dein Postfach.",
      };
    } catch (error) {
      console.error("Newsletter signup fetch error:", error);
      return {
        success: false,
        message:
          "Netzwerkfehler. Bitte prüfe deine Verbindung und versuche es erneut.",
      };
    }
  };

  const upcomingConcerts = [
    {
      id: 1,
      title: "05.12.25 | Blue Shell | Köln",
      location: "Luxemburger Straße 32, 50674 Köln",
      imageUrl: "/concertCommercials/BlueShell05.12.25.webp",
      ticketUrl:
        "https://shop.burnheart-mockery.de/products/burnheart-mockery-live-in-koln",
      isBookingMask: false,
    },
    {
      id: 420,
      title: "» Bucht uns für euer Event!",
      location: "Deutschlandweit & angrenzendes Ausland",
      imageUrl: "/concertCommercials/bookingRequest.webp",
      ticketUrl: "/booking",
      isBookingMask: true,
    },
  ];

  return (
    <div className="concerts-page-wrapper">
      <div className="concerts-content-wrapper">
        <div className="concerts-list">
          {upcomingConcerts.length > 0 ? (
            upcomingConcerts.map((concert, index) => (
              <div key={concert.id || index} className="concert-card">
                <div className="concert-image-wrapper">
                  <Image
                    className="concert-image"
                    src={concert.imageUrl}
                    alt={concert.title}
                    width={64}
                    height={128}
                    layout="responsive"
                  />
                </div>
                <h3 className="concert-title">{concert.title}</h3>
                <p className="concert-location">{concert.location}</p>
                {concert.ticketUrl ? (
                  <a
                    href={concert.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ticket-button concert-ticket-action"
                  >
                    {concert.isBookingMask
                      ? "Jetzt anfragen"
                      : "Tickets sichern"}
                  </a>
                ) : (
                  <span className="ticket-unavailable concert-ticket-action">
                    Keine Tickets verfügbar
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="no-concerts-message">
              Aktuell keine Konzerte geplant.
            </p>
          )}
        </div>
        <div className="newsletter-signup-container">
          <p className="newsletter-prompt">
            Abonniere unseren Newsletter und wir informieren dich bei neuen
            Terminen & Releases!
          </p>
          <NewsletterForm onSignup={handleNewsletterSignup} />
        </div>
      </div>
    </div>
  );
};

export default Concerts;
