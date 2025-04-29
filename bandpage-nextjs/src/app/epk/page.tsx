import React from "react";
import Header from "@/components/Header";
import EPK from "@/components/EPK";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EPK - Burnheart Mockery",
  description: "Electronic Press Kit for Burnheart Mockery",
};

export default function EPKPage() {
  return (
    <div>
      <Header headerText="Burnheart Mockery" introComplete={true} />
      <EPK />
    </div>
  );
}
