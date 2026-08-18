import { useLanguage } from "../context/LanguageContext";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => (w === "ia" || w === "ai" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function withNoBreak(str: string) {
  return str.replace(/ /g, " ");
}

export function Hero() {
  const { t } = useLanguage();
  const [titleLine1, titleLine2] = t.title.split(" / ");

  const freelanceLine = `${t.contact.location} — ${t.experience[0].company} ${t.experience[0].period.toLowerCase()}`;

  return (
    <section className="font-editorial bg-[#fffef7] text-black px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 flex flex-col gap-6">
      <h1 className="text-display m-0">
        {toTitleCase(titleLine1)}
        <br />
        {withNoBreak(toTitleCase(titleLine2))}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="h-px bg-[#aaaaaa]"></div>
        <div className="text-caption uppercase text-[#666666]">{t.subtitle}</div>
      </div>
      <div className="grid gap-12 items-end mt-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
        <div className="text-subheading max-w-[34ch] text-pretty">
          {t.description}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-caption uppercase text-[#666666]">{freelanceLine}</div>
          <div className="h-px bg-[#aaaaaa]"></div>
        </div>
      </div>
    </section>
  );
}
