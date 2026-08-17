import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();
  const [firstName, ...rest] = t.name.split(" ");
  const lastName = rest.join(" ");

  const freelanceLine = `${t.contact.location} — ${t.experience[0].company} ${t.experience[0].period.toLowerCase()}`;
  const tagsLine = [t.skills[3].category, t.skills[4].category, t.skills[0].category].join(" · ");

  return (
    <section className="font-editorial font-light bg-[#fffef7] text-black px-5 sm:px-8 pt-16 sm:pt-24 md:pt-28 pb-16 flex flex-col gap-12">
      <h1 className="text-[clamp(3.5rem,11vw,9.25rem)] font-light leading-[0.92] tracking-[-0.04em] m-0">
        {firstName}
        <br />
        {lastName}
      </h1>
      <div className="grid gap-12 items-end" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}>
        <div className="text-xl font-light leading-relaxed max-w-[34ch] text-pretty">
          {t.description}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs font-normal uppercase text-[#666666]">{freelanceLine}</div>
          <div className="h-px bg-[#aaaaaa]"></div>
          <div className="text-xs font-normal uppercase text-[#666666]">{tagsLine}</div>
        </div>
      </div>
    </section>
  );
}
