import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Play, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { shortVideos, onesikerItems, itemKey, thumbUrl, platformLabel, type MediaItem } from "../media";

const items: MediaItem[] = [...shortVideos, ...onesikerItems];

export function Social() {
  const { ui } = useLanguage();
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const BASE = import.meta.env.BASE_URL;

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    let down = false;
    let startX = 0;
    let startLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onPointerEnd = () => {
      down = false;
      el.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (down) el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const atStart = el.scrollLeft <= 1;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      const w = card ? card.getBoundingClientRect().width + 24 : 320;
      const idx = Math.min(items.length - 1, Math.round(el.scrollLeft / w));
      setIndex((prev) => (prev !== idx ? idx : prev));
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerEnd);
    el.addEventListener("pointerleave", onPointerEnd);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerEnd);
      el.removeEventListener("pointerleave", onPointerEnd);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const step = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const w = card ? card.getBoundingClientRect().width + 24 : 320;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const progress = Math.round(((index + 1) / items.length) * 100);

  return (
    <motion.section
      id="reseaux"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="font-editorial font-light bg-[#fffef7] text-black py-16 flex flex-col gap-12 overflow-hidden"
    >
      <div className="px-5 sm:px-8 flex items-end justify-between gap-6 flex-wrap">
        <div className="flex flex-col gap-6">
          <div className="text-xs font-normal uppercase text-[#666666]">{ui.social}</div>
          <div className="text-3xl sm:text-5xl font-light leading-none tracking-[-0.023em] max-w-[22ch]">
            {ui.videosLabel}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs font-normal uppercase text-[#666666] whitespace-nowrap">
            [ {index + 1} / {items.length} ]
          </div>
          <button
            onClick={() => step(-1)}
            aria-label="Previous"
            className="w-12 h-12 rounded-full border border-[#aaaaaa] hover:border-black flex items-center justify-center text-sm"
          >
            ←
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next"
            className="w-12 h-12 rounded-full border border-[#aaaaaa] hover:border-black flex items-center justify-center text-sm"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-6 overflow-x-auto px-5 sm:px-8 pb-2 cursor-grab [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "clamp(20px, 4vw, 32px)" }}
      >
        {items.map((item) => {
          const Icon = item.kind === "site" ? Globe : Play;
          return (
            <a
              key={itemKey(item)}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-none flex flex-col gap-4"
              style={{ width: "min(78vw, 300px)", scrollSnapAlign: "start" }}
            >
              <div className="relative w-full aspect-[9/16] overflow-hidden bg-[#101731]">
                <img
                  src={thumbUrl(item, BASE)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40">
                  <div className="w-14 h-14 rounded-full bg-[#fffef7]/90 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="absolute left-4 top-4 text-xs font-normal uppercase text-[#fffef7] border border-[#fffef773] rounded-full px-3 py-1.5">
                  {platformLabel(item)}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs font-normal uppercase text-[#666666]">
                {platformLabel(item)}
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          );
        })}
      </div>

      <div className="px-5 sm:px-8 flex items-center gap-2">
        <div className="flex-1 h-px bg-[#e8e6dd] relative">
          <div
            className="absolute left-0 top-0 h-px bg-black transition-[width]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs font-normal uppercase text-[#666666] whitespace-nowrap">{ui.swipeHint}</div>
      </div>
    </motion.section>
  );
}
