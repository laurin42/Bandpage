"use client";

import React from "react";
import Header from "@/components/Header";
import PrivacyPolicy from "@/components/PrivacyPolicyPage";

const PrivacyPolicyPage = () => {
  const introComplete = true;
  const headerText = "Datenschutz";

  return (
    <div className="privacy-policy-page-container">
      <Header headerText={headerText} introComplete={introComplete} />
      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
