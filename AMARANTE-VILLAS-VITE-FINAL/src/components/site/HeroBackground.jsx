import { useEffect, useRef, useState } from "react";

function parse(url) {
  if (!url) return null;
  if (/\.(mp4|webm|m4v)(\?.*)?$/i.test(url)) return { type: "local", url };
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  if (yt) return { type: "youtube", id: yt[1] };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { type: "vimeo", id: vm[1] };
  return null;
}

export const HeroBackground = ({ videoUrl, poster }) => {
  const info = parse(videoUrl);
  const [ready, setReady] = useState(false);
  const mountRef = useRef(null);

  useEffect(() => {
    setReady(false);
    if (!info || info.type !== "youtube") return;
    let player;
    let cancelled = false;

    const create = () => {
      if (cancelled || !mountRef.current) return;
      player = new window.YT.Player(mountRef.current, {
        videoId: info.id,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1, playlist: info.id, controls: 0,
          modestbranding: 1, rel: 0, showinfo: 0, iv_load_policy: 3,
          disablekb: 1, fs: 0, playsinline: 1,
        },
        events: {
          onReady: (e) => { try { e.target.mute(); e.target.playVideo(); } catch (x) {} },
          onStateChange: (e) => { if (e.data === 1) setReady(true); },
        },
      });
    };

    if (window.YT && window.YT.Player) create();
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); create(); };
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(s);
      }
    }
    return () => { cancelled = true; try { player && player.destroy && player.destroy(); } catch (x) {} };
  }, [videoUrl]);

  return (
    <>
      <div
        className={`absolute inset-0 bg-cover bg-center animate-kenburns transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />

      {info?.type === "local" && (
        <video
          src={info.url}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        />
      )}

      {info && info.type !== "local" && (
        <div className={`hero-video-cover transition-opacity duration-1000 ${ready || info.type === "vimeo" ? "opacity-100" : "opacity-0"}`} aria-hidden>
          {info.type === "youtube" ? (
            <div ref={mountRef} />
          ) : (
            <iframe
              title="hero video"
              src={`https://player.vimeo.com/video/${info.id}?background=1&autoplay=1&loop=1&muted=1`}
              allow="autoplay; fullscreen"
              tabIndex={-1}
            />
          )}
        </div>
      )}
    </>
  );
};
