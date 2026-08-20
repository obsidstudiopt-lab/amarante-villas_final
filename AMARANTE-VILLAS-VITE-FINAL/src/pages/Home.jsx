import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { mediaUrl } from "../lib/api";
import { properties } from "../data/properties";
import { useLang, pick } from "../i18n/LanguageContext";
import { site } from "../config";
import { PublicNav } from "../components/site/PublicNav";
import { SiteFooter } from "../components/site/SiteFooter";
import { ContactSection } from "../components/site/ContactSection";
import { Reveal, MaskedLines } from "../components/site/Reveal";
import { siteContent } from "../data/siteContent";
import { HeroBackground } from "../components/site/HeroBackground";

export default function Home() {
  const { t, lang } = useLang();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, [location, properties]);

  return (
    <div className="bg-ivory">
      <PublicNav />

      {/* Hero */}
      <section id="top" data-testid="home-hero" className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
        <HeroBackground videoUrl={site.homeHeroVideo} poster={site.homeHero} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
            className="text-ivory/80 text-xs uppercase tracking-[0.3em] mb-6">{t.homeEyebrow}</motion.p>
          <h1 className="font-serif text-ivory text-[3rem] leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl">
            <MaskedLines lines={t.homeTitle} delay={0.35} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
            className="text-ivory/70 text-base md:text-lg max-w-xl mt-8 font-light">{t.homeSub}</motion.p>
          <motion.a href="#propriedades" data-testid="home-hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            className="group inline-flex items-center gap-3 text-ivory text-xs uppercase tracking-[0.25em] w-fit mt-10">
            <span className="border-b border-ivory/40 pb-1 group-hover:border-ivory transition">{t.nav.properties}</span>
          </motion.a>
        </div>
      </section>

      {/* Story */}
      <section data-testid="home-story" className="py-24 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.25em] text-sage mb-8">{t.storyEyebrow}</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-12">{t.storyTitle}</h2>
          </Reveal>
          <div className="space-y-6">
            {siteContent[lang].story.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg md:text-xl leading-relaxed text-mutedink">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Properties list */}
      <section id="propriedades" data-testid="properties-section" className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-16 md:mb-24">{t.propertiesTitle}</h2>
          </Reveal>
          <div className="flex flex-col gap-20 md:gap-32">
            {properties.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={p.id}>
                  <Link to={`/propriedade/${p.slug}`} data-testid={`property-card-${p.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
                    <div className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
                      <div className="overflow-hidden">
                        <img src={mediaUrl(p.hero_image)} alt={p.name} loading="lazy"
                          className="w-full h-[55vh] md:h-[70vh] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                      </div>
                    </div>
                    <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
                      <p className="text-xs uppercase tracking-[0.25em] text-sage mb-4">{pick(p, "location", lang)}</p>
                      <h3 className="font-serif text-4xl md:text-5xl tracking-tight mb-5">{p.name}</h3>
                      <p className="text-base md:text-lg leading-relaxed text-mutedink max-w-md mb-8">{pick(p, "tagline", lang) || pick(p, "description", lang)}</p>
                      <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-charcoal">
                        <span className="border-b border-charcoal/30 pb-1 group-hover:border-charcoal transition">{t.explore}</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ContactSection property={null} />
      <SiteFooter />
    </div>
  );
}
