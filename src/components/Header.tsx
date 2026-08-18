import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Header() {
  const { lang, setLang, t, ui } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (menuOpen) return;
    const diff = latest - lastY.current;
    if (latest < 80) setHidden(false);
    else if (diff > 4) setHidden(true);
    else if (diff < -4) setHidden(false);
    lastY.current = latest;
  });

  const navLinks = [
    { href: "#about", label: ui.expertise },
    { href: "#portfolio", label: ui.portfolio },
    { href: "#webdesign", label: ui.webDesignTitle },
    { href: "#experience", label: ui.experience },
    { href: "#reseaux", label: ui.social },
    { href: "#contact", label: ui.contact },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="font-editorial sticky top-0 z-50 bg-[#fffef7] text-black relative"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap px-5 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-black shrink-0" aria-hidden="true"></div>
          <div className="text-caption uppercase leading-tight">
            {t.name}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-caption uppercase">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[#666666]">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-[#aaaaaa] overflow-hidden text-caption uppercase">
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
              className="md:hidden text-body-sm text-[#fffef7] bg-black rounded-full px-6 py-3"
            >
              {menuOpen ? <X className="w-4 h-4" /> : ui.menu}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden flex flex-col border-t border-[#e8e6dd] px-5 py-4 gap-4 text-body-sm uppercase">
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
    </motion.header>
  );
}
