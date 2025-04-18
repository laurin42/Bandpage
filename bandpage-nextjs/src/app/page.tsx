import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bio from "@/components/Bio";
import Concerts from "@/components/Concerts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 text-center w-full bg-gray-100 dark:bg-gray-800">
        {/* The main content sections will go here */}
        <Hero />
        <Bio />
        <Concerts />
      </main>
      <Footer />
    </div>
  );
}
