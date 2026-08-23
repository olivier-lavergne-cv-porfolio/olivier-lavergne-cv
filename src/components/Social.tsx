import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ExternalLink, Play, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { scrollByY } from "../hooks/useSmoothScroll";
import { shortVideos, instagramItems, itemKey, thumbUrl, platformLabel, type MediaItem } from "../media";
import { VideoLightbox } from "./VideoLightbox";

const items: MediaItem[] = [...shortVideos, ...instagramItems];

/**
 * Pinned horizontal gallery: the section is a tall scroll track whose sticky
 * viewport stays put while vertical scroll is mapped 1:1 onto horizontal travel
 * of the rail. The page keeps scrolling normally once the last video is reached,
 * so the reader is carried through the whole gallery without the scroll ever
 * being blocked.
 */
export function Social() {
  const { ui } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [index, setIndex] = useState(0);
  const [openVideo, setOpenVideo] = useState<Extract<MediaItem, { kind: "youtube" }> | null>(null);
  const BASE = import.meta.env.BASE_URL;

  useLayoutEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      const sticky = stickyRef.current;
      if (!rail || !sticky) return;
      setDistance(Math.max(0, rail.scrollWidth - window.innerWidth));
      setStickyHeight(sticky.offsetHeight);
    };
    measure();

    const observer = new ResizeObserver(measure);
    if (railRef.current) observer.observe(railRef.current);
    if (stickyRef.current) observer.observe(stickyRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Several cards share the viewport on wide screens, so the counter tracks scroll
  // progress across the gallery rather than a single card width — that keeps it in
  // step with the progress bar and lets it reach n/n exactly at the end.
  const steps = Math.max(1, items.length - 1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(steps, Math.max(0, Math.round(p * steps)));
    setIndex((prev) => (prev !== idx ? idx : prev));
  });

  // Vertical scroll inside the track maps 1:1 onto horizontal travel, so one
  // counter step is distance/steps pixels of page scroll.
  const step = (dir: number) => scrollByY((dir * distance) / steps);

  return (
    <div
      id="reseaux"
      ref={trackRef}
      className="relative font-editorial bg-[#fffef7] text-black"
      style={{ height: stickyHeight ? stickyHeight + distance : undefined }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center gap-8 py-16"
      >
        <div className="px-5 sm:px-8 flex items-end justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-6">
            <div className="text-caption uppercase text-[#666666]">{ui.social}</div>
            <div className="text-heading max-w-[22ch]">{ui.videosLabel}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-caption uppercase text-[#666666] whitespace-nowrap">
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

        <motion.div ref={railRef} style={{ x }} className="flex gap-6 w-max px-5 sm:px-8">
          {items.map((item) => {
            const Icon = item.kind === "site" ? Globe : Play;
            const isYoutube = item.kind === "youtube";
            const content = (
              <>
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
                  <div className="absolute left-4 top-4 text-caption uppercase text-[#fffef7] border border-[#fffef773] rounded-full px-3 py-1.5">
                    {platformLabel(item)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 text-caption uppercase text-[#666666]">
                  {platformLabel(item)}
                  {!isYoutube && <ExternalLink className="w-3.5 h-3.5" />}
                </div>
              </>
            );
            const className = "group relative flex-none flex flex-col gap-4 text-left";
            // Width is capped by the pinned viewport height so the whole card,
            // header and progress bar always fit on one screen.
            const style = {
              width: "min(72vw, 300px, calc((100svh - 356px) * 0.5625))",
            } as const;

            return isYoutube ? (
              <button key={itemKey(item)} onClick={() => setOpenVideo(item)} className={className} style={style}>
                {content}
              </button>
            ) : (
              <a
                key={itemKey(item)}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                style={style}
              >
                {content}
              </a>
            );
          })}
        </motion.div>

        <div className="px-5 sm:px-8 flex items-center gap-2">
          <div className="flex-1 h-px bg-[#e8e6dd] relative">
            <motion.div
              className="absolute left-0 top-0 h-px bg-black"
              style={{ width: progressWidth }}
            ></motion.div>
          </div>
          <div className="text-caption uppercase text-[#666666] whitespace-nowrap">{ui.swipeHint}</div>
        </div>
      </div>

      {openVideo && (
        <VideoLightbox videoId={openVideo.id} watchUrl={openVideo.url} onClose={() => setOpenVideo(null)} />
      )}
    </div>
  );
}
