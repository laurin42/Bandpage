"use client";

import React from "react";
import "@/styles/concerts.scss";
import NewsletterForm from "@/components/NewsletterForm";

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

  return (
    <div className="concerts-content-wrapper">
      <div className="newsletter-signup-container">
        <h4 className="newsletter-prompt-bigger">Verpasse keinen Gig!</h4>{" "}
        <p className="newsletter-prompt">
          Abonniere unseren Newsletter und wir informieren dich, sobald neue
          Termine feststehen oder wir neue Aufnahmen veröffentlichen.
        </p>
        <p className="concert-info-text">
          Aktuell konzentrieren wir uns auf neue Aufnahmen und haben zur Zeit
          keine Auftritte geplant.
        </p>
        <NewsletterForm onSignup={handleNewsletterSignup} />
      </div>
    </div>
  );
};

export default Concerts;
