import React from "react";

const copy = {
  gr: { title: "Τα προϊόντα μας", body: "Σύντομη περιγραφή των προϊόντων μας." },
  en: { title: "Our Products", body: "Short description of our products." },
};

const OurProducts: React.FC<{ language: "gr" | "en" }> = ({ language }) => (
  <section id="our-products" className="py-20 px-6 text-black">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">{copy[language].title}</h2>
      <p className="max-w-2xl mx-auto">{copy[language].body}</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded border border-gray-200">Product A</div>
        <div className="p-4 bg-white rounded border border-gray-200">Product B</div>
        <div className="p-4 bg-white rounded border border-gray-200">Product C</div>
      </div>
    </div>
  </section>
);

export default OurProducts;
