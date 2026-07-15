import { useEffect, useRef } from "react";
import { Button, ButtonRow } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import DarkVeil from "../components/fx/DarkVeil.jsx";
import "../styles/corretoras.css";

const LOGO = (file) => `${import.meta.env.BASE_URL || "/"}logos-corretoras/${file}`;

const LOGOS = {
  agora: { file: "agora-investimentos.svg", name: "Ágora" },
  capital: { file: "capital.svg", name: "Capital" },
  clear: { file: "clear-corretora.svg", name: "Clear" },
  genial: { file: "genial-investimentos.svg", name: "Genial" },
  guide: { file: "guide-investimentos.svg", name: "Guide" },
  itau: { file: "itau-corretora-e-ion-itau.svg", name: "Itaú Corretora" },
  ativa: { file: "logo_ativa.svg", name: "Ativa" },
  btg: { file: "logo_btg.svg", name: "BTG Pactual" },
  xp: { file: "logo_xp.svg", name: "XP" },
  master: { file: "master-corretora.svg", name: "Máster" },
  orama: { file: "orama.svg", name: "Órama" },
  rico: { file: "rico.svg", name: "Rico" },
  terra: { file: "terra-investimentos.svg", name: "Terra" },
  toro: { file: "toro.svg", name: "Toro" },
};

const ULTRA_BROKERS = [
  { id: "master", price: "Grátis*", free: true },
  { id: "capital", price: "Grátis*", free: true },
  { id: "agora", price: "Grátis*", free: true },
  { id: "orama", price: "Grátis*", free: true },
  { id: "ativa", price: "R$ 379,90", per: "/mês" },
  { id: "btg", price: "R$ 500", per: "/mês" },
  { id: "clear", price: "R$ 299,90", per: "/mês" },
  { id: "genial", price: "R$ 399", per: "/mês" },
  { id: "guide", price: "R$ 399", per: "/mês" },
  { id: "itau", price: "R$ 379", per: "/mês" },
  { id: "rico", price: "R$ 299,90", per: "/mês" },
  { id: "terra", price: "R$ 350", per: "/mês" },
  { id: "toro", price: "R$ 299,90", per: "/mês" },
  { id: "xp", price: "R$ 299,90", per: "/mês" },
];

const PRO_BROKERS = [
  { id: "ativa", price: "Grátis*", free: true },
  { id: "agora", price: "Grátis*", free: true },
  { id: "capital", price: "Grátis*", free: true },
  { id: "clear", price: "Grátis*", free: true },
  { id: "genial", price: "Grátis*", free: true },
  { id: "guide", price: "Grátis*", free: true },
  { id: "itau", price: "Grátis*", free: true },
  { id: "master", price: "Grátis*", free: true },
  { id: "orama", price: "Grátis*", free: true },
  { id: "rico", price: "Grátis*", free: true },
  { id: "terra", price: "R$ 320", per: "/mês" },
  { id: "toro", price: "Grátis*", free: true },
  { id: "xp", price: "Grátis*", free: true },
  { id: "btg", price: "Grátis*", free: true },
];

const STEPS = [
  { n: "1", title: "Abra sua conta", desc: "Abra sua conta na corretora parceira." },
  { n: "2", title: "Solicite o Profit", desc: "Solicite o Profit pelo home broker ou atendimento." },
  { n: "3", title: "Opere com vantagem", desc: "Opere com desconto ou isenção da assinatura." },
];

function useReveal(threshold = 0.12) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

const MARQUEE_A = ["xp", "btg", "clear", "rico", "agora", "genial", "itau"];
const MARQUEE_B = ["toro", "orama", "guide", "ativa", "master", "terra", "capital"];

function MarqueeRow({ ids, reverse = false }) {
  const items = [...ids, ...ids];
  return (
    <div className={`cx-marquee-row${reverse ? " cx-marquee-reverse" : ""}`}>
      <div className="cx-marquee-track">
        {items.map((id, i) => (
          <span className="cx-marquee-chip" key={`${id}-${i}`} aria-hidden={i >= ids.length}>
            <img src={LOGO(LOGOS[id].file)} alt={i < ids.length ? LOGOS[id].name : ""} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="cx-hero">
      <div className="cx-hero-veil" aria-hidden="true">
        <DarkVeil hueShift={210} speed={0.45} warpAmount={0.35} />
      </div>
      <div className="cx-hero-fade" aria-hidden="true" />
      <div className="cx-hero-inner">
        <span className="cx-eyebrow">Corretoras parceiras</span>
        <h1 className="cx-hero-title">
          Sua corretora pode<br />
          <span>pagar o seu Profit.</span>
        </h1>
        <p className="cx-hero-sub">
          As corretoras parceiras da Nelogica possuem ofertas especiais para
          traders. Confira as condições da sua corretora para conseguir ótimos
          descontos ou até mesmo isenção da assinatura.
        </p>
      </div>
      <div className="cx-marquee" aria-label="Corretoras parceiras">
        <MarqueeRow ids={MARQUEE_A} />
        <MarqueeRow ids={MARQUEE_B} reverse />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Broker cards                                                      */
/* ---------------------------------------------------------------- */

function BrokerCard({ broker, plan, index }) {
  const logo = LOGOS[broker.id];
  return (
    <a
      className={`cx-card${broker.free ? " is-free" : ""}`}
      href="#/planos"
      style={{ "--i": index }}
    >
      <span className="cx-card-glow" aria-hidden="true" />
      <span className="cx-card-top">
        <span className="cx-card-logo">
          <img src={LOGO(logo.file)} alt={logo.name} loading="lazy" />
        </span>
        <span className="cx-badge">{plan}</span>
      </span>
      <span className="cx-card-bottom">
        <span className="cx-card-price">
          <strong className={broker.free ? "cx-price-free" : undefined}>{broker.price}</strong>
          {broker.per && <em>{broker.per}</em>}
        </span>
        <span className="cx-card-arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </a>
  );
}

function BrokerSection({ eyebrow, title, plan, brokers, id }) {
  const ref = useReveal(0.05);
  return (
    <section className="cx-section" id={id} ref={ref}>
      <div className="cx-section-heading">
        <span className="cx-eyebrow">{eyebrow}</span>
        <h2 className="cx-h2">{title}</h2>
        <p className="cx-note">*Consulte as condições de cada corretora.</p>
      </div>
      <div className="cx-grid">
        {brokers.map((b, i) => (
          <BrokerCard key={b.id} broker={b} plan={plan} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* How it works                                                      */
/* ---------------------------------------------------------------- */

function HowItWorks() {
  const ref = useReveal(0.1);
  return (
    <section className="cx-how" ref={ref}>
      <div className="cx-section-heading">
        <span className="cx-eyebrow">Como funciona</span>
        <h2 className="cx-h2">Três passos até o desconto.</h2>
      </div>
      <div className="cx-how-grid">
        {STEPS.map((s, i) => (
          <div className="cx-step" key={s.n} style={{ "--i": i }}>
            <span className="cx-step-num">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Final CTA                                                         */
/* ---------------------------------------------------------------- */

function FinalCta() {
  const ref = useReveal();
  return (
    <section className="cx-final" ref={ref}>
      <div className="cx-final-glow" aria-hidden="true" />
      <h2 className="cx-h2">Não encontrou sua corretora?</h2>
      <p className="cx-hero-sub">Assine direto com a Nelogica e teste grátis por 15 dias.</p>
      <ButtonRow
        actions={[
          { label: "Testar grátis", href: "#comece", variant: "primary" },
          { label: "Ver planos", href: "#/planos", variant: "glass" },
        ]}
      />
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function CorretorasPage() {
  return (
    <>
      <SiteHeader />
      <main className="cx-page">
        <Hero />
        <BrokerSection
          eyebrow="Plataforma mais avançada"
          title="Profit Ultra"
          plan="Profit Ultra"
          brokers={ULTRA_BROKERS}
          id="ultra"
        />
        <BrokerSection
          eyebrow="Outras versões do Profit"
          title="Profit Pro nas corretoras"
          plan="Profit Pro"
          brokers={PRO_BROKERS}
          id="pro"
        />
        <HowItWorks />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
