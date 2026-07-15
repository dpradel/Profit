import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, ButtonRow } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import DarkVeil from "../components/fx/DarkVeil.jsx";
import bannerImg from "../../assets/bannerImg 1.png";
import phonesImg from "../../assets/Sem-Título-2 2.png";
import macbookImg from "../../assets/Macbook_Air_ProfiWeb_Grafico 2.png";
import "../styles/baixar.css";

/* ---------------------------------------------------------------- */
/* Shared reveal                                                     */
/* ---------------------------------------------------------------- */

function useReveal(threshold = 0.15, rootMargin = "0px 0px -6% 0px") {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

/* ---------------------------------------------------------------- */
/* OS glyphs                                                         */
/* ---------------------------------------------------------------- */

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.55 10.06 4.6v6.93H3V5.55Zm0 12.9 7.06.96v-6.86H3v5.9Zm7.83 1.06L21 21V12.55h-10.17v6.96Zm0-15.02v7.04H21V3l-10.17 1.49Z" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.36 12.77c.03 2.9 2.54 3.87 2.57 3.88-.02.07-.4 1.38-1.33 2.73-.8 1.17-1.63 2.33-2.94 2.35-1.29.03-1.7-.76-3.17-.76-1.47 0-1.93.74-3.14.79-1.27.05-2.23-1.26-3.04-2.42C3.66 16.96 2.4 12.62 4.1 9.74c.85-1.43 2.36-2.33 4-2.36 1.24-.02 2.42.84 3.17.84.76 0 2.19-1.04 3.69-.88.63.02 2.39.25 3.52 1.91-.09.06-2.1 1.23-2.08 3.52M13.98 5.75c.67-.82 1.13-1.95.99-3.08-.97.04-2.14.65-2.84 1.46-.63.72-1.17 1.87-1.02 2.97 1.08.09 2.19-.55 2.87-1.35" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.1 2.53c-.34.36-.53.91-.53 1.62v15.7c0 .71.19 1.26.53 1.62l.08.08 8.8-8.8v-.2l-8.8-8.1-.08.08Zm11.82 11.16-2.93-2.94v-.2l2.94-2.94.07.04 3.48 1.98c1 .56 1 1.48 0 2.05l-3.48 1.97-.08.04Zm-.08.9-3-3-8.85 8.86c.33.35.87.4 1.48.05l10.37-5.9M4 3.44l8.85 8.05 3-2.15L5.47 3.5c-.6-.34-1.15-.3-1.48.06l.01-.13Z" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Hero — desktop download                                           */
/* ---------------------------------------------------------------- */

function HeroSection() {
  const ref = useReveal(0.05);
  const scrollToReqs = (e) => {
    e.preventDefault();
    document.getElementById("bx-requisitos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bx-hero" ref={ref}>
      <div className="bx-hero-bg" aria-hidden="true">
        <DarkVeil hueShift={210} speed={0.45} warpAmount={0.35} />
      </div>
      <div className="bx-hero-fade" aria-hidden="true" />

      <div className="bx-hero-inner">
        <div className="bx-hero-copy">
          <span className="bx-eyebrow">Download</span>
          <h1 className="bx-hero-title">Profit disponível para Windows e Mac</h1>
          <p className="bx-body">
            A mesma tecnologia que revolucionou o trading no Brasil, disponível
            para os principais sistemas operacionais do mercado. Aproveite os
            recursos do Profit e não limite suas operações.
          </p>
          <div className="bx-hero-actions">
            <a className="bx-dl bx-dl-primary" href="#">
              <WindowsGlyph />
              <span>
                <em>Baixar para</em>
                <strong>Windows</strong>
              </span>
            </a>
            <a className="bx-dl bx-dl-glass" href="#">
              <AppleGlyph />
              <span>
                <em>Baixar para</em>
                <strong>Mac</strong>
              </span>
            </a>
          </div>
          <a className="bx-ghost-link" href="#bx-requisitos" onClick={scrollToReqs}>
            Ver requisitos de sistema
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="bx-hero-visual">
          <img className="bx-hero-mock" src={bannerImg} alt="Plataforma Profit no desktop" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Mobile                                                            */
/* ---------------------------------------------------------------- */

function MobileSection() {
  const ref = useReveal();
  return (
    <section className="bx-mobile" ref={ref}>
      <div className="bx-mobile-glow" aria-hidden="true" />
      <div className="bx-mobile-inner">
        <div className="bx-mobile-copy">
          <span className="bx-eyebrow">Mobile</span>
          <h2 className="bx-h2">Baixe o Profit agora no seu dispositivo móvel</h2>
          <p className="bx-body">
            Descubra todo o potencial da renda variável, acesse às melhores
            ferramentas do mercado e opere de qualquer lugar em seu smartphone.
          </p>
          <div className="bx-stores">
            <a className="bx-store" href="#">
              <AppleGlyph />
              <span>
                <em>Baixar na</em>
                <strong>App Store</strong>
              </span>
            </a>
            <a className="bx-store" href="#">
              <PlayGlyph />
              <span>
                <em>Disponível no</em>
                <strong>Google Play</strong>
              </span>
            </a>
          </div>
        </div>
        <div className="bx-mobile-visual">
          <img className="bx-phones" src={phonesImg} alt="Aplicativo Profit em smartphones" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Profit Web — animated fake browser over the MacBook image         */
/* ---------------------------------------------------------------- */

const CANDLES = [
  { h: 34, w: 26, up: true },  { h: 22, w: 14, up: false }, { h: 40, w: 30, up: true },
  { h: 28, w: 20, up: true },  { h: 36, w: 16, up: false }, { h: 18, w: 12, up: false },
  { h: 44, w: 32, up: true },  { h: 30, w: 22, up: true },  { h: 24, w: 14, up: false },
  { h: 48, w: 34, up: true },  { h: 32, w: 18, up: false }, { h: 52, w: 38, up: true },
  { h: 38, w: 24, up: true },  { h: 26, w: 16, up: false }, { h: 56, w: 40, up: true },
  { h: 46, w: 28, up: true },
];

function FakeBrowser() {
  const hostRef = useRef(null);
  const [price, setPrice] = useState(128.42);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        el.classList.toggle("is-live", e.isIntersecting);
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setPrice((p) => +(p + (Math.random() - 0.46) * 0.35).toFixed(2));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bx-browser" ref={hostRef}>
      <div className="bx-browser-chrome">
        <span className="bx-dot bx-dot-r" />
        <span className="bx-dot bx-dot-y" />
        <span className="bx-dot bx-dot-g" />
        <span className="bx-url">profitweb.nelogica.com.br</span>
      </div>
      <div className="bx-browser-body">
        <div className="bx-ticker">
          <span className="bx-ticker-sym">WINFUT</span>
          <span className="bx-ticker-price">{price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          <span className="bx-ticker-live"><i />ao vivo</span>
        </div>
        <div className="bx-chart">
          {CANDLES.map((c, i) => (
            <span
              key={i}
              className={`bx-candle${c.up ? " is-up" : " is-down"}`}
              style={{ "--ch": `${c.h}%`, "--cw": `${c.w}%`, "--ci": i }}
            />
          ))}
          <span className="bx-priceline" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function WebSection() {
  const ref = useReveal();
  return (
    <section className="bx-web" ref={ref}>
      <div className="bx-web-inner">
        <div className="bx-web-copy">
          <span className="bx-eyebrow">Navegador</span>
          <h2 className="bx-h2">Profit Web</h2>
          <p className="bx-web-tagline">Tudo o que você já fazia, agora no seu navegador.</p>
          <div className="bx-web-card">
            <span className="bx-web-card-label">Disponível exclusivamente para:</span>
            <ul>
              <li>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Clientes Multi-broker
              </li>
              <li>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Planos de teste Profit
              </li>
            </ul>
            <p>Faça o teste e garanta acesso a todas as versões do Profit.</p>
          </div>
          <ButtonRow actions={[{ label: "Testar grátis", href: "#comece", variant: "primary" }]} />
        </div>
        <div className="bx-web-visual">
          <img className="bx-macbook" src={macbookImg} alt="Profit Web em um MacBook" />
          <FakeBrowser />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Requirements                                                      */
/* ---------------------------------------------------------------- */

const WIN_TIERS = [
  {
    name: "Mínimo",
    specs: ["Processador 4 núcleos e 8 threads", "8 GB RAM", "Resolução 1024x768"],
  },
  {
    name: "Recomendado",
    featured: true,
    specs: ["Processador 6 núcleos e 12 threads", "16 GB RAM", "Resolução 1920x1080"],
  },
  {
    name: "Power User",
    specs: ["Processador 8 núcleos e 16 threads", "32 GB RAM", "Resolução 1920x1080"],
  },
];

const MAC_TIERS = [
  {
    name: "Mac ARM · Mínimo",
    specs: ["Chip M1", "macOS 11.0 ou superior", "8 GB RAM", "Resolução 1024x768"],
  },
  {
    name: "Mac ARM · Recomendado",
    featured: true,
    specs: ["M1 Pro / M2 Pro ou superior", "macOS 13.1 ou superior", "16 GB RAM", "Resolução 1920x1080"],
  },
  {
    name: "Mac Intel · Mínimo",
    specs: ["Intel Core i5 Quad-Core 2,4 GHz ou superior", "macOS 10.15 ou superior", "8 GB RAM", "Resolução 1024x768"],
  },
  {
    name: "Mac Intel · Recomendado",
    featured: true,
    specs: ["Intel Core i7 Six-Core 2,6 GHz ou superior", "macOS 13.1 ou superior", "16 GB RAM", "Resolução 1920x1080"],
  },
];

const NOTES = [
  "Recomendamos conexão via cabo de rede — redes móveis (3G/4G) não são recomendadas.",
  "Windows 11 com Intel Graphics: driver de vídeo 30.0.100.9955 ou superior.",
  "DirectX 12 recomendado.",
  "Sem placa dedicada, o processador precisa de vídeo integrado.",
];

function OsSwitch({ selected, onSelect }) {
  const tabsRef = useRef(null);
  const btnRefs = useRef({});
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    const update = () => {
      const active = btnRefs.current[selected];
      const tabs = tabsRef.current;
      if (!active || !tabs) return;
      const a = active.getBoundingClientRect();
      const t = tabs.getBoundingClientRect();
      setIndicator({ left: a.left - t.left, width: a.width });
    };
    update();
    const onResize = () => requestAnimationFrame(update);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selected]);

  const options = [
    { id: "windows", label: "Windows", glyph: <WindowsGlyph /> },
    { id: "mac", label: "Mac", glyph: <AppleGlyph /> },
  ];

  return (
    <div className="bx-switch" role="tablist" aria-label="Sistema operacional" ref={tabsRef}>
      {indicator && (
        <span
          className="bx-switch-indicator"
          style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
          aria-hidden="true"
        />
      )}
      {options.map((o) => (
        <button
          key={o.id}
          ref={(node) => { btnRefs.current[o.id] = node; }}
          type="button"
          role="tab"
          aria-selected={selected === o.id}
          className={`bx-switch-tab${selected === o.id ? " is-active" : ""}`}
          onClick={() => onSelect(o.id)}
        >
          {o.glyph}
          {o.label}
        </button>
      ))}
    </div>
  );
}

function TierCard({ tier, index }) {
  return (
    <article className={`bx-tier${tier.featured ? " is-featured" : ""}`} style={{ "--i": index }}>
      <h3>{tier.name}</h3>
      <ul>
        {tier.specs.map((s) => (
          <li key={s}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}

function RequirementsSection() {
  const ref = useReveal(0.08);
  const [os, setOs] = useState("windows");
  const tiers = os === "windows" ? WIN_TIERS : MAC_TIERS;

  return (
    <section className="bx-reqs" id="bx-requisitos" ref={ref}>
      <div className="bx-reqs-heading">
        <span className="bx-eyebrow">Especificações</span>
        <h2 className="bx-h2">Requisitos e configurações</h2>
        <p className="bx-body">
          Veja abaixo os requisitos de sistema necessários para a utilização
          adequada do Profit.
        </p>
      </div>

      <OsSwitch selected={os} onSelect={setOs} />

      <div className={`bx-panel${os === "mac" ? " is-mac" : ""}`} key={os}>
        {os === "windows" && (
          <p className="bx-required">
            Obrigatório: <strong>Windows 10 ou 11</strong> · <strong>Armazenamento SSD</strong>
          </p>
        )}
        <div className="bx-tiers">
          {tiers.map((t, i) => (
            <TierCard tier={t} index={i} key={t.name} />
          ))}
        </div>
      </div>

      <aside className="bx-notes" aria-label="Atenção">
        <span className="bx-notes-title">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Atenção
        </span>
        <ul>
          {NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function BaixarPage() {
  return (
    <>
      <SiteHeader />
      <main className="bx-page">
        <HeroSection />
        <MobileSection />
        <WebSection />
        <RequirementsSection />
      </main>
      <SiteFooter />
    </>
  );
}
