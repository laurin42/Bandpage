"use client";

import React, { useState, FormEvent } from "react";
import "@/styles/contact-form.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
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
    setStatus("");

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
        setFormData({ name: "", email: "", message: "" });
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
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>
        Du möchtest uns für einen Auftritt buchen oder hast andere Fragen?
        <p>
          Nutze das Formular oder schreib uns direkt an{" "}
          <a href="mailto:burnheartmockery@gmail.com">
            kontakt@burnheart-mockery.de
          </a>
        </p>
      </h2>
      <div className="form-group form-group-inline">
        <input
          type="text"
          name="name"
          placeholder="Dein Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Deine E-Mail"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
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
          className="form-textarea"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? "Sende..." : "Nachricht abschicken"}
      </button>

      {/* Status Message */}
      {status && (
        <p
          className={`submission-status ${
            status.includes("Fehler") ? "error" : "success"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
