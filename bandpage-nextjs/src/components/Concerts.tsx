import React from "react";
import "@/styles/concerts.scss";
import Image from "next/image";

const Concerts = () => {
  return (
    <div className="concerts-content-wrapper">
      <div className="text-background">
        <Image
          src="/icons/info.svg"
          alt="Info"
          className="concert-warning-icon"
          width={42}
          height={42}
        />
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
