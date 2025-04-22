import React from "react";
import MusicPlayer from "./MusicPlayer";
import "@/styles/music-section.css"; // Add import for section styles

const MusicSection = () => {
  return (
    <section id="music">
      <div className="music-content-wrapper">
        <p>
          Die Reise von Burnheart Mockery geht durch die Wirren der Zeit und die
          Dunkelheit der Nacht. Während sie sich ihren Weg durch die Galaxien
          der Musik bahnen, bleiben sie vereint im Geist der Freiheit und der
          Liebe zur kosmischen Melodie, die sie zusammenbringt und ihre Seele in
          ewigem Glanz erstrahlen lässt...
        </p>
        <MusicPlayer />
      </div>
    </section>
  );
};

export default MusicSection;
