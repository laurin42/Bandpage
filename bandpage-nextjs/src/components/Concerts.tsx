import React from "react";
import "@/styles/concerts.css"; // Import styles
import { FaExclamationTriangle } from "react-icons/fa"; // Import the icon

const Concerts = () => {
  return (
    // Section ID will be set in page.tsx
    // Background image will be set via CSS in layout.css or concerts.css
    <div className="concerts-content-wrapper">
      {/* Inner container for the background */}
      <div className="text-background">
        {/* Add the warning icon inside text-background */}
        <FaExclamationTriangle className="concert-warning-icon" />
        <p>
          Aktuell konzentrieren wir uns auf neue Aufnahmen und haben zur Zeit
          keine Auftritte geplant. Wir werden Euch hier informieren, sobald wir
          wieder auf der Bühne stehen.
        </p>
      </div>
    </div>
  );
};

export default Concerts;
