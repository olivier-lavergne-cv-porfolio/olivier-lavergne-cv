import { useLanguage } from "../context/LanguageContext";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "ia" || w === "ai" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

export function Hero() {
  const { t } = useLanguage();

  const freelanceLine = `${t.contact.location} — ${t.experience[0].company} ${t.experience[0].period.toLowerCase()}`;

  return (
    <section className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 flex flex-col gap-12">
      <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em] m-0">
        {toTitleCase(t.title)}
        <br />
        {toTitleCase(t.subtitle)}
      </h1>
      <div className="grid gap-12 items-end" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
        <div className="text-xl font-light leading-relaxed max-w-[34ch] text-pretty">
          {t.description}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs font-normal uppercase text-[#666666]">{freelanceLine}</div>
        </div>
      </div>
    </section>
  );
}
