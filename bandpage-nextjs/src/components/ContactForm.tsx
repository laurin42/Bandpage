"use client";

import React, { useState, FormEvent } from "react";
// Import the standard CSS file
import "@/styles/contact-form.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // To show success/error messages
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(""); // Reset status

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Nachricht erfolgreich gesendet!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        setStatus(`Fehler: ${result.error || "Unbekannter Fehler"}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Fehler beim Senden des Formulars.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Assign standard CSS class
      className="contact-form" // Replaced Tailwind classes
    >
      {/* Title inside the form */}
      <h3 /* Removed Tailwind */>Anfrage senden</h3>

      {/* Group for Name and Email */}
      <div className="form-group form-group-inline">
        <input
          type="text"
          name="name"
          placeholder="Dein Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input" // Replaced Tailwind classes
        />
        <input
          type="email"
          name="email"
          placeholder="Deine E-Mail"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input" // Replaced Tailwind classes
        />
      </div>

      {/* Group for Message */}
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Deine Nachricht"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="form-textarea" // Replaced Tailwind classes
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="submit-button" // Replaced Tailwind classes
      >
        {isLoading ? "Sende..." : "Anfrage senden"}
      </button>

      {/* Status Message */}
      {status && (
        <p
          // Apply base class and conditional success/error class
          className={`submission-status ${
            status.includes("Fehler") ? "error" : "success"
          }`}
        >
          {status}
        </p>
      )}

      {/* Reminder about API endpoint (as HTML comment) */}
      {/* HINWEIS: Damit dieses Formular funktioniert, muss ein API-Endpunkt unter /api/submit-form existieren, der die Daten empfängt und verarbeitet (z.B. eine E-Mail sendet). */}
    </form>
  );
};

export default ContactForm;
