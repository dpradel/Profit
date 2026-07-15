import { useEffect, useRef } from "react";
import { heroIntro, umbrelPro } from "../data/siteData.jsx";
import { ButtonRow } from "./Button.jsx";
import { HeroTradingInterface } from "./HeroTradingInterface.jsx";

const WAVE_LAYERS = [
  { amp: 24, freq: 0.009,  speed: 0.18, fill: "rgba(20,20,90,.14)",  stroke: "60,75,235",  sa: 0.24 },
  { amp: 32, freq: 0.007,  speed: 0.24, fill: "rgba(24,24,110,.20)", stroke: "65,85,245", sa: 0.32 },
  { amp: 40, freq: 0.0055, speed: 0.30, fill: "rgba(30,28,140,.28)", stroke: "50,90,255", sa: 0.44 },
];
const LAYER_H      = [320, 220, 145];   // canvas height of each wave layer (px)
const LAYER_SINK   = [55,  108, 165];   // how far each layer sinks at p=1 (px)

function drawWaveLayer(ctx, W, H, opts, t) {
  const { amp, freq, speed, fill, stroke, sa } = opts;
  const crestY = amp * 1.1;

  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 2) {
    ctx.lineTo(x, crestY + Math.sin(x * freq + t * speed) * amp * 0.7);
  }
  ctx.lineTo(W, H);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, fill);
  grad.addColorStop(1, fill.replace(/[\d.]+\)$/, "0)"));
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  for (let x = 0; x <= W; x += 2) {
    const y = crestY + Math.sin(x * freq + t * speed) * amp * 0.7;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(${stroke},${sa})`;
  ctx.lineWidth   = 1;
  ctx.stroke();
}

export function HeroIntro() {
  const sectionRef    = useRef(null);
  const waveCanvasRef = useRef(null);
  const bottomGlowRef = useRef(null);

  useEffect(() => {
    const el         = sectionRef.current;
    const canvas     = waveCanvasRef.current;
    const bottomGlow = bottomGlowRef.current;
    if (!el) return;

    // Trigger entrance animations
    const entranceRaf = requestAnimationFrame(() => el.classList.add("is-visible"));

    // Skip scroll-driven parallax on mobile/reduced-motion — CSS already falls back
    const isMobile            = window.innerWidth <= 900;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || prefersReducedMotion) {
      return () => cancelAnimationFrame(entranceRaf);
    }

    const stage = el.querySelector(".hero-stage");
    const shell = el.querySelector(".hero-interface-shell");
    const glow  = el.querySelector(".hero-interface-glow");
    const copy  = el.querySelector(".hero-copy-wrap");
    const blobA = el.querySelector(".hero-blob-a");
    const blobB = el.querySelector(".hero-blob-b");

    // Cache section top (measured once; stable since hero is first content)
    let sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const onResize = () => {
      sectionTop = el.getBoundingClientRect().top + window.scrollY;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Mouse tilt — listen on window so pointer-events:none on stage doesn't break it
    let mx = 0.5, my = 0.5;
    let tiltX = 0,  tiltY = 0;
    const onMouseMove = (ev) => {
      const r = stage.getBoundingClientRect();
      if (ev.clientX >= r.left && ev.clientX <= r.right &&
          ev.clientY >= r.top  && ev.clientY <= r.bottom) {
        mx = (ev.clientX - r.left) / r.width;
        my = (ev.clientY - r.top)  / r.height;
      } else {
        mx = 0.5; my = 0.5;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Helpers
    const lerp  = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const eOut  = (t) => 1 - (1 - t) ** 3;

    let prog  = 0;
    let clock = 0;
    let rafId;

    function tick() {
      clock += 0.016;

      // Scroll progress: 0 = top of section, 1 = pinned stage fully scrolled through
      const scrollInSection = window.scrollY - sectionTop;
      const maxScroll       = el.offsetHeight - window.innerHeight;
      const rawP            = maxScroll > 0 ? clamp(scrollInSection / maxScroll, 0, 1) : 0;
      prog                  = lerp(prog, rawP, 0.042);
      const p               = prog;

      // ── Wave layers ──────────────────────────────────────────────────────
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const W   = canvas.offsetWidth;
        const H   = canvas.offsetHeight;
        canvas.width  = W * dpr;
        canvas.height = H * dpr;
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, W, H);

        WAVE_LAYERS.forEach((opts, i) => {
          const layerH = LAYER_H[i];
          // Each layer anchored to bottom, sinking as p increases
          const offsetY = H - layerH + p * LAYER_SINK[i];
          ctx.save();
          ctx.translate(0, offsetY);
          drawWaveLayer(ctx, W, layerH, opts, clock);
          ctx.restore();
        });
      }

      // ── Mouse tilt ───────────────────────────────────────────────────────
      tiltX = lerp(tiltX, (my - 0.5) *  7.0, 0.07);
      tiltY = lerp(tiltY, (mx - 0.5) * -7.0, 0.07);

      // ── Interface rise (pure translateY — no fade) ────────────────────────
      const ip        = eOut(clamp((p - 0.04) / 0.96, 0, 1));
      const vh        = window.innerHeight;
      // At rest, only the top 1% of the shell peeks above the viewport bottom
      // as a hint that the interface continues below — the rest rises into
      // view as the user scrolls.
      const ifTYStart = vh * 0.5 + (shell ? shell.offsetHeight * 0.49 : vh * 0.495);
      const ifTY      = lerp(ifTYStart, vh * 0.05, ip);
      if (shell) {
        shell.style.transform =
          `translateY(${ifTY}px) perspective(1100px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      // ── Glow brightens on scroll ─────────────────────────────────────────
      if (glow) {
        glow.style.filter = `blur(80px) brightness(${1 + p * 0.65})`;
      }

      // ── Copy rises + fades + blurs ───────────────────────────────────────
      const cp_ = clamp(p / 0.65, 0, 1);
      if (copy) {
        copy.style.transform =
          `translateX(-50%) translateY(calc(-54% - ${eOut(cp_) * 48}px))`;
        copy.style.opacity = String(Math.max(0, 1 - cp_ * 1.1));
        copy.style.filter  = `blur(${eOut(cp_) * 10}px)`;
      }

      // ── Bottom glow — pulses + brightens as interface rises ─────────────────
      if (bottomGlow) {
        const pulse = 0.82 + Math.sin(clock * 1.1) * 0.18;
        bottomGlow.style.opacity = String((0.7 + ip * 0.3) * pulse);
      }

      // ── Blobs drift (existing behaviour preserved) ────────────────────────
      if (blobA) {
        blobA.style.transform =
          `translateY(${p * vh * 0.12}px) scale(${1 + p * 0.15})`;
      }
      if (blobB) {
        blobB.style.transform =
          `translateY(${-p * vh * 0.08}px) translateX(${p * vh * 0.03}px)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(entranceRaf);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="hero-intro" id="comece" ref={sectionRef}>
      <div className="hero-stage">
        <div className="hero-stage-bg" aria-hidden="true" />
        <div className="hero-blob hero-blob-a" aria-hidden="true" />
        <div className="hero-blob hero-blob-b" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <canvas className="hero-waves" ref={waveCanvasRef} aria-hidden="true" />
        <div className="hero-bottom-glow" ref={bottomGlowRef} aria-hidden="true" />

        {/* copy + CTAs — centered, z-index 30, fades on scroll */}
        <div className="hero-copy-wrap">
          <div className="hero-copy">
            <h1>
              <span>{heroIntro.titleLead}</span>{" "}
              <strong className="profit-wordmark">
                <span className="profit-accent">{heroIntro.titleAccent}</span>
                {heroIntro.titleRest}
              </strong>
            </h1>
            <p>{heroIntro.subtitle}</p>
          </div>
          <ButtonRow actions={umbrelPro.actions} className="hero-actions" />
        </div>

        {/* interface — absolutely centered via flex, rises from below viewport */}
        <div className="hero-platform-visual" aria-hidden="true">
          <HeroTradingInterface />
        </div>
      </div>
    </section>
  );
}
