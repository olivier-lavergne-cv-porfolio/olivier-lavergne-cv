import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { staggerContainer, staggerItem } from "../lib/motionVariants";

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function mix(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.round(v * 0.42));
  return `rgb(${c.join(",")})`;
}

type ArtMode = "arc" | "grid" | "bands";

const ART_LAYERS: Record<ArtMode, string> = {
  arc: "radial-gradient(90% 70% at 50% 108%, rgba(255,254,247,0.30) 0 38%, rgba(255,254,247,0) 39%), radial-gradient(60% 46% at 50% 106%, rgba(255,254,247,0.22) 0 46%, rgba(255,254,247,0) 47%)",
  grid: "repeating-linear-gradient(90deg, rgba(255,254,247,0.14) 0 1px, transparent 1px 7%), repeating-linear-gradient(0deg, rgba(255,254,247,0.10) 0 1px, transparent 1px 9%)",
  bands: "repeating-linear-gradient(0deg, rgba(255,254,247,0.12) 0 2px, transparent 2px 11%)",
};

function art(c1: string, c2: string, mode: ArtMode) {
  return [
    `radial-gradient(120% 90% at 30% 26%, ${rgba(c2, 0.9)} 0%, ${rgba(c2, 0)} 62%)`,
    ART_LAYERS[mode],
    "linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%)",
    "repeating-linear-gradient(0deg, rgba(255,254,247,0.045) 0 1px, transparent 1px 3px)",
    `linear-gradient(160deg, ${c1} 0%, ${mix(c1)} 100%)`,
  ].join(", ");
}

const PALETTE: Array<{ c1: string; c2: string; mode: ArtMode }> = [
  { c1: "#8a0467", c2: "#05070f", mode: "arc" },
  { c1: "#101731", c2: "#a5c8eb", mode: "grid" },
  { c1: "#03624c", c2: "#05070f", mode: "bands" },
];

export function Portfolio() {
  const { t, ui } = useLanguage();

  return (
    <motion.section
      id="portfolio"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="flex flex-col gap-3 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-light leading-tight tracking-[-0.02em] m-0">
          {ui.portfolioTitle}
        </h2>
        <p className="text-base font-light leading-relaxed text-[#666666] text-pretty">
          {ui.portfolioDesc}
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid gap-12"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}
      >
        {t.portfolio.map((item, i) => {
          const p = PALETTE[i % PALETTE.length];
          return (
            <motion.div key={item.title} variants={staggerItem} className="flex flex-col gap-4">
              <div className="w-full aspect-[4/3]" style={{ background: art(p.c1, p.c2, p.mode) }}></div>
              <div className="text-xl font-light leading-snug">{item.title}</div>
              <div className="text-sm font-normal leading-relaxed text-[#666666] text-pretty">
                {item.description}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
