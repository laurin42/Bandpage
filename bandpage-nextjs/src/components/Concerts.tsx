import React from "react";
import Link from "next/link";

// Placeholder data for concerts
const concertData = [
  {
    date: "10.08.2024",
    location: "Leichlingen, Deutschland",
    venue: "Ingo's Zeltplatz",
    ticketLink: "#", // Replace with actual link or remove button
  },
  {
    date: "24.12.2024",
    location: "Narvik, Norwegen",
    venue: "Weihnachtsfeier am Polarkreis",
    ticketLink: "#",
  },
  {
    date: "01.01.2025",
    location: "Washington D.C., USA",
    venue: "Neuhjahrsfeier des Präsidenten",
    ticketLink: "#",
  },
  {
    date: "20.04.2025",
    location: "Amsterdam, Niederlande",
    venue: "Holländisches Blumenfest",
    ticketLink: "#",
  },
  {
    date: "30.08.2025",
    location: "Wacken, Deutschland",
    venue: "Wacken Open Air",
    ticketLink: "#",
  },
  {
    date: "15.11.2025",
    location: "Wanne-Eickel, Germany",
    venue: "Ich geh mit meiner Laterne",
    ticketLink: "#",
  },
  // Add more concerts as needed
];

const Concerts = () => {
  // TODO: Convert CSS to Tailwind classes
  return (
    <section id="concerts" className="pt-20 pb-[20vh] px-4 scroll-mt-[8vh]">
      <h3 className="text-3xl font-['Calistoga'] text-center text-gray-900 dark:text-gray-100 mb-12">
        ...buckle up and join us on our rock'n'roll journey...
      </h3>
      <div className="flex justify-center mb-20">
        <a
          href="https://wonderl.ink/@burnheart-mockery"
          target="_blank"
          rel="noopener noreferrer"
          className="follow-button bg-[#9d2f3a] hover:bg-[rgb(164,86,86)] text-white font-bold py-2 px-4 rounded text-center"
        >
          FOLLOW US!
        </a>
      </div>
      <div className="max-w-[75%] mx-auto overflow-x-auto">
        <table className="w-full border-collapse text-left shadow-[14px_5px_15px_-3px_rgba(9,9,9,0.08)]">
          {/* Removed empty thead */}
          <tbody>
            {concertData.map((concert, index) => (
              <tr
                key={index}
                className="shadow-[0px_4px_10px_-1px_rgba(9,9,9,0.04)]"
              >
                <td className="border-b border-gray-300 dark:border-gray-700 py-3 px-2">
                  {concert.date} {concert.location}
                </td>
                <td className="border-b border-gray-300 dark:border-gray-700 py-3 px-2">
                  {concert.venue}
                </td>
                <td className="border-b border-gray-300 dark:border-gray-700 py-3 px-2 text-right">
                  {/* Conditionally render button if ticketLink exists */}
                  {concert.ticketLink && concert.ticketLink !== "#" ? (
                    <a
                      href={concert.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white text-xs py-1 px-2 rounded hover:bg-gray-700"
                    >
                      Tickets
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500">Info folgt</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Concerts;
