import React from "react";

const copy = {
  gr: { title: "Οι εγκαταστάσεις μας", body: "Σύντομη περιγραφή εγκαταστάσεων και εξοπλισμού." },
  en: { title: "Our Facilities", body: "Short description of facilities and equipment." },
};

const OurFacilities: React.FC<{ language: "gr" | "en" }> = ({ language }) => (
  <section id="our-facilities" className="py-20 px-6 text-black">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">{copy[language].title}</h2>
      <p className="max-w-2xl mx-auto">{copy[language].body}</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded border border-gray-200">Facility 1 (photo placeholder)</div>
        <div className="p-4 bg-white rounded border border-gray-200">Facility 2 (photo placeholder)</div>
      </div>
    </div>
  </section>
);

export default OurFacilities;
