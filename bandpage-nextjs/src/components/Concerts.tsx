"use client";

import React, { useState, FormEvent } from "react";
import "@/styles/concerts.scss";
import Image from "next/image";

const Concerts = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);

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
        setIsError(true);
        throw new Error(result.error || "Anmeldung fehlgeschlagen.");
      }

      setStatusMessage(
        "Danke für deine Anmeldung! Bitte prüfe dein Postfach, um die Anmeldung zu bestätigen."
      );
      setEmail("");
    } catch (error) {
      setIsError(true);
      const message =
        error instanceof Error
          ? error.message
          : "Ein unbekannter Fehler ist aufgetreten.";
      setStatusMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="concerts-content-wrapper">
      <div className="newsletter-signup-container">
        <div className="concert-info-container">
          <Image
            src="/icons/info.svg"
            alt="Info"
            className="concert-warning-icon"
            width={42}
            height={42}
          />
          <p className="concert-info-text">
            Aktuell konzentrieren wir uns auf neue Aufnahmen und haben zur Zeit
            keine Auftritte geplant.
          </p>
        </div>
        <p className="newsletter-prompt">
          <span className="newsletter-prompt-bigger">
            Verpasse keinen Gig mehr!
          </span>{" "}
          Abonniere unseren Newsletter und wir informieren dich, sobald neue
          Termine feststehen oder wir neue Aufnahmen veröffentlichen.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Deine E-Mail Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="newsletter-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="newsletter-button"
            disabled={isLoading}
          >
            {isLoading ? "Sende..." : "Anmelden"}
          </button>
        </form>
        {statusMessage && (
          <p className={`newsletter-status ${isError ? "error" : "success"}`}>
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Concerts;
