import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button, ButtonRow } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { ToolMockup } from "../components/ToolResourcesShowcase.jsx";
import { toolResources } from "../data/toolResourcesData.jsx";
import mockupLaptop from "../assets/mockup-laptop.png";
import mockupTablet from "../assets/mockup-tablet.png";
import mockupPhone from "../assets/mockup-phone.png";

const HERO_VIDEO_SRC = `${import.meta.env.BASE_URL || "/"}profit-ultra-hero.webm`;
const ULTRA_LOGO = `${import.meta.env.BASE_URL || "/"}logo-profit-ultra.svg`;
const BROKER_LOGO = (file) => `${import.meta.env.BASE_URL || "/"}logos-corretoras/${file}`;

const toolById = (id) => toolResources.find((t) => t.id === id);

/* ---------------------------------------------------------------- */
/* Shared: in-view reveal                                            */
/* ---------------------------------------------------------------- */

function useReveal(threshold = 0.18, rootMargin = "0px") {
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

/* Subtle scroll-driven parallax: the element drifts vertically as it
   passes through the viewport (moves up while approaching center,
   settles, then continues past), giving depth without needing the
   section to be pinned. */
function useParallax(strength = 40) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    let rafId;
    function tick() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the element's center is at the bottom of the viewport,
      // 1 when it's at the top — i.e. progress through the viewport.
      const center = rect.top + rect.height / 2;
      const progress = clamp(1 - center / vh, 0, 1);
      el.style.transform = `translateY(${(0.5 - progress) * strength}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [strength]);
  return ref;
}

/* Scales its children uniformly to fit the available box, centered,
   so a mockup built at a fixed pixel size is always shown in full —
   never cropped, whatever the card's dimensions are. */
function ScaleToFit({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const availW = outer.clientWidth;
      const availH = outer.clientHeight;
      const naturalW = inner.scrollWidth;
      const naturalH = inner.scrollHeight;
      if (!availW || !availH || !naturalW || !naturalH) return;
      setScale(Math.min(availW / naturalW, availH / naturalH, 1));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="pu-scale-fit">
      <div ref={innerRef} className="pu-scale-fit-inner" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/* Animated tool mockup: plays its intro once each time it enters the
   viewport (reuses the resource-power foreground animation CSS). */
function UltraMockup({ toolId, replay = true }) {
  const tool = useMemo(() => toolById(toolId), [toolId]);
  const hostRef = useRef(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || !replay) return;

    const restart = () => {
      el.classList.remove("is-active", "has-foreground-animation");
      void el.offsetWidth; // force reflow so the animation restarts
      el.classList.add("is-active", "has-foreground-animation");
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          restart();
        } else {
          el.classList.remove("is-active", "has-foreground-animation");
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [replay, toolId]);

  if (!tool) return null;

  return (
    <div
      ref={hostRef}
      className={`resource-power-card pu-mockup-host${replay ? "" : " is-active has-foreground-animation"}`}
      style={{
        "--tool-tone-a": tool.theme[0],
        "--tool-tone-b": tool.theme[1],
        "--tool-accent": tool.theme[2],
      }}
    >
      <div className="resource-power-visual">
        <ScaleToFit>
          <ToolMockup tool={tool} />
        </ScaleToFit>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

/* Hero video: reversed scroll-scrub. The clip's source direction is
   top view -> front view; on the page we want the opposite (start on
   the front, rewind toward the top as the user scrolls), so the
   scrub maps scroll progress to (1 - progress) * duration. */
const HERO_VIDEO_ASPECT = 16 / 9;

/* Four candidate dynamic backgrounds for the hero — pick via the
   floating switcher (or ?bg=1..4). Once one is chosen the others
   and the switcher get deleted. 2–4 render BEHIND the video (which
   carries alpha, so it shows through around the laptop). Reacts to
   the mouse via --mx/--my set on the stage. */
function HeroBackground() {
  return (
    <div className="pu-bg pu-bg-gridlight" aria-hidden="true">
      <i className="pu-gridlight-base" />
      <i className="pu-gridlight-bright" />
    </div>
  );
}

function UltraHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRef = useRef(null);

  // Cursor position feeds the interactive background via CSS vars.
  useEffect(() => {
    const stage = sectionRef.current?.querySelector(".pu-hero-stage");
    if (!stage) return;
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", `${e.clientX - r.left}px`);
      stage.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Size the media box to the largest 16:9 rectangle that fits inside
  // its wrapper — CSS aspect-ratio can't express this cleanly once
  // the box also needs a JS-driven transform, so it's measured here
  // instead of via CSS, guaranteeing no letterbox gap on any side.
  useEffect(() => {
    const media = mediaRef.current;
    const wrap = media?.parentElement;
    if (!media || !wrap) return;

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      const boxW = w / h > HERO_VIDEO_ASPECT ? h * HERO_VIDEO_ASPECT : w;
      const boxH = w / h > HERO_VIDEO_ASPECT ? h : w / HERO_VIDEO_ASPECT;
      media.style.width = `${boxW}px`;
      media.style.height = `${boxH}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    const media = mediaRef.current;
    if (!el || !video) return;

    const entranceRaf = requestAnimationFrame(() => el.classList.add("is-visible"));

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 1024;

    // Mobile / reduced motion: hold on the front-view frame, no scrub
    if (isMobile || prefersReducedMotion) {
      const onMeta = () => { video.currentTime = video.duration || 0; };
      if (video.readyState >= 1) onMeta();
      else video.addEventListener("loadedmetadata", onMeta, { once: true });
      return () => {
        cancelAnimationFrame(entranceRaf);
        video.removeEventListener("loadedmetadata", onMeta);
      };
    }

    const copy = el.querySelector(".pu-hero-copy");

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

      // No hold — the video reaches its final frame exactly as the
      // pin releases, so there's no dead scroll before Inside Track.
      const videoP = smooth;

      if (duration > 0 && video.readyState >= 2) {
        const t = (1 - videoP) * duration;
        if (Math.abs(video.currentTime - t) > 0.005) video.currentTime = t;
      }

      if (copy) {
        const cp = clamp(smooth / 0.4, 0, 1);
        copy.style.opacity = String(1 - cp);
        copy.style.transform = `translateY(${cp * -44}px)`;
        copy.style.filter = `blur(${cp * 8}px)`;
        copy.style.pointerEvents = cp > 0.5 ? "none" : "";
      }

      if (media) {
        media.style.transform = `scale(${1 + smooth * 0.1}) translateY(${smooth * -30}px)`;
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
    <section className="pu-hero" ref={sectionRef}>
      <div className="pu-hero-stage">
        {/* Renders behind the alpha video so the laptop floats over it. */}
        <HeroBackground />
        <div className="pu-hero-media-wrap" aria-hidden="true">
          <div className="pu-hero-media" ref={mediaRef}>
            <video ref={videoRef} src={HERO_VIDEO_SRC} muted playsInline preload="auto" />
          </div>
        </div>
        <div className="pu-hero-vignette" aria-hidden="true" />

        <div className="pu-hero-copy">
          <img className="pu-hero-logo" src={ULTRA_LOGO} alt="Profit Ultra" />
          <h1 className="pu-hero-title">
            Todo o poder do Profit,<br />
            <span>elevado à máxima potência.</span>
          </h1>
          <ButtonRow
            actions={[
              { label: "Testar grátis", href: "#plano", variant: "gradient" },
              { label: "Comprar agora", href: "#plano", variant: "glass" },
            ]}
          />
          <a className="pu-hero-pill" href="#corretoras">
            Condições especiais via corretoras
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v9M4.5 8.5 8 12l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Inside Track spotlight                                            */
/* ---------------------------------------------------------------- */

function InsideTrackSection() {
  const ref = useReveal(0.01, "0px 0px 20% 0px");
  const parallaxRef = useParallax(50);
  return (
    <section className="pu-inside" ref={ref}>
      <div className="pu-inside-glow" aria-hidden="true" />
      <div className="pu-inside-inner">
        <div className="pu-inside-copy">
          <span className="pu-eyebrow">Exclusivo Ultra</span>
          <h2 className="pu-h2">Inside Track</h2>
          <p className="pu-sub">Você por dentro dos movimentos do mercado.</p>
          <p className="pu-body">
            Esteja um passo à frente nas suas operações com o Inside Track: seu
            monitor de movimentação das companhias por trás das ações. Enxergue
            de maneira prática os negócios realizados pelo conselho, tesouraria
            e diretoria das empresas e muito mais.
          </p>
        </div>
        <div ref={parallaxRef}>
          <div className="pu-inside-visual">
            <UltraMockup toolId="inside-track" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Feature cards                                                     */
/* ---------------------------------------------------------------- */

const FEATURES = [
  {
    id: "copilot",
    toolId: "copilot",
    title: "Copilot",
    desc: "Um assistente que deixa você sempre no controle das suas automações.",
    size: "lg",
  },
  {
    id: "motion",
    toolId: "motion-tracker",
    title: "Motion Tracker",
    desc: "Antecipe os movimentos dos grandes players do mercado.",
    size: "lg",
  },
  {
    id: "atendimento",
    toolId: "connect-chat",
    title: "Atendimento Ultra",
    desc: "Prioridade na resolução das suas demandas e atendimento por telefone exclusivo.",
  },
  {
    id: "otimizacao",
    toolId: "otimizacao-estrategias",
    title: "Otimização de parâmetros",
    desc: "Suas estratégias otimizadas em poucos cliques. Deixe o algoritmo trabalhar por você e alcance os melhores resultados.",
  },
  {
    id: "replay",
    toolId: "replay-multi",
    title: "Replay Multi",
    desc: "Acesse simultaneamente o replay de diversos ativos para estudar e analisar pregões passados.",
  },
  {
    id: "acesso",
    toolId: null, // custom devices visual
    title: "Acesso simultâneo",
    desc: "Você sempre conectado com o mercado, em qualquer lugar, de qualquer dispositivo.",
  },
  {
    id: "ivrank",
    toolId: "iv-rank",
    title: "Gráfico IV Rank",
    desc: "Descubra o histórico de volatilidade implícita nas Opções disponíveis para cada ativo.",
  },
  {
    id: "plano",
    toolId: "plano-trade",
    title: "Plano de Trade",
    desc: "Crie um planejamento para otimizar seus trades e acompanhar seus resultados em um só lugar.",
  },
];

function DevicesVisual() {
  return (
    <div className="pu-devices">
      <img className="pu-device pu-device-laptop" src={mockupLaptop} alt="" loading="lazy" />
      <img className="pu-device pu-device-tablet" src={mockupTablet} alt="" loading="lazy" />
      <img className="pu-device pu-device-phone" src={mockupPhone} alt="" loading="lazy" />
    </div>
  );
}

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${y * -3.2}deg`);
    el.style.setProperty("--tilt-y", `${x * 4.2}deg`);
    el.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      ref={cardRef}
      className={`pu-card${feature.size === "lg" ? " pu-card-lg" : ""}`}
      style={{ "--i": index }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="pu-card-spot" aria-hidden="true" />
      <header className="pu-card-head">
        <span className="pu-badge">Exclusivo Ultra</span>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </header>
      <div className="pu-card-visual">
        {feature.toolId ? <UltraMockup toolId={feature.toolId} /> : <DevicesVisual />}
      </div>
    </article>
  );
}

function FeaturesSection() {
  const ref = useReveal(0.05);
  return (
    <section className="pu-features" ref={ref}>
      <div className="pu-features-heading">
        <span className="pu-eyebrow">Recursos exclusivos</span>
        <h2 className="pu-h2">
          Ferramentas que só o <span>Ultra</span> tem.
        </h2>
      </div>
      <div className="pu-features-grid">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.id} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Remote control banner                                             */
/* ---------------------------------------------------------------- */

function RemoteSection() {
  const ref = useReveal();
  return (
    <section className="pu-remote" ref={ref}>
      <div className="pu-remote-card">
        <div className="pu-remote-glow" aria-hidden="true" />
        <div className="pu-remote-copy">
          <span className="pu-eyebrow">Em breve</span>
          <h2 className="pu-h2">Controle remoto de automações.</h2>
          <p className="pu-sub">Disponível em julho.</p>
        </div>
        <div className="pu-remote-visual">
          <UltraMockup toolId="estrategias-automatizadas" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Comparison — Profit Pro vs Ultra                                  */
/* ---------------------------------------------------------------- */

const COMPARE_ROWS = [
  { label: "Todos os recursos do Profit Pro", pro: true, ultra: true },
  { label: "Função Copilot", pro: false, ultra: true },
  { label: "Motion Tracker", pro: false, ultra: true },
  { label: "Inside Track", pro: false, ultra: true },
  { label: "Otimização de parâmetros", pro: false, ultra: true },
  { label: "Replay de múltiplos ativos", pro: false, ultra: true },
  { label: "Login simultâneo", pro: false, ultra: true },
  { label: "IV Ranking", pro: false, ultra: true },
  { label: "Visualização de Cripto", pro: false, ultra: true },
  { label: "Plano de Trade", pro: false, ultra: true },
  { label: "Suporte por telefone", pro: false, ultra: true },
];

function CheckIcon({ on, ultra }) {
  if (!on) return <span className="pu-cmp-dash">—</span>;
  return (
    <svg className={`pu-cmp-check${ultra ? " is-ultra" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CompareSection() {
  const ref = useReveal(0.1);
  return (
    <section className="pu-compare" ref={ref}>
      <div className="pu-compare-heading">
        <span className="pu-eyebrow">Comparativo</span>
        <h2 className="pu-h2">
          Profit Pro ou <span>Profit Ultra</span>?
        </h2>
      </div>
      <div className="pu-compare-table" role="table">
        <div className="pu-cmp-row pu-cmp-head" role="row">
          <span />
          <span>Profit Pro</span>
          <span className="pu-cmp-ultra-col">Profit Ultra</span>
        </div>
        {COMPARE_ROWS.map((row, i) => (
          <div className="pu-cmp-row" role="row" key={row.label} style={{ "--i": i }}>
            <span>{row.label}</span>
            <span><CheckIcon on={row.pro} /></span>
            <span className="pu-cmp-ultra-col"><CheckIcon on={row.ultra} ultra /></span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Pricing                                                           */
/* ---------------------------------------------------------------- */

const FREQUENCIES = [
  { id: "mensal", label: "Mensal", discount: 0 },
  { id: "semestral", label: "Semestral", discount: 5 },
  { id: "anual", label: "Anual", discount: 10 },
  { id: "bianual", label: "Bianual", discount: 15 },
];
const BASE_PRICE = 500;

const PLAN_FEATURES_A = [
  "Função Copilot",
  "Motion Tracker",
  "Suporte por telefone",
  "Otimização de parâmetros",
  "Replay de múltiplos ativos",
];
const PLAN_FEATURES_B = [
  "Login simultâneo",
  "IV Ranking",
  "Visualização de Cripto",
  "Plano de Trade",
];

/* Sliding-pill tab selector, matching the Recursos plan tabs mechanic. */
function FreqTabs({ options, selected, onSelect }) {
  const tabsRef = useRef(null);
  const buttonRefs = useRef({});
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    const update = () => {
      const activeTab = buttonRefs.current[selected];
      const tabs = tabsRef.current;
      if (!activeTab || !tabs) return;
      const tabRect = activeTab.getBoundingClientRect();
      const tabsRect = tabs.getBoundingClientRect();
      setIndicator({ left: tabRect.left - tabsRect.left, width: tabRect.width });
    };
    update();
    const onResize = () => requestAnimationFrame(update);
    window.addEventListener("resize", onResize);
    let ro;
    if (tabsRef.current) {
      ro = new ResizeObserver(onResize);
      ro.observe(tabsRef.current);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [selected]);

  return (
    <div className="pu-freq-tabs" role="tablist" ref={tabsRef}>
      {indicator && (
        <span
          className="pu-freq-indicator"
          style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
          aria-hidden="true"
        />
      )}
      {options.map((f) => (
        <button
          key={f.id}
          ref={(node) => { buttonRefs.current[f.id] = node; }}
          type="button"
          role="tab"
          aria-selected={selected === f.id}
          className={`pu-freq-tab${selected === f.id ? " is-active" : ""}`}
          onClick={() => onSelect(f.id)}
        >
          {f.label}
          {f.discount > 0 && <em>-{f.discount}%</em>}
        </button>
      ))}
    </div>
  );
}

function PricingSection() {
  const ref = useReveal(0.1);
  const [freq, setFreq] = useState("mensal");
  const current = FREQUENCIES.find((f) => f.id === freq);
  const price = BASE_PRICE * (1 - current.discount / 100);
  const priceLabel = price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="pu-pricing" id="plano" ref={ref}>
      <div className="pu-pricing-glow" aria-hidden="true" />
      <div className="pu-pricing-heading">
        <img className="pu-pricing-logo" src={ULTRA_LOGO} alt="Profit Ultra" />
        <h2 className="pu-h2">Leve seus trades a um novo patamar com Profit Ultra.</h2>
        <p className="pu-sub">
          Opere como nunca antes: conheça a plataforma mais avançada já lançada pela Nelogica.
        </p>
      </div>

      <div className="pu-plan-card">
        <div className="pu-plan-freq">
          <span className="pu-plan-freq-label">Escolha a frequência de pagamento:</span>
          <FreqTabs options={FREQUENCIES} selected={freq} onSelect={setFreq} />
        </div>

        <div className="pu-plan-body">
          <div className="pu-plan-features">
            <span className="pu-plan-features-label">Principais funcionalidades:</span>
            <div className="pu-plan-cols">
              <ul>
                {PLAN_FEATURES_A.map((f) => (
                  <li key={f}><CheckIcon on ultra />{f}</li>
                ))}
              </ul>
              <ul>
                {PLAN_FEATURES_B.map((f) => (
                  <li key={f}><CheckIcon on ultra />{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pu-plan-buy">
            <div className="pu-plan-price">
              <strong>R$ {priceLabel}</strong>
              <span>/mês</span>
            </div>
            <span className="pu-plan-price-note">
              Pagamento {current.label.toLowerCase()}
            </span>
            <Button href="#" variant="gradient">Testar grátis por 15 dias</Button>
            <Button href="#" variant="glass">Comprar agora</Button>
            <span className="pu-plan-cc">Não é necessário cartão de crédito</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Corretoras                                                        */
/* ---------------------------------------------------------------- */

const BROKERS = [
  { id: "master", name: "Master Corretora", logo: "master-corretora.svg", price: "Grátis*", tag: "Acesso ao Profit Web" },
  { id: "agora", name: "Ágora Investimentos", logo: "agora-investimentos.svg", price: "Grátis*" },
  { id: "toro", name: "Toro", logo: "toro.svg", price: "R$ 299,90/mês" },
  { id: "rico", name: "Rico", logo: "rico.svg", price: "R$ 299,90/mês" },
  { id: "xp", name: "XP", logo: "logo_xp.svg", price: "R$ 299,90/mês" },
  { id: "clear", name: "Clear", logo: "clear-corretora.svg", price: "R$ 299,90/mês" },
  { id: "btg", name: "BTG Pactual", logo: "logo_btg.svg", price: "R$ 300/mês" },
  { id: "orama", name: "Órama", logo: "orama.svg", price: "R$ 350/mês" },
  { id: "ion", name: "íon Itaú", logo: "itau-corretora-e-ion-itau.svg", price: "R$ 370/mês" },
  { id: "terra", name: "Terra Investimentos", logo: "terra-investimentos.svg", price: "R$ 379,90/mês" },
  { id: "guide", name: "Guide", logo: "guide-investimentos.svg", price: "R$ 399/mês" },
  { id: "genial", name: "Genial", logo: "genial-investimentos.svg", price: "R$ 399/mês" },
];

function BrokersSection() {
  const ref = useReveal(0.06);
  return (
    <section className="pu-brokers" id="corretoras" ref={ref}>
      <div className="pu-brokers-heading">
        <span className="pu-eyebrow">Condições especiais</span>
        <h2 className="pu-h2">
          Corretoras parceiras que já têm o<br />
          <span>Profit Ultra</span> disponível.
        </h2>
      </div>
      <div className="pu-brokers-grid">
        {BROKERS.map((b, i) => (
          <a className="pu-broker" href="#" key={b.id} style={{ "--i": i }}>
            <span className="pu-broker-logo">
              <img src={BROKER_LOGO(b.logo)} alt={b.name} loading="lazy" />
            </span>
            <span className="pu-broker-price">{b.price}</span>
            {b.tag && <span className="pu-broker-tag">{b.tag}</span>}
            <span className="pu-broker-link">
              Conhecer
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Testimonials                                                      */
/* ---------------------------------------------------------------- */

const QUOTES = [
  { initials: "SR", name: "Sidney", text: "MELHOR plataforma do mundo." },
  { initials: "EL", name: "Eyer", text: "Estou adorando a nova versão da plataforma." },
  { initials: "DA", name: "Dan", text: "Sensacional o Profit Ultra! É tudo muito perfeito. A ferramenta de otimizar as estratégias era algo que faltava." },
  { initials: "RC", name: "Ricardo", text: "Estou operando no simulador, mas as mudanças prometem muito. A ferramenta traz muito mais segurança!" },
  { initials: "DI", name: "Diogo", text: "Está sensacional essa atualização." },
  { initials: "AL", name: "Alisson", text: "Estou apaixonado por essa atualização." },
  { initials: "EB", name: "Edemilson", text: "Estou gostando do Ultra, muito legal! Testando aos poucos as novas possibilidades." },
  { initials: "DV", name: "David", text: "Agradeço a oportunidade de testar uma excelente ferramenta que será um divisor de águas. Conta simulador rodando liso e com GAIN." },
];

function QuoteCard({ q }) {
  return (
    <figure className="pu-quote">
      <span className="pu-quote-avatar">{q.initials}</span>
      <blockquote>“{q.text}”</blockquote>
      <figcaption>{q.name}</figcaption>
    </figure>
  );
}

function TestimonialsUltra() {
  const ref = useReveal(0.08);
  const rowA = QUOTES.filter((_, i) => i % 2 === 0);
  const rowB = QUOTES.filter((_, i) => i % 2 === 1);
  return (
    <section className="pu-social" ref={ref}>
      <div className="pu-social-heading">
        <span className="pu-eyebrow">Beta testers</span>
        <h2 className="pu-h2">
          O que estão falando sobre o <span>Profit Ultra</span>?
        </h2>
        <p className="pu-sub">Mensagens dos beta testers enviadas via Connect.</p>
      </div>

      <div className="pu-marquee" aria-hidden="false">
        <div className="pu-marquee-row pu-marquee-a">
          {[...rowA, ...rowA].map((q, i) => <QuoteCard q={q} key={`a${i}`} />)}
        </div>
        <div className="pu-marquee-row pu-marquee-b">
          {[...rowB, ...rowB].map((q, i) => <QuoteCard q={q} key={`b${i}`} />)}
        </div>
      </div>

      <figure className="pu-endorse">
        <div className="pu-endorse-glow" aria-hidden="true" />
        <blockquote>
          “Para nós que somos sardinhas do mercado, com o Motion Tracker
          conseguimos ver onde as grandes instituições estão posicionadas em
          determinado ativo. Isso ajuda o cardume a nadar junto com os tubarões.”
        </blockquote>
        <figcaption>
          <strong>Márcio Kieling</strong>
          <span>Ator e trader</span>
        </figcaption>
      </figure>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Final CTA                                                         */
/* ---------------------------------------------------------------- */

function FinalCta() {
  const ref = useReveal();
  return (
    <section className="pu-final" ref={ref}>
      <div className="pu-final-glow" aria-hidden="true" />
      <img className="pu-final-logo" src={ULTRA_LOGO} alt="Profit Ultra" />
      <h2 className="pu-h2">Opere no máximo. Opere no Ultra.</h2>
      <ButtonRow
        actions={[{ label: "Testar grátis por 15 dias", href: "#plano", variant: "gradient" }]}
      />
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function ProfitUltraPage() {
  return (
    <>
      <SiteHeader />
      <main className="pu-page">
        <UltraHero />
        <InsideTrackSection />
        <FeaturesSection />
        <RemoteSection />
        <CompareSection />
        <PricingSection />
        <BrokersSection />
        <TestimonialsUltra />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
