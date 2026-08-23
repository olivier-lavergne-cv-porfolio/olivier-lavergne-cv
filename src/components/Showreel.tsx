import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { mainVideo, thumbUrl } from "../media";
import { VideoLightbox } from "./VideoLightbox";

export function Showreel() {
  const { ui } = useLanguage();
  const BASE = import.meta.env.BASE_URL;
  const containerRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const [open, setOpen] = useState(false);

  return (
    <section className="font-editorial bg-[#fffef7] pb-8">
      <div className="px-5 sm:px-8 flex flex-col gap-3 mb-8">
        <div className="text-caption uppercase text-[#666666]">{ui.videosLabel}</div>
        <div className="text-heading max-w-[22ch]">{ui.showreelSubtitle}</div>
      </div>

      <button
        ref={containerRef}
        onClick={() => setOpen(true)}
        className="group relative block w-full aspect-video overflow-hidden bg-[#fffef7] text-left"
        style={{ minHeight: "340px" }}
      >
        <motion.img
          src={thumbUrl(mainVideo, BASE)}
          alt=""
          loading="lazy"
          style={{ y }}
          className="absolute -top-[12%] left-0 w-full h-[124%] object-cover"
        />

        <div className="absolute right-5 sm:right-8 top-5 sm:top-8 text-caption uppercase text-[#fffef7] border border-[#fffef799] rounded-full px-6 py-3 group-hover:border-[#fffef7]">
          {ui.play}
        </div>
      </button>

      {open && (
        <VideoLightbox videoId={mainVideo.id} watchUrl={mainVideo.url} onClose={() => setOpen(false)} />
      )}
    </section>
  );
}
