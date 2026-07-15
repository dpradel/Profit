import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";

const VIDEO_SRC = `${import.meta.env.BASE_URL || "/"}profitweb-banner-notebook.webm`;

// ------------------------------------------------------------------
// Variants. All pin the stage (sticky) for `pinVh` of scroll.
//   lerp    — 1 = direct 1:1 scrub (Apple-style), <1 = smoothing
//   curve   — progress remapping
//   endAt   — fraction of the pin where the video reaches its last
//             frame; the rest is a "hold" with the laptop centered
//   scale   — frame zoom from → to across the pin
// ------------------------------------------------------------------
const CURVES = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => 1 - (1 - t) * (1 - t),
  easeInOut: (t) => t * t * (3 - 2 * t),
};

const VARIANTS = {
  1: {
    name: "Apple classic",
    desc: "Long pin (350vh), direct 1:1 scrub, no smoothing, holds centered on the last 15%",
    pinVh: 350, lerp: 1, curve: "linear", endAt: 0.85,
    scaleFrom: 1, scaleTo: 1, copyFadeEnd: 0.3,
  },
  2: {
    name: "Smooth inertia",
    desc: "300vh pin, gentle lerp smoothing, subtle zoom-in while opening",
    pinVh: 300, lerp: 0.12, curve: "linear", endAt: 1.0,
    scaleFrom: 0.92, scaleTo: 1, copyFadeEnd: 0.4,
  },
  3: {
    name: "Cinematic ease",
    desc: "300vh pin, ease-in-out curve (slow start & landing), zoom past 100%",
    pinVh: 300, lerp: 0.18, curve: "easeInOut", endAt: 0.9,
    scaleFrom: 0.9, scaleTo: 1.05, copyFadeEnd: 0.35,
  },
  4: {
    name: "Quick + hold",
    desc: "260vh pin, animation completes at 60% then rests centered",
    pinVh: 260, lerp: 0.25, curve: "easeOut", endAt: 0.6,
    scaleFrom: 0.95, scaleTo: 1, copyFadeEnd: 0.3,
  },
};

const DEFAULT_STUDIO = {
  pinVh: 320, lerp: 1, curve: "linear", endAt: 0.85,
  scaleFrom: 0.94, scaleTo: 1, copyFadeEnd: 0.35,
};

// ------------------------------------------------------------------

function ScrollHero({ cfg }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const entranceRaf = requestAnimationFrame(() => el.classList.add("is-visible"));
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
      const c = cfgRef.current;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      const raw = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

      smooth = c.lerp >= 1 ? raw : lerp(smooth, raw, c.lerp);

      const eased = (CURVES[c.curve] || CURVES.linear)(smooth);
      const videoP = clamp(c.endAt > 0 ? eased / c.endAt : eased, 0, 1);

      if (duration > 0 && video.readyState >= 2) {
        const t = videoP * duration;
        if (Math.abs(video.currentTime - t) > 0.005) video.currentTime = t;
      }

      if (copy) {
        const cp = clamp(smooth / c.copyFadeEnd, 0, 1);
        copy.style.opacity = String(1 - cp);
        copy.style.transform = `translateY(${cp * -44}px)`;
        copy.style.filter = `blur(${cp * 8}px)`;
        copy.style.pointerEvents = cp > 0.5 ? "none" : "";
      }

      if (frame) {
        const s = c.scaleFrom + (c.scaleTo - c.scaleFrom) * eased;
        frame.style.transform = `scale(${s})`;
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
    <section
      className="pw-hero"
      ref={sectionRef}
      style={{ height: `${cfg.pinVh}vh` }}
    >
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

// ------------------------------------------------------------------
// Studio controls (variant 5)
// ------------------------------------------------------------------

function Row({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <span style={{ width: 78, color: "#9aa3b5", flexShrink: 0 }}>{label}</span>
      {children}
    </div>
  );
}

function NumSlider({ label, value, min, max, step, onChange, digits = 2 }) {
  const [text, setText] = useState(null);
  const commit = () => {
    if (text === null) return;
    const v = parseFloat(text);
    if (!Number.isNaN(v)) onChange(v);
    setText(null);
  };
  return (
    <Row label={label}>
      <input type="range" min={min} max={max} step={step} value={value}
        style={{ flex: 1, accentColor: "#38bdf8", minWidth: 0 }}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
      <input type="text"
        value={text ?? Number(value).toFixed(digits)}
        onFocus={(e) => { setText(String(value)); e.target.select(); }}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        style={{
          width: 48, flexShrink: 0, background: "#141a28", color: "#e6e9f0",
          border: "1px solid #2a3550", borderRadius: 4, fontSize: 11,
          fontFamily: "monospace", textAlign: "right", padding: "1px 3px",
        }} />
    </Row>
  );
}

function StudioControls({ cfg, setCfg }) {
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }));
  const copyConfig = () => navigator.clipboard.writeText(JSON.stringify(cfg, null, 2));

  return (
    <div style={{
      position: "fixed", bottom: 16, right: 16, zIndex: 9999, width: 300,
      background: "rgba(8,10,16,0.92)", color: "#e6e9f0", borderRadius: 12,
      fontSize: 12, fontFamily: "monospace",
      backdropFilter: "blur(10px)", border: "1px solid #2a3040", padding: 14,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: "bold", color: "#38bdf8" }}>Scroll Studio</span>
        <button
          onClick={copyConfig}
          style={{
            background: "#1b2230", color: "#e6e9f0", border: "1px solid #33405a",
            borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11,
            fontFamily: "monospace",
          }}>
          📋 Copy config
        </button>
      </div>

      <NumSlider label="Pin (vh)" value={cfg.pinVh} min={150} max={600} step={10} onChange={(v) => set("pinVh", v)} digits={0} />
      <NumSlider label="Lerp" value={cfg.lerp} min={0.05} max={1} step={0.01} onChange={(v) => set("lerp", v)} />
      <NumSlider label="End at" value={cfg.endAt} min={0.3} max={1} step={0.01} onChange={(v) => set("endAt", v)} />
      <NumSlider label="Scale from" value={cfg.scaleFrom} min={0.7} max={1.2} step={0.01} onChange={(v) => set("scaleFrom", v)} />
      <NumSlider label="Scale to" value={cfg.scaleTo} min={0.7} max={1.3} step={0.01} onChange={(v) => set("scaleTo", v)} />
      <NumSlider label="Copy fade" value={cfg.copyFadeEnd} min={0.1} max={1} step={0.01} onChange={(v) => set("copyFadeEnd", v)} />

      <Row label="Curve">
        <select
          value={cfg.curve}
          onChange={(e) => set("curve", e.target.value)}
          style={{
            background: "#1b2230", color: "#e6e9f0", border: "1px solid #33405a",
            borderRadius: 6, padding: "2px 4px", fontSize: 11, fontFamily: "monospace", flex: 1,
          }}>
          {Object.keys(CURVES).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </Row>

      <div style={{ marginTop: 8, fontSize: 11, color: "#667" }}>
        Lerp 1.00 = direct scrub (Apple). Pin ↑ = slower, smoother frames.
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------

function VariantSwitcher({ active }) {
  return (
    <div style={{
      position: "fixed", top: 90, left: 16, zIndex: 9999,
      display: "flex", flexDirection: "column", gap: 6,
      background: "rgba(8,10,16,0.9)", padding: 10, borderRadius: 10,
      border: "1px solid #2a3040", fontFamily: "monospace", fontSize: 12,
    }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <a key={n} href={`/pw-test-${n}`}
          style={{
            color: active === n ? "#38bdf8" : "#9aa3b5",
            fontWeight: active === n ? "bold" : "normal",
            textDecoration: "none",
          }}>
          {n === 5 ? "5 · Studio" : `${n} · ${VARIANTS[n].name}`}
        </a>
      ))}
      {active !== 5 && (
        <span style={{ color: "#667", maxWidth: 190, marginTop: 4, fontSize: 11 }}>
          {VARIANTS[active]?.desc}
        </span>
      )}
    </div>
  );
}

export function ProfitWebScrollTestPage({ variant }) {
  const [studioCfg, setStudioCfg] = useState(DEFAULT_STUDIO);
  const isStudio = variant === 5;
  const cfg = isStudio ? studioCfg : VARIANTS[variant] || VARIANTS[1];

  return (
    <>
      <SiteHeader />
      <main className="pw-page">
        <ScrollHero cfg={cfg} key={isStudio ? "studio" : variant} />
        <section style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          justifyContent: "center", background: "#0a0d14",
        }}>
          <h2 style={{ color: "#e6e9f0", fontSize: 32, fontFamily: "inherit" }}>
            Próxima seção (para testar a transição)
          </h2>
        </section>
      </main>
      <VariantSwitcher active={variant} />
      {isStudio && <StudioControls cfg={studioCfg} setCfg={setStudioCfg} />}
    </>
  );
}
