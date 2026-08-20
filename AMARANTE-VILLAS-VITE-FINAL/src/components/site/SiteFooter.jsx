import { Link } from "react-router-dom";
import { site } from "../../config";
import { useLang } from "../../i18n/LanguageContext";

export const SiteFooter = () => {
  const { t } = useLang();
  return (
    <footer data-testid="site-footer" className="bg-charcoal text-ivory/60 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link to="/" className="font-serif text-2xl text-ivory tracking-tight">{site.brand}</Link>
          <div className="text-xs uppercase tracking-[0.2em] mt-3">Amarante, Portugal</div>
        </div>
        <div className="space-y-2 text-sm">
          <a href={`mailto:${site.email}`} className="block hover:text-ivory transition" data-testid="footer-email">{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="block hover:text-ivory transition" data-testid="footer-phone">{site.phone}</a>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] md:justify-end h-fit">
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-instagram" className="hover:text-ivory transition">Instagram</a>
          <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-facebook" className="hover:text-ivory transition">Facebook</a>
          <a href={site.linktreeUrl} target="_blank" rel="noopener noreferrer" data-testid="footer-linktree" className="hover:text-ivory transition">Linktree</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10 text-[11px] tracking-[0.15em] text-ivory/40">
        © {new Date().getFullYear()} {site.brand}. {t.footer.rights}
      </div>
    </footer>
  );
};
