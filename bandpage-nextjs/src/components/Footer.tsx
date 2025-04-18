"use client"; // Still needed if any client-side interaction remains, otherwise can remove

import React from "react"; // Removed useRef, useState, useEffect
// import Link from "next/link"; // REMOVED - No links left
import "@/styles/footer.css"; // Added import for CSS file

const Footer = () => {
  // REMOVED state and effect for visibility
  // const [isFooterVisible, setIsFooterVisible] = useState(false);
  // const footerRef = useRef<HTMLElement>(null);

  // REMOVED useEffect for scroll listener

  return (
    // Remove conditional class and ref
    <footer>
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Burnheart Mockery. Alle Rechte
          vorbehalten.
        </p>
        {/* REMOVED footer-links div */}
      </div>
    </footer>
  );
};

export default Footer;
