import React from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    // Equivalent to .contact-page-container
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      // TODO: Confirm background image path after asset migration
      style={{ backgroundImage: "url('/bandfoto5.jpg')" }} // Assumes bandfoto5.jpg is in public/
    >
      <ContactForm />
    </div>
  );
}
