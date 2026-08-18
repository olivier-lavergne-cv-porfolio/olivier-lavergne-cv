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

const ICON_PROPS = { fill: "none", stroke: "#fffef7", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* Production Vidéo IA — play button woven into a neural-network of nodes */
function IconAIVideo() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" {...ICON_PROPS} strokeOpacity={0.55}>
      <circle cx="100" cy="100" r="34" />
      <polygon points="90,84 90,116 118,100" fill="#fffef7" fillOpacity="0.55" stroke="none" />
      <circle cx="40" cy="58" r="4" fill="#fffef7" fillOpacity="0.6" stroke="none" />
      <circle cx="162" cy="55" r="4" fill="#fffef7" fillOpacity="0.6" stroke="none" />
      <circle cx="44" cy="150" r="4" fill="#fffef7" fillOpacity="0.6" stroke="none" />
      <circle cx="158" cy="146" r="4" fill="#fffef7" fillOpacity="0.6" stroke="none" />
      <line x1="40" y1="58" x2="79" y2="87" />
      <line x1="162" y1="55" x2="121" y2="86" />
      <line x1="44" y1="150" x2="81" y2="118" />
      <line x1="158" y1="146" x2="119" y2="117" />
    </svg>
  );
}

/* Airbus Defence Space — abstract aircraft silhouette over radar rings (no brand marks) */
function IconAerospace() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" {...ICON_PROPS} strokeOpacity={0.45}>
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="48" />
      <circle cx="100" cy="100" r="26" />
      <polygon points="100,52 113,112 100,101 87,112" fill="#fffef7" fillOpacity="0.55" stroke="none" />
      <polygon points="58,122 100,106 142,122 100,133" fill="#fffef7" fillOpacity="0.35" stroke="none" />
    </svg>
  );
}

/* Spots TV M6 & MTV — broadcast monitor with a play spot and signal waves (no channel logos) */
function IconBroadcast() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" {...ICON_PROPS} strokeOpacity={0.5}>
      <rect x="52" y="64" width="96" height="62" rx="3" />
      <polygon points="90,84 90,106 112,95" fill="#fffef7" fillOpacity="0.55" stroke="none" />
      <line x1="80" y1="126" x2="80" y2="136" />
      <line x1="120" y1="126" x2="120" y2="136" />
      <line x1="68" y1="136" x2="132" y2="136" />
      <path d="M152 58 Q168 75 152 92" />
      <path d="M163 47 Q186 75 163 103" />
    </svg>
  );
}

const ICONS = [IconAIVideo, IconAerospace, IconBroadcast];

export function Portfolio() {
  const { t, ui } = useLanguage();

  return (
    <motion.section
      id="portfolio"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 py-16 flex flex-col gap-12"
    >
      <motion.div variants={staggerItem} className="flex flex-col gap-3 max-w-3xl">
        <h2 className="text-heading-sm m-0">
          {ui.portfolioTitle}
        </h2>
        <p className="text-body text-[#666666] text-pretty">
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
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div key={item.title} variants={staggerItem} className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3]" style={{ background: art(p.c1, p.c2, p.mode) }}>
                <Icon />
              </div>
              <div className="text-subheading">{item.title}</div>
              <div className="text-body-sm text-[#666666] text-pretty">
                {item.description}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
