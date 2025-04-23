import React from "react";
import Header from "@/components/Header"; // Import the Header component
import EPK from "@/components/EPK"; // Import the EPK component
// Optional: Add Metadata for the page
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'EPK - Burnheart Mockery', // Customize title
//   description: 'Electronic Press Kit for Burnheart Mockery',
// };

export default function EPKPage() {
  return (
    <div>
      {/* Render Header specifically for this page */}
      <Header
        headerText="Burnheart Mockery" // Static text for EPK page
        introComplete={true} // Header visible immediately
      />
      <EPK />
    </div>
  );
}
