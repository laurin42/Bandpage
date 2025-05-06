"use client";

import React from "react";
import Link from "next/link";
import "@/styles/newsletter-feedback.scss"; // Import the new styles

const NewsletterUnsubscribedPage = () => {
  return (
    <div className="newsletter-feedback-container">
      <h1>Erfolgreich abgemeldet</h1>
      <p>Du wurdest erfolgreich von unserem Newsletter abgemeldet.</p>
      <p>
        Schade, dass du gehst! Falls du es dir anders überlegst, kannst du dich
        jederzeit wieder über unsere Webseite anmelden.
      </p>
      {/* Optional: Link zur Haupt-Anmeldeseite, falls es eine spezifische gibt, sonst z.B. /konzerte */}
      {/* <Link href="/konzerte">Zur Newsletter-Anmeldung</Link> */}
      <div className="links-section">
        <Link href="/">Zurück zur Startseite</Link>
      </div>
    </div>
  );
};

export default NewsletterUnsubscribedPage;
