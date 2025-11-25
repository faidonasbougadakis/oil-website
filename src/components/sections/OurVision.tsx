import React from "react";

const copy = {
  gr: { title: "Το όραμά μας", body: "Το όραμά μας για το μέλλον και τους στόχους μας." },
  en: { title: "Our Vision", body: "Our vision for the future and our goals." },
};

const OurVision: React.FC<{ language: "gr" | "en" }> = ({ language }) => (
  <section id="our-vision" className="py-20 px-6 text-black">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">{copy[language].title}</h2>
      <p className="max-w-2xl mx-auto">{copy[language].body}</p>
    </div>
  </section>
);

export default OurVision;
