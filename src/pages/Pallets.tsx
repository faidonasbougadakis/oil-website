import React, { useEffect, useState } from 'react'
import Header from '../components/header/header'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/footer'

type PalletsProps = {
  language: 'gr' | 'en'
  setLanguage: (lang: 'gr' | 'en') => void
}

const Pallets: React.FC<PalletsProps> = ({ language, setLanguage }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} setLanguage={setLanguage} />

      {/* empty hero section with the same background/animation as Home */}
      <main className="flex-1">
        <section
          id="pallets"
          className="h-screen flex items-center justify-center text-center text-white relative overflow-hidden"
        >
          <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: "url('/pallets.png')" }}
            aria-hidden
          />

          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden
          />

          {/* placeholder content area (kept empty per request) */}
          <div className="relative z-10" />
        </section>

        {/* ContactUs section (provided) */}
        <ContactUs language={language} />
      </main>

      <Footer />
    </div>
  )
}

export default Pallets
