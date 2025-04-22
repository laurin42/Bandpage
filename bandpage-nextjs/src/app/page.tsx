"use client"; // Mark as client component

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import BioTile from "@/components/BioTile";
import "@/styles/page.css";
import { useRef, useEffect } from "react";

// Define bio descriptions
const bioDescriptions: { [key: string]: string } = {
  alex: "Alex ist der charismatische Frontmann und Lead-Sänger. Seine kraftvolle Stimme und energiegeladene Bühnenpräsenz ziehen das Publikum in den Bann. Er schreibt die meisten Songtexte.",
  luca: "Luca zaubert an der Leadgitarre. Seine Soli sind legendär und reichen von gefühlvollen Melodien bis zu schnellen Riffs. Er ist der kreative Kopf hinter vielen Arrangements.",
  lenny:
    "Lenny sorgt am Schlagzeug für den richtigen Groove. Mit präzisem Timing und dynamischem Spiel bildet er das rhythmische Rückgrat der Band. Er ist der Puls von Burnheart Mockery.",
  max: "Max liefert an der Rhythmusgitarre das solide Fundament. Seine Akkorde und Rhythmen geben den Songs Struktur und Drive. Er ist das harmonische Uhrwerk der Band.",
  laurin:
    "Laurin bedient den Bass und sorgt für die tiefen Frequenzen. Seine Basslines sind groovig und melodisch zugleich. Er verbindet Rhythmus und Harmonie auf einzigartige Weise.",
};

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    console.log("[Page] Main ref assigned:", mainRef.current);
  }, []);

  return (
    <div>
      <Header />
      <main ref={mainRef}>
        {/* Section 1: Hero */}
        <section id="home">
          <Hero />
        </section>

        {/* Section 2: Bio */}
        <section id="bio">
          <Bio />
        </section>

        <BioTile
          id="alex"
          imageUrl="/alexBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.alex}
        >
          <></>
        </BioTile>

        <BioTile
          id="luca"
          imageUrl="/lucaBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.luca}
        >
          <></>
        </BioTile>

        <BioTile
          id="lenny"
          imageUrl="/lennyBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.lenny}
        >
          <></>
        </BioTile>

        <BioTile
          id="max"
          imageUrl="/maxBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.max}
        >
          <></>
        </BioTile>

        <BioTile
          id="laurin"
          imageUrl="/laurinBg.png"
          scrollContainerRef={mainRef}
          description={bioDescriptions.laurin}
        >
          <></>
        </BioTile>
      </main>
    </div>
  );
}
