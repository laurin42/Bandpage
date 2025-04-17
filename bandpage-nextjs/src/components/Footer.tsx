"use client"; // Needed for the dialog interaction

import React, { useRef } from "react";

const Footer = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <footer className="bg-black text-white p-4">
      <div className="footer-content flex flex-col items-center justify-center text-center">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} Burnheart Mockery. Alle Rechte
          vorbehalten.
        </p>
        {/* TODO: Style dialog properly with Tailwind */}
        <dialog
          ref={dialogRef}
          className="p-4 rounded shadow-lg bg-white text-black dark:bg-gray-800 dark:text-white max-w-md w-[90vw]"
        >
          <h4 className="font-bold mb-2">Impressum</h4>
          <p className="text-sm mb-4">
            Laurin Schmidt
            <br />
            Benzstraße 9-11
            <br />
            51381 Leverkusen
            <br />
            E-Mail: burnheart.mockery@gmail.com
          </p>
          <button
            onClick={closeDialog}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm py-1 px-3 rounded"
          >
            Schließen
          </button>
        </dialog>
        <button
          onClick={showDialog}
          className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded"
        >
          Impressum
        </button>
      </div>
    </footer>
  );
};

export default Footer;
