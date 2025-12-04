import React from "react";
import type { FC } from "react";
import { FaFacebook, FaTwitter, FaPinterest, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "#", label: "Facebook", icon: <FaFacebook /> },
  { href: "#", label: "Twitter", icon: <FaTwitter /> },
  { href: "#", label: "Pinterest", icon: <FaPinterest /> },
  { href: "#", label: "LinkedIn", icon: <FaLinkedin /> },
];

const columns = [
  {
    title: "Agricultural Parteners",
    items: ["Tylissos", "Krousonas", "Voni", "Archalochori", "Viannos"],
  },
  {
    title: "Information",
    items: ["Facilities", "Our Products ", "Certifications", ],
  },
  {
    title: "Useful Links",
    items: ["Privacy Policy", "Our Vision", "Pallet Log"],
  },
];

const Footer: FC = () => {
  const downloadImageOnMobile = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only intercept on small screens (mobile). Let desktop follow the link.
    if (typeof window === 'undefined') return;
    const vw = window.innerWidth;
    const MOBILE_MAX = 768; // treat <= 768px as mobile/tablet
    if (vw > MOBILE_MAX) return; // allow normal navigation on larger screens

    e.preventDefault();
    const url = '/oil-website/pallets.png';
    const filename = 'pallets.png';

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      // Ensure it's added to DOM for Firefox
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } catch (err) {
      // Fallback: navigate to the pallets page if download fails
      window.location.href = '/pallets';
    }
  };

  return (
    <footer className="bg-[#39413C] text-white py-12 px-6 text-center relative">
      <div
        className="hidden md:block absolute inset-0 bg-contain bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/oil-website/image2.png')", backgroundSize: "45%" }}
      />
      <div className="relative z-10 flex flex-col items-center mb-10">
        <div className="flex gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="text-2xl hover:text-[#00bfa6] transition-transform transform hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-10 text-left relative z-10">
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-lg font-semibold mb-3 border-b border-white pb-1">{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    {item === 'Pallet Log' ? (
                          <a href="/pallets" onClick={downloadImageOnMobile} className="hover:underline">
                            {item}
                          </a>
                        ) : item === 'Our Vision' ? (
                      <a href="/#our-vision" className="hover:underline">
                        {item}
                      </a>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
          </div>
        ))}

        <div>
          <h4 className="text-lg font-semibold mb-3 border-b border-white pb-1">About US</h4>
          <p className="text-gray-300 mb-1">Agricultural Corporate Partneship "Cretan Field</p>
          <p className="text-gray-300 mb-1"></p>
          <p className="text-gray-300">📞 +306986720400</p>
        </div>
      </div>

      <div className="border-t border-white/20 pt-5 text-gray-400 text-sm relative z-10">
        © 2025 CSDUDES. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;