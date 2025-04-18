import React from "react";
import Image from "next/image";
import "@/styles/hero.css"; // Added import for CSS file

const Hero = () => {
  // TODO: Convert CSS to Tailwind classes
  return (
    <section id="home">
      {" "}
      {/* scroll-padding-top equivalent */}
      <div>
        <div>
          {/* TODO: Verify image path after moving assets */}
          <Image
            src="/bpBackground.png"
            alt="Band Photo"
            width={1920} // Provide appropriate width/height
            height={1080}
            priority // Load hero image early
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
