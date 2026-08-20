import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "../../config";
import { useLang } from "../../i18n/LanguageContext";

const LangToggle = ({ dark }) => {
  const { lang, setLang } = useLang();
  const base = dark ? "text-charcoal" : "text-ivory";
  return (
    <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] ${base}`} data-testid="lang-toggle">
      <button data-testid="lang-pt" onClick={() => setLang("pt")}
        className={lang === "pt" ? "opacity-100" : "opacity-40 hover:opacity-70"}>PT</button>
      <span className="opacity-30">/</span>
      <button data-testid="lang-en" onClick={() => setLang("en")}
        className={lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}>EN</button>
    </div>
  );
};

export const PublicNav = ({ forceSolid = false }) => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = forceSolid || scrolled;
  const links = [
    { label: t.nav.properties, href: "/#propriedades" },
    { label: t.nav.contact, href: "#contacto" },
  ];

  return (
    <>
      <header data-testid="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          dark ? "bg-ivory/85 backdrop-blur-xl border-b border-black/5" : "bg-transparent border-b border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" data-testid="nav-logo"
            className={`font-serif text-xl md:text-2xl tracking-tight transition-colors duration-500 ${dark ? "text-charcoal" : "text-ivory"}`}>
            {site.brand}
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a key={l.href} href={l.href} data-testid={`nav-${l.label}`}
                className={`text-xs uppercase tracking-[0.2em] hover:opacity-60 transition ${dark ? "text-charcoal" : "text-ivory"}`}>
                {l.label}
              </a>
            ))}
            <LangToggle dark={dark} />
            <a href="#contacto" data-testid="nav-cta-desktop"
              className={`text-xs uppercase tracking-[0.2em] px-6 py-3 border transition-colors duration-500 ${
                dark ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory" : "border-ivory/70 text-ivory hover:bg-ivory hover:text-charcoal"
              }`}>
              {t.cta}
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-5">
            <LangToggle dark={dark} />
            <button data-testid="nav-menu-toggle" onClick={() => setOpen(true)} aria-label="Menu"
              className={dark ? "text-charcoal" : "text-ivory"}>
              <Menu strokeWidth={1.2} size={26} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div data-testid="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ivory flex flex-col">
            <div className="h-20 px-6 flex items-center justify-between border-b border-black/5">
              <span className="font-serif text-xl">{site.brand}</span>
              <button data-testid="mobile-menu-close" onClick={() => setOpen(false)} aria-label="Fechar"><X strokeWidth={1.2} size={26} /></button>
            </div>
            <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                  className="font-serif text-4xl py-3 border-b border-black/5">{l.label}</motion.a>
              ))}
              <a href="#contacto" onClick={() => setOpen(false)} data-testid="mobile-nav-cta"
                className="mt-8 text-center text-xs uppercase tracking-[0.2em] px-6 py-4 bg-charcoal text-ivory">{t.cta}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
