"use client";

import React from "react";
import Link from "next/link";
import "@/styles/newsletter-feedback.scss"; // Import the new styles

const NewsletterConfirmedPage = () => {
  return (
    <div className="newsletter-feedback-container">
      <h1>Bestätigung erfolgreich!</h1>
      <p>Vielen Dank! Deine E-Mail-Adresse wurde erfolgreich bestätigt.</p>
      <p>
        Du bist jetzt für unseren Newsletter angemeldet und bleibst immer auf
        dem Laufenden über neue Songs, Konzerte und exklusive Einblicke hinter
        die Kulissen.
      </p>
      <div className="links-section">
        <Link href="/">Zurück zur Startseite</Link>
      </div>
    </div>
  );
};

export default NewsletterConfirmedPage;
