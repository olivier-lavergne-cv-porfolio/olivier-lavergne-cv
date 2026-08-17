import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Header() {
  const { lang, setLang, t, ui } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: ui.expertise },
    { href: "#portfolio", label: ui.portfolio },
    { href: "#experience", label: ui.experience },
    { href: "#reseaux", label: ui.social },
    { href: "#contact", label: ui.contact },
  ];

  return (
    <header className="font-editorial font-light sticky top-0 z-50 bg-[#fffef7] text-black relative">
      <div className="flex items-center justify-between gap-4 flex-wrap px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-black shrink-0" aria-hidden="true"></div>
          <div className="text-xs font-normal uppercase leading-tight">
            {t.title.toLowerCase()} — {t.subtitle.toLowerCase()}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-normal uppercase">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[#666666]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-[#aaaaaa] overflow-hidden text-xs font-normal uppercase">
              <button
                onClick={() => setLang("fr")}
                className={`px-2.5 py-2 ${lang === "fr" ? "bg-black text-[#fffef7]" : "hover:text-[#666666]"}`}
              >
                FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-2 ${lang === "en" ? "bg-black text-[#fffef7]" : "hover:text-[#666666]"}`}
              >
                EN
              </button>
            </div>

            <a
              href={`${import.meta.env.BASE_URL}Olivier_Lavergne_CV.pdf`}
              download="Olivier_Lavergne_CV.pdf"
              aria-label={ui.download}
              className="w-9 h-9 rounded-full border border-[#aaaaaa] hover:border-black flex items-center justify-center"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={ui.menu}
              className="md:hidden text-sm font-normal text-[#fffef7] bg-black rounded-full px-6 py-3"
            >
              {menuOpen ? <X className="w-4 h-4" /> : ui.menu}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col border-t border-[#e8e6dd] px-5 py-4 gap-4 text-sm font-normal uppercase">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#666666]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
