// Static-site helpers. No backend or Emergent runtime dependency.
export const mediaUrl = (u) => u || "";

export const embedUrl = (url, { background = false } = {}) => {
  if (!url) return "";
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (yt) {
    const id = yt[1];
    const p = background
      ? `autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&color=white`
      : `rel=0&modestbranding=1`;
    return `https://www.youtube.com/embed/${id}?${p}`;
  }
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    const id = vm[1];
    const p = background ? `background=1&autoplay=1&loop=1&muted=1` : `title=0&byline=0&portrait=0`;
    return `https://player.vimeo.com/video/${id}?${p}`;
  }
  return url;
};

export const whatsappHref = (phone, message) => {
  const clean = (phone || "").replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
};
