import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t, ui } = useLanguage();

  return (
    <footer className="font-editorial bg-[#fffef7] text-black">
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-12 px-5 sm:px-8 py-16"
      >
        <div className="text-caption uppercase text-fluo">{ui.contact}</div>

        <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
          <div className="text-heading max-w-[18ch]">
            {ui.startProject}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="text-subheading">{t.name}</div>
              <div className="text-body-sm text-[#666666]">
                {t.title} — {t.subtitle}
              </div>
              <div className="text-body-sm">{t.contact.phone}</div>
            </div>
            <div className="flex gap-2 flex-wrap print:hidden">
              <a
                href={`mailto:${t.contact.email}`}
                className="text-body text-[#fffef7] bg-black rounded-full px-6 py-3"
              >
                {t.contact.email}
              </a>
              <a
                href={t.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body border border-[#aaaaaa] hover:border-black rounded-full px-6 py-3"
              >
                LinkedIn
              </a>
              <a
                href={t.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body border border-[#aaaaaa] hover:border-black rounded-full px-6 py-3"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="border-t border-[#aaaaaa] px-5 sm:px-8 py-6 text-caption uppercase text-[#666666]">
        © OL Creative Design —{" "}
        <a
          href="https://www.google.com/maps/@43.6180419,1.4366606,3a,75y,258.99h,90t/data=!3m7!1e1!3m5!1siHg9kulbr2lOLcxFxLxiTQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DiHg9kulbr2lOLcxFxLxiTQ%26yaw%3D258.99!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          {t.contact.location}
        </a>
      </div>
    </footer>
  );
}
