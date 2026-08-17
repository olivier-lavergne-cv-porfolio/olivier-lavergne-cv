import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t, ui } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="font-editorial font-light bg-[#fffef7] text-black">
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-12 px-5 sm:px-8 py-16 md:py-28"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
      >
        <div className="text-3xl sm:text-5xl font-light leading-none tracking-[-0.023em] max-w-[18ch]">
          {ui.startProject}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="text-xl font-normal">{t.name}</div>
            <div className="text-sm font-normal text-[#666666]">
              {t.title} — {t.subtitle}
            </div>
            <div className="text-sm font-normal">{t.contact.phone}</div>
          </div>
          <div className="flex gap-2 flex-wrap print:hidden">
            <a
              href={`mailto:${t.contact.email}`}
              className="text-base font-normal text-[#fffef7] bg-black rounded-full px-6 py-3"
            >
              {t.contact.email}
            </a>
            <a
              href={t.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-normal border border-[#aaaaaa] hover:border-black rounded-full px-6 py-3"
            >
              LinkedIn
            </a>
            <a
              href={t.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-normal border border-[#aaaaaa] hover:border-black rounded-full px-6 py-3"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.div>

      <div className="border-t border-[#aaaaaa] px-5 sm:px-8 py-6 flex justify-between flex-wrap gap-4 text-xs font-normal uppercase text-[#666666]">
        <div>
          {t.name} — {t.contact.location}
        </div>
        <div>{year} ©</div>
      </div>
    </footer>
  );
}
