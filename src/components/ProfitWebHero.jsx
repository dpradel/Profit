import { useEffect, useRef } from "react";
import { Button } from "./Button.jsx";

const VIDEO_SRC = `${import.meta.env.BASE_URL || "/"}profitweb-banner-notebook-old.webm`;

export function ProfitWebHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const entranceRaf = requestAnimationFrame(() => el.classList.add("is-visible"));

    const isMobile = window.innerWidth <= 900;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mobile / reduced motion: play the opening once instead of scrubbing
    if (isMobile || prefersReducedMotion) {
      const playObs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            video.play().catch(() => {});
            playObs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      playObs.observe(el);
      return () => {
        cancelAnimationFrame(entranceRaf);
        playObs.disconnect();
      };
    }

    const copy = el.querySelector(".pw-hero-copy");
    const frame = el.querySelector(".pw-hero-video-frame");

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    let duration = 0;
    const onMeta = () => { duration = video.duration || 0; };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    let smooth = 0;
    let rafId;

    function tick() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      const raw = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

      smooth = lerp(smooth, raw, 0.12);

      if (duration > 0 && video.readyState >= 2) {
        const t = smooth * duration;
        if (Math.abs(video.currentTime - t) > 0.005) video.currentTime = t;
      }

      if (copy) {
        const cp = clamp(smooth / 0.4, 0, 1);
        copy.style.opacity = String(1 - cp);
        copy.style.transform = `translateY(${cp * -44}px)`;
        copy.style.filter = `blur(${cp * 8}px)`;
        copy.style.pointerEvents = cp > 0.5 ? "none" : "";
      }

      if (frame) {
        frame.style.transform = `scale(${0.92 + smooth * 0.08})`;
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(entranceRaf);
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <section className="pw-hero" ref={sectionRef}>
      <div className="pw-hero-stage">
        <div className="pw-hero-bg" aria-hidden="true" />
        <div className="pw-hero-blob pw-hero-blob-a" aria-hidden="true" />
        <div className="pw-hero-blob pw-hero-blob-b" aria-hidden="true" />
        <div className="pw-hero-grid" aria-hidden="true" />

        <div className="pw-hero-copy">
          <h1 className="pw-hero-title">
            Profit <span className="pw-hero-title-accent">Web</span>
          </h1>
          <p className="pw-hero-subtitle">
            Mais leve, mais rápido e mais eficiente que nunca.
          </p>
          <div className="pw-hero-cta">
            <Button href="#acesso" variant="gradient">Acesse agora pelo seu navegador</Button>
          </div>
        </div>

        <div className="pw-hero-video-frame">
          <div className="pw-hero-video-glow" aria-hidden="true" />
          <video
            ref={videoRef}
            className="pw-hero-video"
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
}
