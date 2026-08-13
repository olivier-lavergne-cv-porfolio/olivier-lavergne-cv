import { motion } from "motion/react";
import { ExternalLink, Play, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type MediaItem =
  | { kind: "youtube"; id: string; url: string }
  | { kind: "instagram"; id: string; url: string }
  | { kind: "site"; title: string; url: string; img: string };

const videos: MediaItem[] = [
  { kind: "youtube", id: "Fp3g5hr6RAU", url: "https://youtu.be/Fp3g5hr6RAU" },
  { kind: "youtube", id: "uLMkjJjTc9s", url: "https://www.youtube.com/shorts/uLMkjJjTc9s" },
  { kind: "youtube", id: "0kBfVG1fZxs", url: "https://www.youtube.com/shorts/0kBfVG1fZxs" },
];

const onesikerItems: MediaItem[] = [
  { kind: "site", title: "onesiker.org", url: "https://onesiker.org", img: "onesiker-preview.png" },
  { kind: "instagram", id: "DbVV4h1C8au", url: "https://www.instagram.com/reel/DbVV4h1C8au/" },
  { kind: "instagram", id: "DYbmc6UiU-X", url: "https://www.instagram.com/reel/DYbmc6UiU-X/" },
  { kind: "instagram", id: "DZhYxvCiM_7", url: "https://www.instagram.com/reel/DZhYxvCiM_7/" },
  { kind: "instagram", id: "DZNcPmYigB0", url: "https://www.instagram.com/reel/DZNcPmYigB0/" },
  { kind: "instagram", id: "DYeWSwHiHQW", url: "https://www.instagram.com/reel/DYeWSwHiHQW/" },
];

function itemKey(item: MediaItem) {
  return item.kind === "site" ? item.url : item.id;
}

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const BASE = import.meta.env.BASE_URL;
  const thumbSrc =
    item.kind === "youtube"
      ? `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`
      : item.kind === "instagram"
        ? `${BASE}reels/reel-${item.id}.jpg`
        : `${BASE}${item.img}`;

  const platform =
    item.kind === "youtube" ? "YouTube" : item.kind === "instagram" ? "Instagram" : "onesiker.org";

  const Icon = item.kind === "site" ? Globe : Play;

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group relative block aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:dark:shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:border-indigo-400 dark:hover:border-indigo-500/50"
    >
      <img
        src={thumbSrc}
        alt={platform}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-white text-xs font-semibold flex items-center gap-1.5">
          {platform} <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </motion.a>
  );
}

export function Portfolio() {
  const { ui } = useLanguage();

  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-12 bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl transition-all duration-500"
    >
      <div className="mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
          <span className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
          {ui.portfolioTitle}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {ui.portfolioDesc}
        </p>
      </div>

      <div className="mb-10">
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
          {ui.videosLabel}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((item, i) => (
            <MediaCard key={itemKey(item)} item={item} index={i} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
          {ui.onesikerLabel}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {onesikerItems.map((item, i) => (
            <MediaCard key={itemKey(item)} item={item} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
