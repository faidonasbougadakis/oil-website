import React from "react";

const copy = {
  gr: {
    title: "Δραστηριότητες",
    body: "Σύντομη περιγραφή των δραστηριοτήτων μας. Εδώ μπορείτε να βάλετε εικόνες, λίστες και συνδέσμους.",
  },
  en: {
    title: "Activities",
    body: "Brief description of our activities. Place images, lists and links here.",
  },
};

const Activities: React.FC<{ language: "gr" | "en" }> = ({ language }) => (
  <section id="activities" className="py-20 px-6 text-black">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">{copy[language].title}</h2>
      <p className="max-w-2xl mx-auto">{copy[language].body}</p>
      <ul className="mt-6 space-y-2 text-left">
        <li>• Example activity 1</li>
        <li>• Example activity 2</li>
        <li>• Example activity 3</li>
      </ul>
    </div>
  </section>
);

export default Activities;
