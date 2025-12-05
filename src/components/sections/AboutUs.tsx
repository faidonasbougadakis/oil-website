import React from "react";

const copy = {
  gr: {
    title: "Σχετικά με εμάς",
    mainBody:
      "Η Αγροτική Εταιρική Συλλογική Εταιρεία «Κρητικό Πεδίο» ιδρύθηκε τον Φεβρουάριο του 2018 με τη συνένωση των δυνάμεων 6 ισχυρών συνεταιρισμών της Κρήτης: Αρκαλοχωρίου, Βιάννου, Βόνης, Επισκοπής, Κρουσώνα και Τυλίσου.",
    facilities:
      "Οι συνεταιρισμοί, οι οποίοι διατηρούν την ανεξάρτητη οντότητά τους, διαθέτουν σύγχρονα ελαιοτριβεία, εσωτερικές δεξαμενές αποθήκευσης λαδιού από ανοξείδωτο χάλυβα συνολικής χωρητικότητας 4.000 τόνων, συσκευαστήρια, χώρους αποθήκευσης γεωργικών εφοδίων, χωράφια, οικόπεδα, μέσα μεταφοράς και διοικητικά γραφεία.",
    board:
      "Την προεδρία ανέλαβε ο κ. Κωνσταντίνος Πιτσικάκης μετά τη διαδικασία εκλογής που πραγματοποιήθηκε το 2022. αντιπρόεδρος είναι ο κ. Ιωάννης Μπορβουδάκης και μέλη είναι ο κ. Εμμανουήλ Κλαδάκης, ο κ. Ιωάννης Κυπριωτάκης, ο κ. Ιωάννης Λαμπράκης, ο κ. Θεόδωρος Σταυρίδης και ο κ. Μιχαήλ Φιολιτάκης.",
  },
  en: {
    title: "About Us",
    mainBody:
      "The Agricultural Corporate Partnership 'Cretan Field' was founded in February 2018 by joining the forces of 6 strong cooperatives of Crete: Arkalochori, Viannos, Voni, Episkopi, Krousonas and Tylissos.",
    facilities:
      "The cooperatives, which maintain their independent entity, have modern olive mills, internal stainless steel oil storage tanks with a total capacity of 4,000 tons, packing houses, storage areas for agricultural supplies, fields, plots of land, means of transport and administrative offices.",
    board:
      "The presidency has been taken over by Mr. Konstantinos Pitsikakis after the election process that took place in 2022. the vice president is Mr. Ioannis Borboudakis and the members are Mr. Emmanouil Kladakis, Mr. Ioannis Kypriotakis, Mr. Ioannis Lambrakis, Mr. Theodoros Stavridis and Mr. Michail Fiolitakis.",
  },
};

const AboutUs: React.FC<{ language: "gr" | "en" }> = ({ language }) => {
  const fullText = copy[language].mainBody
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.getElementById('about-us')
    if (!root) return
    const toAnimate = Array.from(root.querySelectorAll('[data-animate]')) as HTMLElement[]
    if (!toAnimate.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          // restart animation each time element enters
          el.classList.remove('pre-animate')
          el.classList.remove('pre-animate-slide')
          el.classList.remove('animate-appear')
          el.classList.remove('animate-slide-right')
          // force reflow so the animation can restart
          void el.offsetWidth
          if (el.hasAttribute('data-animate-slide')) {
            el.classList.add('animate-slide-right')
          } else {
            el.classList.add('animate-appear')
          }
        } else {
          // reset to hidden state so it can animate again next time
          el.classList.remove('animate-appear')
          el.classList.remove('animate-slide-right')
          if (el.hasAttribute('data-animate-slide')) {
            el.classList.add('pre-animate-slide')
          } else {
            el.classList.add('pre-animate')
          }
        }
      })
    }, { threshold: 0.18 })

    toAnimate.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes appearFromNothing {
          0% { opacity: 0; transform: scale(0.92) }
          60% { opacity: 1; transform: scale(1.02) }
          100% { opacity: 1; transform: scale(1) }
        }
        @keyframes slideFromRight {
          0% { 
            opacity: 0; 
            transform: translate(calc(-50% + 100vw), -50%);
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%);
          }
        }
        .animate-appear { animation-name: appearFromNothing; animation-duration: 560ms; animation-timing-function: cubic-bezier(.2,.9,.2,1); animation-fill-mode: both; }
        .animate-slide-right { 
          animation: slideFromRight 1200ms cubic-bezier(.2,.9,.2,1) both;
        }
        .pre-animate { opacity: 0; transform: scale(0.98); }
        .pre-animate-slide { 
          opacity: 0; 
          transform: translate(calc(-50% + 100vw), -50%);
        }
        .delay-1 { animation-delay: 0.12s }
        .delay-2 { animation-delay: 0.36s }
        .delay-3 { animation-delay: 0.72s }
        .delay-4 { animation-delay: 0.18s }
        .delay-5 { animation-delay: 0.6s }
        @media (prefers-reduced-motion: reduce) {
          .animate-appear { animation: none !important; }
          .animate-slide-right { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    <section id="about-us" className="py-0 px-0 text-black w-full min-h-screen xl:h-full relative overflow-x-hidden ">

      {/* Title moved into the left column above the paragraphs */}

      {/* Full-width container for the three-item box */}
      <div className="w-full h-full">
        <div className="relative w-full h-full">
          <div className="relative z-10 w-full h-full max-w-none mx-auto grid grid-cols-1 xl:grid-cols-[1.8fr_0.9fr] gap-12 xl:gap-40 min-h-screen place-items-center xl:place-items-center overflow-visible">

            {/* Leftmost: Main Text (wider) */}
            <div className="about-left px-6 sm:px-8 md:px-12 xl:px-16 py-8 xl:py-0 flex items-center justify-center text-center ">
              <div className="w-full max-w-[760px] mx-auto flex flex-col items-center justify-center">
              
                <div className="inline-block mx-auto xl:mx-0 -mt-3 mb-4 pre-animate delay-4" data-animate>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight text-center xl:text-center">{copy[language].title}</h2>
                  <div className="w-full h-1.5 mt-2 rounded-md pre-animate delay-1" data-animate style={{ backgroundColor: 'rgb(143, 144, 121)' }} />
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 font-semibold pre-animate delay-2" data-animate>{fullText}</p>
                <div className="mx-auto mb-4 pre-animate delay-3" data-animate style={{ width: 'calc(200px + 15%)' }}>
                  <div style={{ height: 6, backgroundColor: 'rgb(143, 144, 121)', borderRadius: 4 }} />
                </div>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold pre-animate delay-3" data-animate>{copy[language].facilities}</p>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold pre-animate delay-4 mt-4" data-animate>
                  {copy[language].board}
                </p>
              </div>
            </div>

            {/* Rightmost: Decorative image5 with centered overlay */}
            {/* Rightmost: Decorative image5 with centered overlay — hidden on small (phones) */}
            <div className="about-right hidden xl:flex items-center justify-center relative z-20 w-full h-full">
             
          
                {/* overlay image5.1 centered on top of image5 (appears from nothing). visible only on xl+ */}
                <img
                  src="/image5.1.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 object-contain pre-animate delay-5"
                  data-animate
                  style={{ width: 'min(42rem, 40vw)', height: 'min(42rem, 40vw)' }}
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