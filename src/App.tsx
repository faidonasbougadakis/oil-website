import { useState } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/sections/Home";
import Activities from "./components/sections/Activities";
import OurFacilities from "./components/sections/OurFacilities";
import OurProducts from "./components/sections/OurProducts";
import AboutUs from "./components/sections/AboutUs";
import OurVision from "./components/sections/OurVision";
import Certification from "./components/sections/Certification";
import ContactUs from "./components/sections/ContactUs";
function App() {
  const [language, setLanguage] = useState<"gr" | "en">("gr");

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background moved into the Home section component */}

      {/* === Foreground Content === */}
      <div className="relative z-10">
        <Header language={language} setLanguage={setLanguage} />

        <main className="flex flex-col items-center justify-center text-center text-black w-full">
          <Home language={language} />
          <AboutUs language={language} />
          <Activities language={language} />
          <OurFacilities language={language} />
          <OurProducts language={language} />
          <OurVision language={language} />
          <Certification language={language} />
          <ContactUs language={language} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
