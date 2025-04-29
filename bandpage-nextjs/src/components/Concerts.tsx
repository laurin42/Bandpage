import React from "react";
import "@/styles/concerts.scss";
import { FaExclamationTriangle } from "react-icons/fa";

const Concerts = () => {
  return (
    <div className="concerts-content-wrapper">
      <div className="text-background">
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
