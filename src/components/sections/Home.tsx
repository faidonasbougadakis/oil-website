import React, { useEffect, useRef, useState } from "react";

const translations = {
  gr: {
    welcome: "Κρήτικος Αγρός",
    scrollText: "Γεύση. Υγεία. Κρήτη. Ανακαλύψτε τη διαφορά που κάνει η καταγωγή.",
  },
  en: {
    welcome: "Cretan lands",
    scrollText: "Taste. Health. Crete. Discover the difference that origin makes.",
  },
};

const Home: React.FC<{ language: "gr" | "en" }> = ({ language }) => {
  // Attach the background to the hero (first screen) only so it fills and scales
  // to that segment; it will not extend to the next section.
  const [mounted, setMounted] = useState(false);
  const secondRef = useRef<HTMLElement | null>(null);
  const [secondActive, setSecondActive] = useState(false);

  useEffect(() => {
    // trigger mount animation
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = secondRef.current;
    if (!el) return;

    // Observe the second section; when it starts intersecting, show the color overlay.
    const obs = new IntersectionObserver(
      ([entry]) => setSecondActive(entry.isIntersecting),
      { threshold: 0.05 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      {/* full-screen color overlay that transitions when entering the next segment */}
      <div
        className={`fixed inset-0 pointer-events-none transition-colors duration-500 z-10 ${
          secondActive ? "bg-black/20" : "bg-transparent"
        }`}
        aria-hidden
      />
      {/* Hero with background applied to this section only */}
      <section
        id="home"
        className="h-screen flex items-center justify-center text-center text-white relative overflow-hidden"
      >
        {/* background image layer with subtle scale + fade-in transition */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ backgroundImage: "url('/oil-website/image3.jpg')" }}
          aria-hidden
        />

        {/* subtle overlay to improve contrast */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`} aria-hidden />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-center text-white mb-4">{translations[language].welcome}</h1>
          <p className="text-2xl max-w-xl">{translations[language].scrollText}</p>
        </div>
      </section>

      {/* Second section removed */}
    </div>
  );
};

export default Home;
