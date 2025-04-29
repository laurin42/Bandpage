"use client";

import React from "react";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import "@/styles/booking-page.scss";

const BookingPage = () => {
  const introComplete = true;
  const headerText = "Bookinganfragen";

  return (
    <div className="booking-page-container">
      <Header headerText={headerText} introComplete={introComplete} />
      <div className="booking-content">
        <ContactForm />
      </div>
    </div>
  );
};

export default BookingPage;
