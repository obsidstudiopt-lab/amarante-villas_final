import { useLang } from "../../i18n/LanguageContext";
import { siteContent } from "../../data/siteContent";
import { Reveal } from "./Reveal";

export const InfoServices = ({ property }) => {
  const { t, lang } = useLang();
  const c = siteContent[lang];
  const services = (property?.services || []).map((s) => s[lang] || s.pt).filter(Boolean);

  return (
    <section data-testid="info-services" className="bg-sand py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-sage mb-12">{t.infoEyebrow}</p>
        </Reveal>
        <div className={`grid grid-cols-1 ${services.length ? "md:grid-cols-2" : "md:grid-cols-1 max-w-3xl"} gap-16 md:gap-24`}>
          <Reveal>
            <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{t.rulesTitle}</h3>
            <ul className="space-y-4 border-t border-black/10 pt-6">
              {c.rules.map((r, i) => (
                <li key={i} className="text-base leading-relaxed text-mutedink border-b border-black/5 pb-4">{r}</li>
              ))}
            </ul>
          </Reveal>
          {services.length > 0 && (
            <Reveal delay={0.1}>
              <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-8">{t.servicesTitle}</h3>
              <ul className="space-y-4 border-t border-black/10 pt-6">
                {services.map((s, i) => (
                  <li key={i} className="text-base leading-relaxed text-mutedink border-b border-black/5 pb-4">{s}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};
