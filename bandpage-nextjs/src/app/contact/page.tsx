import React from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bandfoto5.jpg')" }}
    >
      <ContactForm />
    </div>
  );
}
