"use client"; // Needed for Header

import React from "react";
import Header from "@/components/Header"; // Assuming Header path
import Impressum from "@/components/Impressum"; // Import the new component
import "@/styles/impressum.css"; // Import the new styles

const ImpressumPage = () => {
  const introComplete = true; // Assume intro is complete for static pages
  const headerText = "Impressum"; // Set fixed header text

  return (
    <div className="impressum-page-container">
      {/* Render the Header directly on this page */}
      <Header headerText={headerText} introComplete={introComplete} />
      {/* Render the Impressum component */}
      <Impressum />
    </div>
  );
};

export default ImpressumPage;
