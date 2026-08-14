import { motion } from "motion/react";
import { ExternalLink, Play, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type MediaItem =
  | { kind: "youtube"; id: string; url: string }
  | { kind: "instagram"; id: string; url: string }
  | { kind: "site"; title: string; url: string; img: string };

const mainVideo: MediaItem = {
  kind: "youtube",
  id: "Fp3g5hr6RAU",
  url: "https://youtu.be/Fp3g5hr6RAU",
};

const shortVideos: MediaItem[] = [
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

function thumbUrl(item: MediaItem, base: string) {
  if (item.kind === "youtube") return `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`;
  if (item.kind === "instagram") return `${base}reels/reel-${item.id}.jpg`;
  return `${base}${item.img}`;
}

function platformLabel(item: MediaItem) {
  if (item.kind === "youtube") return "YouTube";
  if (item.kind === "instagram") return "Instagram";
  return "onesiker.org";
}

function MediaCard({ item, aspect }: { item: MediaItem; aspect: "video" | "portrait" }) {
  const BASE = import.meta.env.BASE_URL;
  const Icon = item.kind === "site" ? Globe : Play;
  const aspectClass = aspect === "video" ? "aspect-video" : "aspect-[9/16]";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener"
      className={`group relative block ${aspectClass} rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900`}
    >
      <img
        src={thumbUrl(item, BASE)}
        alt={platformLabel(item)}
        loading="lazy"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40">
        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
          <Icon className="w-6 h-6 text-slate-900" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-white text-xs font-semibold flex items-center gap-1.5">
          {platformLabel(item)} <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
}

export function Portfolio() {
  const { ui } = useLanguage();

  return (
    <motion.section
      id="portfolio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-1 md:col-span-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl"
    >
      <div className="mb-10">
        <h3 className="text-[clamp(1.5rem,2vw+1rem,1.875rem)] font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-3">
          <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
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

        <div className="mb-4">
          <MediaCard item={mainVideo} aspect="video" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shortVideos.map((item) => (
            <MediaCard key={itemKey(item)} item={item} aspect="portrait" />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
          {ui.onesikerLabel}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {onesikerItems.map((item) => (
            <MediaCard key={itemKey(item)} item={item} aspect="portrait" />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
