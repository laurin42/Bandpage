import React from "react";
import Image from "next/image";

const Hero = () => {
  // TODO: Convert CSS to Tailwind classes
  return (
    <section id="home" className="pt-[15vh]">
      {" "}
      {/* scroll-padding-top equivalent */}
      <div className="relative mx-auto my-16 w-[80vw] bg-black shadow-lg border-[0.16rem] border-outset border-[rgba(82,81,81,0.8)]">
        <div className="relative flex justify-center items-center text-center font-['Calistoga']">
          {/* TODO: Verify image path after moving assets */}
          <Image
            src="/bandfoto1.jpg" // Assuming bandfoto1.jpg is moved to public
            alt="Band Photo"
            width={1920} // Provide appropriate width/height
            height={1080}
            className="w-full h-auto object-cover aspect-video" // Tailwind equivalent of .foto
            priority // Load hero image early
          />
          <h1 className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl opacity-80 flex flex-col">
            <span className="text-2xl">We are</span>
            Burnheart Mockery
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
