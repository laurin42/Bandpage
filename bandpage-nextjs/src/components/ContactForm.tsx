"use client";

import React, { useState, FormEvent } from "react";

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
    // Equivalent to .contact-form-container
    <div className="bg-[rgba(196,192,192,0.7)] dark:bg-[rgba(50,50,50,0.7)] backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 max-w-md w-full mx-4">
      <p className="text-white text-xl md:text-2xl text-center font-['Calistoga'] mb-6">
        Wir freuen uns über Eure Bookinganfragen!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Dein Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="flex-1 p-2 border border-gray-300 rounded box-border font-['Titillium_Web'] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Deine E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="flex-1 p-2 border border-gray-300 rounded box-border font-['Titillium_Web'] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <textarea
          name="message"
          placeholder="Deine Nachricht"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="p-2 border border-gray-300 rounded box-border font-['Titillium_Web'] bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="p-2 border border-gray-300 rounded box-border w-full bg-[rgba(151,149,149,0.9)] hover:bg-[#343333] text-white cursor-pointer transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sende..." : "Anfrage senden"}
        </button>
        {status && (
          <p
            className={`text-center text-sm mt-4 ${
              status.includes("Fehler") ? "text-red-500" : "text-green-500"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
