import React, { useEffect, useRef, useState } from "react";

type Props = {
  language: "gr" | "en";
};

const OurVision: React.FC<Props> = ({ language }) => {
  const isGR = language === "gr";
  const sectionRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeadingVisible(true);
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => setContentVisible(true), 300);
          } else {
            setHeadingVisible(false);
            if (timeoutRef.current) {
              window.clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            setContentVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // use calligraphic fonts — load them via Google Fonts (see note)
  const containerFont = "'Cormorant Garamond', 'Playfair Display', serif";
  const headingFont = "'Playfair Display', 'Cormorant Garamond', serif";

  return (
    <section
      id="our-vision"
      ref={sectionRef}
      // background image uses public folder; add a dark green fallback color
      style={{ backgroundImage: `url('/oil-website/olivesBackround.jpg')`, backgroundColor: "#052617" }}
      className="w-[100vw] ml-[calc(-50vw+50%)] bg-no-repeat md:bg-fixed bg-cover bg-center min-h-[70vh] flex items-center justify-center text-white relative py-20 px-4"
      aria-label="Our Vision section"
    >
      <div
        /* overlay: use #364444 with lower opacity for a subtler tint */
        className="backdrop-blur-sm p-8 md:p-12 lg:p-16 rounded-lg max-w-[1200px] w-full text-center"
        // made overlay darker (more opaque)
        style={{ fontFamily: containerFont, backgroundColor: "rgba(54,68,68,0.65)" }}
      >
        <h2
          className={`text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 transform transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ fontFamily: headingFont, fontStyle: "normal", letterSpacing: "0.6px" }}
        >
          {isGR ? "Το Όραμα" : "Our Vision"}
        </h2>

        <div
          className={`space-y-6 transform transition-all duration-900 ease-out ${
            contentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {isGR ? (
            <div className="text-center">
              <p className="text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed italic">
                Ο οργανισμός οραματίζεται ένα ακμάζον μέλλον για το κρητικό ελαιόλαδο
                επιδιώκοντας:
              </p>

              <ul className="list-disc list-inside max-w-prose mx-auto space-y-4 text-lg md:text-xl lg:text-2xl leading-relaxed">
                <li className="italic">Να στηρίξει τους παραγωγούς - μέλη ώστε να αξιοποιήσουν στο έπακρο τις δυνατότητές τους</li>
                <li className="italic">Να ελαχιστοποιήσει τις περιβαλλοντικές επιπτώσεις από την καλλιέργεια της ελιάς</li>
                <li className="italic">Να βελτιώσει την ποιότητα του ελαιόλαδου και την ασφάλεια των καταναλωτών μέσω σύγχρονων συστημάτων ιχνηλασιμότητας και ποιοτικού ελέγχου</li>
              </ul>

              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mt-6">
                Στον πυρήνα του, το όραμα ενσωματώνει την πρακτική γνώση και την αρμονία
                με τη φύση για την παραγωγή θρεπτικών, υψηλής ποιότητας αγροτικών προϊόντων
                που συμβάλλουν στην εθνική ευημερία.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed italic">
                The organization envisions a thriving future for Cretan olive oil by:
              </p>

              <ul className="list-disc list-inside max-w-prose mx-auto space-y-4 text-lg md:text-xl lg:text-2xl leading-relaxed">
                <li className="italic">Supporting member olive producers to maximize their potential</li>
                <li className="italic">Minimizing environmental impact from olive cultivation</li>
                <li className="italic">Enhancing olive oil quality and consumer safety through modern traceability and quality systems</li>
              </ul>

              <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mt-6">
                At its core, the vision embraces practical knowledge and harmony with
                nature to produce nutritious, high-quality agricultural products that
                contribute to national prosperity.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurVision;