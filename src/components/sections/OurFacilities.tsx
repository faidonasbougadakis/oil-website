import React from "react";

type Props = { language?: "gr" | "en" };

const splitText = (text: string) => {
  const parts = text.split(/(?<=[.?!])\s+/);
  const mid = Math.ceil(parts.length / 2);
  return {
    left: parts.slice(0, mid).join(" "),
    right: parts.slice(mid).join(" "),
  };
};

const OurFacilities: React.FC<Props> = ({ language }) => {
  const isGR = language === "gr";

  const fullTextEn =
    "Each cooperative – member of the association has its own facilities and its own olive mills. The olive oil produced is stored in stainless oil tanks with a total capacity of approximately 700 tons until it is standardized. The modern olive oil press of the Cooperative is able to standardize in a wide range of packages. The Cooperative’s olive mill and printing house have been certified according to international standards FSSC 22000, ISO 22000, ISO 22005 and ISO 9001. The quality of the olive oil is directly determined by the microclimate and the morphology of the soil. The differentiation between mountainous and lowland areas produces products with a distinct flavor profile.\n\nMountainous Areas: Viannos, Krousonas, Tylisos. The high altitude and distinctive soil composition impart specific advantages to the olive oil. Growing conditions in these zones lead to production of olive oil with a more intense green color, a rich fruity flavor and high complexity, and an increased content of beneficial compounds due to the slow ripening of the fruit.\n\nLowland & Semi-mountainous Areas: Arkalochori, Voni, Episkopi, Asimi. In these areas, the soil morphology and greater sunshine create a different profile. The olive oil produced is characterized by a balanced taste and particular organoleptic characteristics that differ clearly from those of the mountainous regions.";

  const fullTextGr =
    "Κάθε συνεταιρισμός - μέλος της ένωσης διαθέτει δικές του εγκαταστάσεις και ελαιουργεία. Το παραγόμενο ελαιόλαδο αποθηκεύεται σε ανοξείδωτες δεξαμενές με συνολική χωρητικότητα περίπου 700 τόνων μέχρι να τυποποιηθεί. Ο σύγχρονος ελαιοτριβικός εξοπλισμός του Συνεταιρισμού μπορεί να τυποποιήσει σε μεγάλη γκάμα συσκευασιών. Το ελαιοτριβείο και το τυπογραφείο του Συνεταιρισμού έχουν πιστοποιηθεί σύμφωνα με διεθνή πρότυπα FSSC 22000, ISO 22000, ISO 22005 και ISO 9001.\n\nΗ ποιότητα του ελαιολάδου καθορίζεται άμεσα από το μικροκλίμα και τη μορφολογία του εδάφους. Η διαφοροποίηση μεταξύ ορεινών και πεδινών περιοχών δημιουργεί προϊόντα με διακριτό γευστικό χαρακτήρα.";

  const fullText = isGR ? fullTextGr : fullTextEn;
  const { left, right } = splitText(fullText);

  return (
    <>
      <style>{`
        /* Responsive background for OurFacilities */
        .our-facilities-bg {
          background-image: url('/oil-website/background-2.jpg');
          background-repeat: no-repeat;
          background-position: left center;
          background-size: 70% auto;
          background-color: rgb(87,101,96);
        }
        /* On medium and smaller screens prefer a cover background so the image scales and doesn't leave awkward gaps */
        @media (max-width: 1024px) {
          .our-facilities-bg {
            background-position: center top;
            background-size: cover;
          }
        }
        /* On very large screens keep the image slightly smaller to allow breathing room for text */
        @media (min-width: 1600px) {
          .our-facilities-bg { background-size: 60% auto; }
        }
      `}</style>

      <style>{`
        /* Force center layout for widths <= 1060px: hide desktop overlay and show mobile block */
        @media (max-width: 1060px) {
          .facilities-desktop { display: none !important; }
          .facilities-mobile { display: flex !important; }
        }
      `}</style>

      <style>{`
        /* Apply tall height only for small landscape screens (mobile phones) */
        @media (max-width: 1024px) and (orientation: landscape) {
          .our-facilities-bg {
            min-height: 120vh !important;
          }
        }
      `}</style>

    <section
      id="our-facilities"
      aria-label="Our Facilities"
      className="our-facilities-bg w-full min-h-screen md:min-h-0 relative overflow-hidden py-12 md:py-20"
    >
      {/* dark overlay above the background image to increase text contrast */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", zIndex: 5 }}
        aria-hidden="true"
      />

      {/* overlay text placed center-right (over image + green) on md+ */}
      <div className="hidden md:block facilities-desktop">
        <div
          className="absolute top-1/2 transform -translate-y-1/2"
          style={{
            right: "5%",
            width: "56%",
            zIndex: 10,
          }}
        >
          <div className="pr-0 text-left">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-white mb-2 font-bold"
              style={{
                letterSpacing: "0.6px",
                lineHeight: 1.02,
                textShadow: "0 6px 18px rgba(0,0,0,0.65)",
              }}
            >
              {isGR ? "Οι εγκαταστάσεις μας" : "Our Facilities"}
            </h2>

            {/* small line under title */}
            <div className="w-14 h-0.5 bg-white rounded mt-2 mb-6" />

            <p
              className="text-white text-lg leading-normal"
              style={{
                marginBottom: "1.25rem",
                textShadow: "0 4px 14px rgba(0,0,0,0.6)",
              }}
            >
              {left}
            </p>

            <p
              className="text-white text-lg leading-normal mt-6"
              style={{
                textShadow: "0 4px 14px rgba(0,0,0,0.6)",
              }}
            >
              {right}
            </p>
          </div>
        </div>
      </div>

      {/* small screens: centered block over background */}
      <div
        className="block md:hidden absolute inset-0 flex items-center justify-center px-6 facilities-mobile"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-xl text-center">
          <h2
            className="text-2xl font-semibold text-white mb-2"
            style={{ textShadow: "0 6px 18px rgba(0,0,0,0.6)" }}
          >
            {isGR ? "Οι εγκαταστάσεις μας" : "Our Facilities"}
          </h2>
          <div className="w-14 h-0.5 bg-white rounded mt-2 mb-4 mx-auto" />
          <p className="text-white text-lg leading-normal">{fullText}</p>
        </div>
      </div>

      {/* symbols.png placed bottom-right on top of green layout (above overlay, below text) */}
      <img
        src="/oil-website/symbols.png"
        alt="symbols"
        className="absolute object-contain"
        style={{
          right: "5%",
          bottom: "3%",
          width: "18%", // ~20% larger than 96px
          height: "auto",
          zIndex: 8,
        }}
      />
    </section>
    </>
  );
};

export default OurFacilities;