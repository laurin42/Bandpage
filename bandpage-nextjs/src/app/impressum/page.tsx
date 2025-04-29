"use client";

import React from "react";
import Header from "@/components/Header";
import Impressum from "@/components/Impressum";
import "@/styles/impressum.scss";

const ImpressumPage = () => {
  const introComplete = true;
  const headerText = "Impressum";

  return (
    <div className="impressum-page-container">
      <Header headerText={headerText} introComplete={introComplete} />
      <Impressum />
    </div>
  );
};

export default ImpressumPage;
