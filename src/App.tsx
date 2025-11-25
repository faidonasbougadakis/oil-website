import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/sections/Home";
import OurFacilities from "./components/sections/OurFacilities";
import OurProducts from "./components/sections/OurProducts";
import AboutUs from "./components/sections/AboutUs";
import OurVision from "./components/sections/OurVision";
import Certification from "./components/sections/Certification";
import ContactUs from "./components/sections/ContactUs";
import Pallets from "./pages/Pallets";

function App() {
  const [language, setLanguage] = useState<"gr" | "en">("gr");

  const HomeLayout = (
    <>
      <Header language={language} setLanguage={setLanguage} />

      <main className="flex flex-col items-center justify-center text-center text-black w-full">
        <Home language={language} />
        <AboutUs language={language} />
      <OurProducts language={language} />
        <OurFacilities language={language} />
  
        <OurVision language={language} />
        <Certification language={language} />
        <ContactUs language={language} />
      </main>

      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-gray-100">
        {/* === Foreground Content === */}
        <div className="relative z-10">
          <Routes>
            <Route path="/pallets" element={<Pallets language={language} setLanguage={setLanguage} />} />
            <Route path="/" element={HomeLayout} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
