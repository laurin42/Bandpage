import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import "@/styles/page.css";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        {/* Remove the scroll-snap-wrapper */}
        {/* <div className="scroll-snap-wrapper"> */}
        {/* Section 1: Hero */}
        <section id="home">
          <Hero />
        </section>

        {/* Section 2: Bio */}
        <section id="bio">
          <Bio />
        </section>

        {/* Section 3: Alex */}
        <section id="alex">{/* Content for Alex section goes here */}</section>

        {/* Section 4: Luca */}
        <section id="luca">{/* Content for Luca section goes here */}</section>

        {/* Section 5: Lenny */}
        <section id="lenny">
          {/* Content for Lenny section goes here */}
        </section>

        {/* Section 6: Max */}
        <section id="max">{/* Content for Max section goes here */}</section>

        {/* Section 7: Laurin */}
        <section id="laurin">
          {/* Content for Laurin section goes here */}
        </section>
        {/* </div> */}
      </main>
    </div>
  );
}
