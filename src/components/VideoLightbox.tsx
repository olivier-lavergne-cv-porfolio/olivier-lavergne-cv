import { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Props =
  | { kind: "youtube"; videoId: string; watchUrl: string; onClose: () => void }
  | { kind: "instagram"; reelId: string; watchUrl: string; onClose: () => void };

export function VideoLightbox(props: Props) {
  const { ui } = useLanguage();
  const { onClose, watchUrl, kind } = props;

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

  const platformLabel = kind === "youtube" ? "YouTube" : "Instagram";

  return (
    <div
      className="font-editorial fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`w-full flex flex-col gap-3 ${kind === "youtube" ? "max-w-4xl" : "max-w-sm"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end gap-6">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-caption uppercase text-[#fffef7] hover:opacity-70"
          >
            {ui.watchOn} {platformLabel}
          </a>
          <button onClick={onClose} aria-label="Close" className="text-[#fffef7] hover:opacity-70">
            <X className="w-5 h-5" />
          </button>
        </div>

        {kind === "youtube" ? (
          <div className="w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <iframe
            src={`https://www.instagram.com/reel/${props.reelId}/embed/captioned`}
            title="Instagram reel"
            allow="clipboard-write; encrypted-media; picture-in-picture"
            className="w-full bg-[#fffef7]"
            style={{ height: "680px", maxHeight: "80vh" }}
          ></iframe>
        )}
      </div>
    </div>
  );
}
