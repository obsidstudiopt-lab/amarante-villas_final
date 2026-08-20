import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { mediaUrl } from "../../lib/api";

export const Lightbox = ({ images, index, setIndex }) => {
  const open = index !== null && index >= 0;
  const close = useCallback(() => setIndex(null), [setIndex]);
  const prev = useCallback((e) => { e?.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length); }, [images.length, setIndex]);
  const next = useCallback((e) => { e?.stopPropagation(); setIndex((i) => (i + 1) % images.length); }, [images.length, setIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div data-testid="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={close} className="fixed inset-0 z-[70] bg-charcoal/97 flex items-center justify-center p-4 md:p-12">
          <button data-testid="lightbox-close" onClick={close} aria-label="Fechar" className="absolute top-6 right-6 text-ivory/70 hover:text-ivory z-10"><X strokeWidth={1.2} size={30} /></button>
          {images.length > 1 && (
            <>
              <button data-testid="lightbox-prev" onClick={prev} aria-label="Anterior" className="absolute left-3 md:left-10 text-ivory/60 hover:text-ivory z-10"><ChevronLeft strokeWidth={1} size={40} /></button>
              <button data-testid="lightbox-next" onClick={next} aria-label="Seguinte" className="absolute right-3 md:right-10 text-ivory/60 hover:text-ivory z-10"><ChevronRight strokeWidth={1} size={40} /></button>
            </>
          )}
          <AnimatePresence mode="wait">
            <motion.img key={index} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              src={mediaUrl(images[index])} alt="" onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full object-contain" />
          </AnimatePresence>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/50 text-xs tracking-[0.25em]">{index + 1} / {images.length}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
