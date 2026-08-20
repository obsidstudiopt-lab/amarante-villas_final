import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { mediaUrl, embedUrl, whatsappHref } from "../lib/api";
import { getPropertyBySlug } from "../data/properties";
import { useLang, pick } from "../i18n/LanguageContext";
import { PublicNav } from "../components/site/PublicNav";
import { SiteFooter } from "../components/site/SiteFooter";
import { ContactSection } from "../components/site/ContactSection";
import { Lightbox } from "../components/site/Lightbox";
import { HeroBackground } from "../components/site/HeroBackground";
import { InfoServices } from "../components/site/InfoServices";
import { Reveal, MaskedLines } from "../components/site/Reveal";

export default function PropertyPage() {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const [p, setP] = useState(() => getPropertyBySlug(slug));
  const [lb, setLb] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setP(getPropertyBySlug(slug));
  }, [slug]);

  if (p === undefined)
    return <div className="min-h-screen bg-ivory flex items-center justify-center font-serif text-2xl text-charcoal/50">…</div>;

  if (p === null)
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center gap-6">
        <p className="font-serif text-3xl">{t.notFound}</p>
        <Link to="/" className="text-xs uppercase tracking-[0.25em] border-b border-charcoal/40 pb-1">{t.allProperties}</Link>
      </div>
    );

  const facts = [
    { v: p.guests, l: t.facts.guests },
    { v: p.bedrooms, l: t.facts.bedrooms },
    { v: p.bathrooms, l: t.facts.bathrooms },
  ].filter((f) => f.v);
  const highlights = (p.highlights || []).filter((h) => pick(h, "title", lang));
  const amenities = (p.amenities || []).filter((a) => (a[lang] || a.pt));
  const gallery = p.gallery || [];
  const wa = p.whatsapp ? whatsappHref(p.whatsapp, t.whatsappMessage(p.name)) : null;
  const isLocalVideo = /\.(mp4|webm|m4v)(\?.*)?$/i.test(p.video_url || "");
  const video = isLocalVideo ? p.video_url : embedUrl(p.video_url, { background: false });
  const layout = p.layout?.[lang] || p.layout?.pt || [];
  const mapSrc = p.map_query
    ? `https://www.google.com/maps?q=${encodeURIComponent(p.map_query)}&output=embed`
    : "";

  return (
    <div className="bg-ivory">
      <PublicNav />

      {/* Hero */}
      <section id="top" data-testid="property-hero" className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
        <HeroBackground videoUrl={p.video_url} poster={mediaUrl(p.hero_image)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
            className="text-ivory/80 text-xs uppercase tracking-[0.3em] mb-6">{pick(p, "location", lang)}</motion.p>
          <h1 className="font-serif text-ivory text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl">
            <MaskedLines lines={[p.name]} delay={0.3} />
          </h1>
          {pick(p, "tagline", lang) && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
              className="text-ivory/75 text-base md:text-lg max-w-xl mt-6 font-light">{pick(p, "tagline", lang)}</motion.p>
          )}
          {wa && (
            <motion.a href={wa} target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="mt-10 inline-flex items-center text-xs uppercase tracking-[0.25em] px-8 py-4 border border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal transition w-fit">
              {t.cta}
            </motion.a>
          )}
        </div>
      </section>

      {/* Intro + facts */}
      <section data-testid="property-intro" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <Reveal className="md:col-span-7">
            {pick(p, "tagline", lang) && <p className="text-xs uppercase tracking-[0.25em] text-sage mb-8">{pick(p, "tagline", lang)}</p>}
            <p className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] leading-[1.3] tracking-tight text-charcoal max-w-2xl">
              {pick(p, "description", lang)}
            </p>
            {amenities.length > 0 && (
              <div data-testid="property-amenities" className="flex flex-wrap gap-3 mt-10">
                {amenities.map((a, i) => (
                  <span key={i} className="text-[11px] uppercase tracking-[0.2em] text-charcoal/80 border border-black/15 rounded-full px-4 py-2">
                    {a[lang] || a.pt}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
          {facts.length > 0 && (
            <Reveal delay={0.12} className="md:col-span-4 md:col-start-9 self-center">
              <div className="flex md:flex-col divide-x md:divide-x-0 md:divide-y divide-black/10 border-y md:border-y border-black/10">
                {facts.map((fct) => (
                  <div key={fct.l} className="flex-1 py-6 md:py-6 px-4 md:px-0 text-center md:flex md:items-baseline md:justify-between md:text-left">
                    <span className="font-serif text-4xl md:text-5xl tracking-tight">{fct.v}</span>
                    <span className="block md:inline text-[10px] md:text-xs uppercase tracking-[0.2em] text-mutedink mt-2 md:mt-0">{fct.l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Layout / sleeping arrangement */}
      {layout.length > 0 && (
        <section data-testid="property-layout" className="pb-24 md:pb-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-sage mb-8">{lang === "en" ? "Inside the villa" : "Por dentro"}</p>
            </Reveal>
            <div className={`grid grid-cols-1 ${layout.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-3xl"} gap-8 md:gap-12`}>
              {layout.map((block, i) => (
                <Reveal key={block.title} delay={i * 0.08}>
                  <div className="border-t border-black/15 pt-7">
                    <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">{block.title}</h3>
                    <ul className="space-y-3 text-mutedink leading-relaxed">
                      {block.items.map((item) => <li key={item} className="border-b border-black/5 pb-3">{item}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <section data-testid="property-highlights" className="bg-sand py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {highlights.map((h, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <span className="font-serif text-2xl text-sage">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-3xl md:text-4xl tracking-tight mt-3 mb-4">{pick(h, "title", lang)}</h3>
                <p className="text-base leading-relaxed text-mutedink">{pick(h, "body", lang)}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Video */}
      {video && (
        <section data-testid="property-video" className="py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-sage mb-8">{t.videoEyebrow}</p>
              <div className="relative w-full overflow-hidden bg-charcoal" style={{ aspectRatio: "16 / 9" }}>
                {isLocalVideo ? (
                  <video
                    src={video}
                    poster={mediaUrl(p.hero_image)}
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <iframe title={`${p.name} vídeo`} src={video} className="absolute inset-0 w-full h-full" loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section id="galeria" data-testid="property-gallery" className="bg-stone py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-16">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight">{t.galleryTitle}</h2>
                <span className="text-xs uppercase tracking-[0.25em] text-mutedink hidden sm:block">{gallery.length} {t.galleryCount}</span>
              </div>
            </Reveal>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6">
              {gallery.map((img, i) => (
                <Reveal key={i} delay={(i % 3) * 0.08} className="mb-5 md:mb-6 break-inside-avoid">
                  <button onClick={() => setLb(i)} data-testid={`gallery-item-${i}`} className="block w-full overflow-hidden group cursor-pointer">
                    <img src={mediaUrl(img)} alt={`${p.name} ${i + 1}`} loading="lazy"
                      className="w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
          <Lightbox images={gallery} index={lb} setIndex={setLb} />
        </section>
      )}

      {/* Location */}
      {mapSrc && (
        <section id="localizacao" data-testid="property-location" className="py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-sage mb-6">{t.locationEyebrow}</p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight mb-8">{t.locationTitle}</h2>
              <p className="text-base md:text-lg leading-relaxed text-mutedink max-w-md">{pick(p, "location", lang)}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden border border-black/10">
                <iframe title="Mapa" data-testid="location-map" src={mapSrc} className="w-full h-full grayscale-[0.4] contrast-[1.05]" loading="lazy" style={{ border: 0 }} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Final CTA band */}
      <section data-testid="property-final-cta" className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${mediaUrl(gallery[gallery.length - 1] || p.hero_image)})` }} aria-hidden />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-ivory text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-3xl leading-[1.1]">
            {lang === "en" ? "Your next stay begins here." : "A sua próxima estadia começa aqui."}
          </motion.h2>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" data-testid="final-cta-button"
              className="mt-10 inline-flex items-center text-xs uppercase tracking-[0.25em] px-10 py-4 bg-ivory text-charcoal hover:bg-ivory/85 transition">{t.cta}</a>
          )}
        </div>
      </section>

      <InfoServices property={p} />
      <ContactSection property={p} />
      <SiteFooter />
    </div>
  );
}
