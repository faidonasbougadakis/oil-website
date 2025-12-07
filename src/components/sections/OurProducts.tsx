import React, { useEffect, useState } from "react";

const copy = {
  gr: { title: "Τα προϊόντα μας" },
  en: { title: "Our Products" },
};

const productText = {
  en: `Cretan Land extra virgin olive oil comes exclusively from olive fruits of the Koroneiki variety grown in our region. It is one of the most famous olive oils of the Cretan land due to its qualitative, organoleptic and chemical characteristics. It has received multiple honors and awards in Greece and around the world. You will find it in 250ml, 500ml and 750ml bottles, as well as in 3lt & 5lt cans.`,
  gr: `Το έξτρα παρθένο ελαιόλαδο Cretan Land παράγεται αποκλειστικά από ελιές ποικιλίας Κορωνέικη που καλλιεργούνται στην περιοχή μας. Είναι ένα από τα πιο γνωστά ελαιόλαδα της Κρήτης χάρη στα ποιοτικά, οργανοληπτικά και χημικά του χαρακτηριστικά. Έχει λάβει πολλούς επαίνους και βραβεία στην Ελλάδα και διεθνώς. Το θα το βρείτε σε μπουκάλια 250ml, 500ml και 750ml, καθώς και σε δοχεία 3lt και 5lt.`
};

const regionText = {
  gr:' Η ποιότητα του ελαιολάδου καθορίζεται άμεσα από το μικροκλίμα και τη μορφολογία του εδάφους.Η διαφοροποίηση μεταξύ ορεινών και πεδινών περιοχών δημιουργεί προϊόντα με διακριτό γευστικό χαρακτήρα.',


  en: 'The quality of olive oil is directly determined by the microclimate and the morphology of the soil. The distinction between mountainous and lowland areas creates products with distinct flavor profiles.'

};

const filenames = [
  "Creta Land 1.png",
  "Creta Land Small 1.png",
  "Fiali 500ml 1.png",
];

const images = filenames.map((f) => `/items/${encodeURIComponent(f)}`);

const OurProducts: React.FC<{ language: "gr" | "en" }> = ({ language }) => {
  const [index, setIndex] = useState(0);

  // trigger appear animations when scrolled into view (repeatable)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.getElementById('our-products');
    if (!root) return;
    const toAnimate = Array.from(root.querySelectorAll('[data-animate]')) as HTMLElement[];
    if (!toAnimate.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          el.classList.remove('pre-animate');
          el.classList.remove('animate-appear');
          void el.offsetWidth;
          el.classList.add('animate-appear');
        } else {
          el.classList.remove('animate-appear');
          el.classList.add('pre-animate');
        }
      });
    }, { threshold: 0.18 });

    toAnimate.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // silence unused warnings in TS by referencing them in a noop when not used
  void prev;
  void next;

  return (
    <>
      <style>{`
        @keyframes appearFromNothing {
          0% { opacity: 0; transform: scale(0.92) }
          60% { opacity: 1; transform: scale(1.02) }
          100% { opacity: 1; transform: scale(1) }
        }
        .animate-appear { animation-name: appearFromNothing; animation-duration: 560ms; animation-timing-function: cubic-bezier(.2,.9,.2,1); animation-fill-mode: both; }
        .pre-animate { opacity: 0; transform: scale(0.98); }
        .delay-1 { animation-delay: 0.12s }
        .delay-2 { animation-delay: 0.36s }
        .delay-3 { animation-delay: 0.72s }
        .delay-4 { animation-delay: 0.18s }
        @media (prefers-reduced-motion: reduce) {
          .animate-appear { animation: none !important; }
        }
      `}</style>

    <section id="our-products" className="relative text-black bg-gray-200 w-full min-h-screen flex items-center py-8">
      <div className="relative mx-auto z-10 w-full flex items-center">

        <div className="relative w-full flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Left: carousel (full-height, left-to-middle) */}
            <div className="order-1 lg:order-1 w-full lg:w-1/2 flex items-center transition-all duration-300">
              <div className="relative bg-gray-200 backdrop-blur-sm rounded-lg overflow-hidden w-full h-56 sm:h-64 md:h-80 lg:h-[70vh]">
                <img
                  src={images[index]}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-contain"
                />

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`w-3 h-3 rounded-full ${i === index ? 'bg-gray-800' : 'bg-white/70'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: description text (bigger, vertically centered) */}
            <div className="order-2 lg:order-2 w-full lg:w-1/2 rounded-lg flex items-center pr-4 lg:pr-12">
              <div className="w-full px-4 sm:px-6">
                <div className="inline-block mx-auto -mt-3 mb-4 pre-animate delay-4" data-animate>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-center text-black mb-4">{copy[language].title}</h2>
                  <div className="w-20 h-1.5 mt-2 rounded-md pre-animate delay-1 mx-auto" data-animate style={{ backgroundColor: 'rgb(143, 144, 121)' }} />
                </div>

                <div className="pre-animate delay-2" data-animate>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold pre-animate delay-3 text-gray-900" data-animate>
                    {productText[language]}
                  </p>
                </div>

                <div className="pre-animate delay-2 mt-6" data-animate>
                  <div className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold pre-animate delay-3 text-gray-900 whitespace-pre-line" data-animate>
                    {regionText[language]}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
    </>
  );
};

export default OurProducts;