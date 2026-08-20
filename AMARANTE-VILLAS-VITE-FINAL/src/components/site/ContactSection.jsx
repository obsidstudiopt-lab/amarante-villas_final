import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { whatsappHref } from "../../lib/api";
import { site } from "../../config";
import { useLang, pick } from "../../i18n/LanguageContext";
import { Reveal } from "./Reveal";

export const ContactSection = ({ property }) => {
  const { t, lang } = useLang();
  const f = t.form;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error(f.fillToast);
    const targetEmail = property?.email || site.email;
    const subject = encodeURIComponent(`${property?.name ? property.name + " — " : ""}Pedido de contacto`);
    const body = encodeURIComponent(`Nome: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const wa = property?.whatsapp
    ? whatsappHref(property.whatsapp, t.whatsappMessage(property.name))
    : null;

  return (
    <section id="contacto" data-testid="contact-section" className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-ivory/50 mb-8">{t.contactEyebrow}</p>
          <p className="font-serif text-3xl md:text-4xl leading-snug mb-12 max-w-md">{t.contactIntro}</p>
          <div className="space-y-4 text-sm text-ivory/70">
            {property?.email && <p data-testid="contact-email">Email · {property.email}</p>}
            {property?.instagram && <p data-testid="contact-instagram">Instagram · {property.instagram}</p>}
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp"
                className="inline-block mt-4 text-xs uppercase tracking-[0.25em] px-8 py-4 border border-ivory/40 hover:bg-ivory hover:text-charcoal transition">
                WhatsApp · {t.cta}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={onSubmit} data-testid="contact-form" className="space-y-8">
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-ivory/40">{f.name}</label>
              <input name="name" value={form.name} onChange={onChange} data-testid="contact-name-input"
                className="w-full bg-transparent border-b border-ivory/20 py-3 focus:border-ivory outline-none transition placeholder:text-ivory/30" placeholder={f.namePh} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-ivory/40">{f.email}</label>
              <input type="email" name="email" value={form.email} onChange={onChange} data-testid="contact-email-input"
                className="w-full bg-transparent border-b border-ivory/20 py-3 focus:border-ivory outline-none transition placeholder:text-ivory/30" placeholder={f.emailPh} />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] text-ivory/40">{f.message}</label>
              <textarea name="message" value={form.message} onChange={onChange} rows={4} data-testid="contact-message-input"
                className="w-full bg-transparent border-b border-ivory/20 py-3 focus:border-ivory outline-none transition resize-none placeholder:text-ivory/30" placeholder={f.messagePh} />
            </div>
            <button type="submit"  data-testid="contact-submit"
              className="w-full sm:w-auto text-xs uppercase tracking-[0.25em] px-10 py-4 border border-ivory/40 hover:bg-ivory hover:text-charcoal transition disabled:opacity-50">
              {f.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
