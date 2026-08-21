import { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function VideoLightbox({
  videoId,
  watchUrl,
  onClose,
}: {
  videoId: string;
  watchUrl: string;
  onClose: () => void;
}) {
  const { ui } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="font-editorial fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-6">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption uppercase text-[#fffef7] hover:opacity-70"
          >
            {ui.watchOn} YouTube
          </a>
          <button onClick={onClose} aria-label="Close" className="text-[#fffef7] hover:opacity-70">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
