import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactCountryFlag from "react-country-flag";

// Navigation links with stable ids (same ids for both languages)
const translations = {
  gr: {
    navLinks: [
      { id: "home", label: "Αρχική σελίδα" },
      { id: "our-vision", label: "Το Όραμά μας" },
      { id: "our-facilities", label: "Εγκαταστάσεις" },
      { id: "about-us", label: "Σχετικά με εμάς" },
      { id: "contact-us", label: "Επικοινωνία" },
    ],
  },
  en: {
    navLinks: [
      { id: "home", label: "Home" },
      { id: "our-vision", label: "Our Vision" },
      { id: "our-facilities", label: "Our Facilities" },
      { id: "about-us", label: "About Us" },
      { id: "contact-us", label: "Contact Us" },
    ],
  },
};

const Header: React.FC<{ language: "gr" | "en"; setLanguage: (lang: "gr" | "en") => void }> = ({
  language,
  setLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScroll = useRef<number>(0);
  const showTimeout = useRef<number | null>(null);
  const [isNarrow, setIsNarrow] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 910 : false
  );
  

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Track scroll direction and toggle header visibility.
    prevScroll.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      // always show header when at very top of the page
      if (y === 0) {
        setVisible(true);
        setScrolled(false);
        prevScroll.current = y;
        return;
      }

      // keep the scrolled state for background styling
      setScrolled(y > 10);

      // if mobile menu is open, keep header visible
      if (isOpen) {
        setVisible(true);
        prevScroll.current = y;
        return;
      }

      // scrolling down -> show header immediately
      if (y > prevScroll.current) {
        if (showTimeout.current) {
          window.clearTimeout(showTimeout.current);
          showTimeout.current = null;
        }
        setVisible(true);
      }

      // scrolling up -> hide header immediately
      if (y < prevScroll.current) {
        if (showTimeout.current) {
          window.clearTimeout(showTimeout.current);
          showTimeout.current = null;
        }
        setVisible(false);
      }

      prevScroll.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (showTimeout.current) {
        window.clearTimeout(showTimeout.current);
        showTimeout.current = null;
      }
    };
  }, [isOpen]);

  // Shrink internal header spacing/font when viewport width goes below 910px
  useEffect(() => {
    let t: number | null = null;
    const onResize = () => {
      if (t) window.clearTimeout(t);
      // debounce
      t = window.setTimeout(() => {
        setIsNarrow(window.innerWidth < 910);
      }, 80) as unknown as number;
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (t) window.clearTimeout(t);
    };
  }, []);

  

  const { navLinks } = translations[language];
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: any, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    // If we're not on the root path, navigate back to root with the hash
    // so the homepage can handle scrolling to the section.
    if (location.pathname !== '/') {
      // Use react-router navigation to avoid full page reload
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      // account for fixed header height so section isn't hidden behind it
      const headerEl = document.querySelector('header') as HTMLElement | null;
      const headerH = headerEl ? headerEl.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      // fallback: update hash on the same path
      window.location.hash = `#${id}`;
    }
  };

  return (
    <header
      className={`transform ${visible ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ${
        scrolled ? "bg-gray-900/70 backdrop-blur-md shadow-md" : "bg-transparent"
      } fixed top-0 left-0 w-full z-50`}
    >
      <div className="relative flex items-center justify-center h-20">
        {/* Left corner logo (absolute) */}
        <div className="absolute left-4 top-0 h-full flex items-center pointer-events-auto ">
          <img src="/image5.1.png" alt="MyLogo" className={`${isNarrow ? 'h-15' : 'h-20'} brightness-70`} />
        </div>

        {/* Centered nav with responsive padding and constrained max width */}
        <div className="w-full max-w-8xl mx-auto flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20">
          <nav className={`hidden md:flex justify-center ${isNarrow ? 'md:space-x-2 lg:space-x-6' : 'md:space-x-6 lg:space-x-10'} flex-nowrap whitespace-nowrap no-scrollbar w-full max-w-4xl md:max-w-5xl lg:max-w-9xl`}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`font-semibold transition-colors duration-200 text-white hover:text-blue-300 ${isNarrow ? 'text-sm md:text-sm' : 'text-sm md:text-base lg:text-base'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right corner flags + mobile menu (absolute) */}
        <div className="absolute right-4 top-0 h-full flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setLanguage("gr")}
              aria-label="Switch to Greek"
              className={`h-6 w-9 flex items-center justify-center rounded border-2 transition ${
                language === "gr" ? "border-blue-400" : "border-transparent"
              }`}
            >
              <ReactCountryFlag countryCode="GR" svg style={{ width: "100%", height: "100%" }} />
            </button>

            <button
              onClick={() => setLanguage("en")}
              aria-label="Switch to English"
              className={`h-6 w-9 flex items-center justify-center rounded border-2 transition ${
                language === "en" ? "border-blue-400" : "border-transparent"
              }`}
            >
              <ReactCountryFlag countryCode="GB" svg style={{ width: "100%", height: "100%" }} />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none transition-colors duration-200 text-white hover:text-blue-300 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-gray-900/70 backdrop-blur-md shadow-md ${
          isOpen ? "max-h-[calc(100vh-var(--header-height,80px))] overflow-y-auto" : "max-h-0"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 pt-3 pb-4 space-y-3">
          <div className="flex items-center justify-end gap-3 px-2">
            <button
              onClick={() => setLanguage("gr")}
              aria-label="Switch to Greek"
              className={`h-7 w-10 flex items-center justify-center rounded border-2 transition ${
                language === "gr" ? "border-blue-400" : "border-transparent"
              }`}
            >
              <ReactCountryFlag countryCode="GR" svg style={{ width: "100%", height: "100%" }} />
            </button>

            <button
              onClick={() => setLanguage("en")}
              aria-label="Switch to English"
              className={`h-7 w-10 flex items-center justify-center rounded border-2 transition ${
                language === "en" ? "border-blue-400" : "border-transparent"
              }`}
            >
              <ReactCountryFlag countryCode="GB" svg style={{ width: "100%", height: "100%" }} />
            </button>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="block px-3 py-3 rounded-md font-medium transition-colors duration-200 text-white hover:text-blue-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
