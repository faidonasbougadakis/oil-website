import React from "react";

const copy = {
  gr: {
    title: "Σχετικά με εμάς",
    mainBody:
      "Η Αγροτική Εταιρική Συλλογική Εταιρεία «Κρητικό Πεδίο» ιδρύθηκε τον Φεβρουάριο του 2018 με τη συνένωση των δυνάμεων 6 ισχυρών συνεταιρισμών της Κρήτης: Αρκαλοχωρίου, Βιάννου, Βόνης, Επισκοπής, Κρουσώνα και Τυλίσου.",
    facilities:
      "Οι συνεταιρισμοί, οι οποίοι διατηρούν την ανεξάρτητη οντότητά τους, διαθέτουν σύγχρονα ελαιοτριβεία, εσωτερικές δεξαμενές αποθήκευσης λαδιού από ανοξείδωτο χάλυβα συνολικής χωρητικότητας 4.000 τόνων, συσκευαστήρια, χώρους αποθήκευσης γεωργικών εφοδίων, χωράφια, οικόπεδα, μέσα μεταφοράς και διοικητικά γραφεία.",
  },
  en: {
    title: "About Us",
    mainBody:
      "The Agricultural Corporate Partnership 'Cretan Field' was founded in February 2018 by joining the forces of 6 strong cooperatives of Crete: Arkalochori, Viannos, Voni, Episkopi, Krousonas and Tylissos.",
    facilities:
      "The cooperatives, which maintain their independent entity, have modern olive mills, internal stainless steel oil storage tanks with a total capacity of 4,000 tons, packing houses, storage areas for agricultural supplies, fields, plots of land, means of transport and administrative offices.",
  },
};

const AboutUs: React.FC<{ language: "gr" | "en" }> = ({ language }) => {
  const fullText = copy[language].mainBody

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          0% { transform: translateX(-28px); opacity: 0 }
          80% { transform: translateX(6px); opacity: 1 }
          100% { transform: translateX(0); opacity: 1 }
        }
        .animate-slide { animation-name: slideInLeft; animation-duration: 640ms; animation-timing-function: cubic-bezier(.2,.9,.2,1); animation-fill-mode: both; }
        .delay-1 { animation-delay: 0.18s }
        .delay-2 { animation-delay: 0.46s }
        .delay-3 { animation-delay: 1s }
      `}</style>
    <section id="about-us" className="py-0 px-0 text-black w-full h-full relative">
      {/* blurred decorative background */}
      <div aria-hidden className="absolute inset-0 bg-[url('/background-1.png')] bg-center bg-cover opacity-70 blur-xs pointer-events-none -z-10" />
      {/* Title moved into the left column above the paragraphs */}

      {/* Full-width container for the three-item box */}
      <div className="w-full ">
        <div className="relative ">
          <div className="relative z-10 w-full max-w-none grid grid-cols-1 lg:grid-cols-[1.8fr_0.9fr] gap-24 lg:gap-40 items-stretch overflow-visible">

            {/* Leftmost: Main Text (wider) */}
            <div className="about-left p-6 lg:p-8 flex items-center justify-center">
              <div className="w-full max-w-[760px]">
                <div className="inline-block -mt-3 mb-4 animate-slide delay-1">
                  <h2 className="text-5xl font-bold text-black leading-tight">{copy[language].title}</h2>
                  <div className="w-full h-1.5 mt-2 rounded-md animate-slide delay-2" style={{ backgroundColor: 'rgb(143, 144, 121)' }} />
                </div>
                <p className="text-xl leading-relaxed mb-4 font-semibold animate-slide delay-2">{fullText}</p>
                <div className="mx-auto mb-4 animate-slide delay-3" style={{ width: 'calc(200px + 15%)' }}>
                  <div style={{ height: 6, backgroundColor: 'rgb(143, 144, 121)', borderRadius: 4 }} />
                </div>
                <p className="text-lg leading-relaxed font-semibold animate-slide delay-3">{copy[language].facilities}</p>
              </div>
            </div>

            {/* Rightmost: Decorative image5 */}
            <div className="about-right flex items-start justify-center relative z-20">
              <div
                aria-hidden="true"
                className="w-full rounded-none bg-[url('/image5.png')] bg-no-repeat bg-center bg-cover pointer-events-none h-full lg:h-full xl:h-[100vh]"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default AboutUs;