import { useEffect, useRef } from "react";
import {
  osIntro, osBackups, osWhatsNew, osSelfHost, osAppStore, osWidgets,
} from "../data/umbrelOsData.jsx";

// ─── Shared reveal hook ────────────────────────────────────────────────────────
function useReveal(ref, threshold = 0.1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("is-revealed"); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

// ─── Section 1 ── Para todos os perfis ────────────────────────────────────────
function SectionProfile() {
  const ref = useRef(null);
  useReveal(ref, 0.08);

  return (
    <section className="pf-section pf-section-profile" ref={ref}>
      <div className="pf-section-profile-bg" aria-hidden="true" />
      <div className="pf-wrap pf-section-profile-layout">
        <div className="pf-section-profile-copy">
          <span className="pf-eyebrow">{osIntro.eyebrow}</span>
          <h2 className="pf-display">{osIntro.title}</h2>
          <p className="pf-body">{osIntro.text}</p>
        </div>
        <div className="pf-section-profile-visual">
          <div className="pf-browser">
            <div className="pf-browser-bar">
              <span /><span /><span />
              <span className="pf-browser-url">profit.local</span>
            </div>
            <div className="pf-browser-screen">
              <img src={osIntro.image} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2 ── Multiplataforma ─────────────────────────────────────────────
function SectionMultiplatform() {
  const ref = useRef(null);
  useReveal(ref, 0.08);

  return (
    <section className="pf-section pf-section-multi" ref={ref}>
      <div className="pf-wrap pf-wrap-narrow pf-text-center">
        <span className="pf-eyebrow">{osBackups.eyebrow}</span>
        <h2 className="pf-display">{osBackups.title}</h2>
        <p className="pf-body">{osBackups.text}</p>
      </div>
      <div className="pf-multi-visual">
        <img className="pf-multi-main" src={osBackups.main} alt="" loading="lazy" />
        <img className="pf-multi-side" src={osBackups.side} alt="" loading="lazy" />
      </div>
    </section>
  );
}

// ─── Section 3 ── Novidades ────────────────────────────────────────────────────
function SectionNews() {
  const ref = useRef(null);
  useReveal(ref, 0.08);

  return (
    <section className="pf-section pf-section-news" ref={ref}>
      <div className="pf-wrap">
        <div className="pf-news-head">
          <div>
            <span className="pf-eyebrow">{osWhatsNew.eyebrow}</span>
            <h2 className="pf-headline">{osWhatsNew.title}</h2>
          </div>
          <a href={osWhatsNew.action.href} className="pf-link-arrow">
            {osWhatsNew.action.label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="pf-news-grid">
          {osWhatsNew.cards.map((card, i) => (
            <article className="pf-news-card" key={card.title} style={{ "--i": i }}>
              <div className="pf-news-card-img">
                <img src={card.image} alt="" loading="lazy" />
              </div>
              <div className="pf-news-card-body">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4 ── Por que o Profit? ──────────────────────────────────────────
function SectionWhy() {
  const ref = useRef(null);
  useReveal(ref, 0.06);

  return (
    <section className="pf-section pf-section-why" ref={ref}>
      <div className="pf-section-why-bg" aria-hidden="true" />
      <div className="pf-wrap">
        <div className="pf-center-head">
          <span className="pf-eyebrow">{osSelfHost.eyebrow}</span>
          <h2 className="pf-display">{osSelfHost.title}</h2>
          <p className="pf-body">{osSelfHost.text}</p>
        </div>
        <div className="pf-why-grid">
          {osSelfHost.cards.map((card, i) => (
            <article className="pf-why-card" key={card.title} style={{ "--i": i }}>
              <span className="pf-why-card-num">0{i + 1}</span>
              <div className="pf-why-card-img">
                <img src={card.image} alt="" loading="lazy" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5 ── Arsenal incomparável ───────────────────────────────────────
function SectionArsenal() {
  const ref = useRef(null);
  useReveal(ref, 0.08);

  return (
    <section className="pf-section pf-section-arsenal" ref={ref}>
      <div className="pf-wrap pf-section-arsenal-layout">
        <div className="pf-arsenal-copy">
          <span className="pf-eyebrow">{osAppStore.eyebrow}</span>
          <h2 className="pf-display">{osAppStore.title}</h2>
          <p className="pf-body">{osAppStore.text}</p>
          <div className="pf-arsenal-actions">
            {osAppStore.actions.map((a) => (
              <a key={a.href} href={a.href} className="pf-btn">{a.label}</a>
            ))}
          </div>
        </div>
        <div className="pf-arsenal-icons">
          {osAppStore.icons.map((app, i) => (
            <div className="pf-arsenal-icon" key={app.label} style={{ "--i": i }}>
              <div className="pf-arsenal-icon-wrap">
                <img src={app.icon} alt={app.label} loading="lazy" />
              </div>
              <span>{app.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6 ── Visão de mercado ────────────────────────────────────────────
function SectionWidgets() {
  const ref = useRef(null);
  useReveal(ref, 0.06);

  return (
    <section className="pf-section pf-section-widgets" ref={ref}>
      <div className="pf-wrap">
        <div className="pf-center-head">
          <span className="pf-eyebrow">{osWidgets.eyebrow}</span>
          <h2 className="pf-display">{osWidgets.title}</h2>
          <p className="pf-body">{osWidgets.text}</p>
        </div>
      </div>
      <div className="pf-widgets-stage">
        {osWidgets.cards.map((card, i) => (
          <div className="pf-widget-float" key={card} style={{ "--i": i }}>
            <img src={card} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export function OsContentSections() {
  return (
    <div className="pf-sections-root">
      <SectionProfile />
      <SectionMultiplatform />
      <SectionNews />
      <SectionWhy />
      <SectionArsenal />
      <SectionWidgets />
    </div>
  );
}
