import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "ia" || w === "ai" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function withNoBreak(str: string) {
  return str.replace(/ /g, " ");
}

const lineReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const wordReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
};

function TitleLine({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.span variants={lineReveal} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      {words.map((word, i) => (
        <motion.span key={i} variants={wordReveal} className="inline-block">
          {i === words.length - 1 ? withNoBreak(word) : word}
        </motion.span>
      )).reduce((acc, el, i) => (i === 0 ? [el] : [...acc, " ", el]), [] as ReactNode[])}
    </motion.span>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const [titleLine1, titleLine2] = t.title.split(" / ");

  return (
    <section className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 flex flex-col gap-6">
      <motion.h1 initial="hidden" animate="show" variants={lineReveal} className="text-display m-0">
        <TitleLine text={toTitleCase(titleLine1)} />
        <TitleLine text={toTitleCase(titleLine2)} />
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
        className="flex flex-col gap-2"
      >
        <div className="h-px bg-[#aaaaaa]"></div>
        <div className="text-caption uppercase text-[#666666]">{t.subtitle}</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
        className="text-subheading max-w-[34ch] text-pretty mt-6"
      >
        {t.description}
      </motion.div>
    </section>
  );
}
