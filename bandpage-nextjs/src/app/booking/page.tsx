"use client"; // Needed for Header

import React from "react";
import Header from "@/components/Header"; // Assuming Header path
import ContactForm from "@/components/ContactForm"; // Import the existing component
import "@/styles/booking-page.css"; // Import styles for the page layout

const BookingPage = () => {
  const introComplete = true; // Assume intro is complete for static pages
  const headerText = "Bookinganfragen"; // Set fixed header text

  return (
    <div className="booking-page-container">
      <Header headerText={headerText} introComplete={introComplete} />
      <div className="booking-content">
        <h2>Kontakt / Booking</h2>
        <p>
          Ihr möchtet uns für einen Auftritt buchen oder habt andere Fragen?
          Nutzt gerne das Formular oder schreibt uns direkt an{" "}
          <a href="mailto:burnheartmockery@gmail.com">
            burnheartmockery@gmail.com
          </a>
          .
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default BookingPage;
