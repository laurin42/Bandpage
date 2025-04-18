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
          Schießbude und Taktgeber, lenkt die Truppe durch sternenübersäten
          Nächte, während Laurin - für die tiefen Frequenzen zuständig -
          kosmische Basslines durch die Galaxien schickt.
        </p>
        <p>
          Die Reise von Burnheart Mockery geht durch die Wirren der Zeit und die
          Dunkelheit der Nacht. Während sie sich ihren Weg durch die Galaxien
          der Musik bahnen, bleiben sie vereint im Geist der Freiheit und der
          Liebe zur kosmischen Melodie, die sie zusammenbringt und ihre Seele in
          ewigem Glanz erstrahlen lässt...
        </p>
      </div>{" "}
      {/* Close inner formatting div */}
      {/* </div> */}
    </section>
  );
};

export default Bio;
