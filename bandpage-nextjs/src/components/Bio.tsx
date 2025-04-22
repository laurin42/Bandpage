import React from "react";
import "@/styles/bio.css";

const Bio = () => {
  // TODO: Convert remaining CSS to Tailwind classes
  return (
    <section id="bio">
      {/* REMOVED Outer scroll container div */}
      {/* <div className="bio-scroll-container"> */}
      {/* Inner div for text formatting remains */}
      <div>
        <p>
          In den vernebelten Höhlen einer vergessenen Hippie-Kommune formte sich
          das Schicksal von Burnheart Mockery. Axl, der Gorilla unter den
          Sängern und spiritueller Bandleader, fand hier seine musikalischen
          Brüder: Luca, der kreative Geist, taucht in den Wirbelwind der
          Sologitarre ein, während Max, das Uhrwerk der Melodie, mit seinen
          Rhythmusgitarrenklängen die Seelen berührt. Lenny, Meister der
          Schießbude und Taktgeber, lenkt die Truppe durch lange Nächte, während
          Laurin - für die tiefen Frequenzen zuständig - kosmische Basslines
          durch die Galaxien schickt.
        </p>
      </div>{" "}
      {/* Close inner formatting div */}
      {/* </div> */}
    </section>
  );
};

export default Bio;
