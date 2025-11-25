import React from 'react'
import Header from '../components/header/header'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/footer'

type PalletsProps = {
  language: 'gr' | 'en'
  setLanguage: (lang: 'gr' | 'en') => void
}

const Pallets: React.FC<PalletsProps> = ({ language, setLanguage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} setLanguage={setLanguage} />

      {/* empty section placeholder */}
      <main className="flex-1">
        <section aria-label="Empty placeholder" className="min-h-[40vh]" />

        {/* ContactUs section (provided) */}
        <ContactUs language={language} />
      </main>

      <Footer />
    </div>
  )
}

export default Pallets
