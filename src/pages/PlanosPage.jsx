import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, ButtonRow } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import DarkVeil from "../components/fx/DarkVeil.jsx";
import "../styles/planos.css";

/* ---------------------------------------------------------------- */
/* Shared helpers                                                    */
/* ---------------------------------------------------------------- */

function useReveal(threshold = 0.12, rootMargin = "0px") {
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

function useGlowTracking() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return [ref, onMove];
}

const formatPrice = (v) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const FREQUENCIES = [
  { id: "mensal", label: "Mensal", discount: 0 },
  { id: "semestral", label: "Semestral", discount: 6 },
  { id: "anual", label: "Anual", discount: 11 },
  { id: "bianual", label: "Bianual", discount: 17 },
];

const PLANS = [
  {
    id: "training",
    name: "Profit Training",
    base: 90,
    desc: "Para quem está dando os primeiros passos no mercado.",
    badge: "Somente simulação",
    features: [
      "Aplicativo Mobile",
      "Gráficos Profissionais",
      "Ferramentas de estudo gráfico",
      "Indicadores e osciladores técnicos",
      "Times and Trades (com agressores)",
      "Volume at Price (com agressores)",
      "Chart Trading",
      "Ordens OCO",
      "SuperDOM",
      "Gerenciamento de Risco",
      "Relatório de Performance",
      "Simulador e replay",
    ],
  },
  {
    id: "one",
    name: "Profit One",
    base: 165,
    desc: "Ferramentas essenciais para quem está desenvolvendo suas primeiras estratégias.",
    features: [
      "Sinal Real Time",
      "Diversas corretoras em um único lugar",
      "Gráficos Profissionais",
      "Ferramentas de estudo gráfico",
      "Indicadores e osciladores técnicos",
      "Times and Trades",
      "Volume at Price",
      "Chart Trading",
      "Ordens OCO",
      "Gerenciamento de Risco",
      "Relatório de Performance",
    ],
  },
  {
    id: "plus",
    name: "Profit Plus",
    base: 275,
    desc: "Dê o próximo passo: use indicadores avançados e ordens especiais",
    inherits: "Tudo do Profit One, mais:",
    features: [
      "SuperDOM",
      "Livro Visual",
      "Cross Order no ativo DOLPRO",
      "Times and Trades (com agressores)",
      "Volume at Price (com agressores)",
    ],
  },
  {
    id: "pro",
    name: "Profit Pro",
    base: 385,
    desc: "As ferramentas mais avançadas para você operar como um trader profissional.",
    inherits: "Tudo do Profit Plus, mais:",
    features: [
      "Ordem Original",
      "Filtro no Book",
      "Trailing Stop",
      "Mapa de Fluxo",
      "Volume at Market",
      "Profit News Pro",
      "Curvas de Juros",
      "Pares de Moedas",
      "Módulo de Opções",
      "Autobreakeven",
    ],
  },
  {
    id: "ultra",
    name: "Profit Ultra",
    base: 550,
    desc: "A versão mais completa da plataforma para você operar sem limites.",
    highlight: true,
    highlightLabel: "Mais completo",
    inherits: "Tudo do Profit Pro, mais:",
    features: [
      "Inside Track",
      "Função Copilot",
      "Motion Tracker",
      "Suporte por telefone",
      "Otimização de parâmetros",
      "Replay de múltiplos ativos",
      "Login simultâneo",
      "IV Rank",
      "Visualização de Cripto",
      "Plano de Trade",
      "Plugin Tape Reading",
    ],
  },
];

const ALL = ["training", "one", "plus", "pro", "ultra"];
const FROM_ONE = ["one", "plus", "pro", "ultra"];
const FROM_PLUS = ["plus", "pro", "ultra"];
const FROM_PRO = ["pro", "ultra"];
const ULTRA = ["ultra"];

const EXPLORER = [
  {
    id: "plataformas",
    title: "Plataformas",
    features: [
      { label: "Web", plans: ALL },
      { label: "Mobile", plans: ALL },
      { label: "Desktop Windows e Mac", plans: ALL },
      { label: "Suporte por chat 24/7", plans: ALL },
      { label: "Suporte Ultra por telefone", plans: ULTRA },
      { label: "Login simultâneo", plans: ULTRA },
      { label: "Multibroker", plans: ULTRA },
      { label: "Sinal Real Time", plans: FROM_ONE },
    ],
  },
  {
    id: "graficos",
    title: "Gráficos",
    features: [
      { label: "Gráficos ilimitados", plans: FROM_ONE },
      { label: "Periodicidade flexível", plans: ALL },
      { label: "Ordens no gráfico", plans: ALL },
      { label: "Gráfico Renko", plans: FROM_PLUS },
      { label: "Livro Visual", plans: FROM_PLUS },
      { label: "Gráfico de Segundos", plans: FROM_PRO },
      { label: "Footprint / Tape Reading", plans: FROM_PRO },
      { label: "Visualização de Cripto", plans: ULTRA },
    ],
  },
  {
    id: "tape",
    title: "Tape Reading",
    features: [
      { label: "Livro de Ofertas", plans: FROM_ONE },
      { label: "SuperDOM", plans: ["training", "plus", "pro", "ultra"] },
      { label: "Volume at Price", plans: ALL },
      { label: "Times and Trades", plans: ALL },
      { label: "Mapa de Fluxo", plans: FROM_PRO },
      { label: "Volume at Market", plans: FROM_PRO },
      { label: "Filtros no Book e T&T", plans: FROM_PRO },
    ],
  },
  {
    id: "analise",
    title: "Análise Técnica",
    features: [
      { label: "100+ indicadores", plans: ALL },
      { label: "Indicador VWAP", plans: ALL },
      { label: "Volume Profile", plans: FROM_PLUS },
      { label: "Medidores de Pressão", plans: FROM_PLUS },
      { label: "Análise de Players", plans: FROM_PRO },
      { label: "Ranking de Ativos", plans: FROM_PRO },
    ],
  },
  {
    id: "negociacao",
    title: "Negociação",
    features: [
      { label: "Simulador", plans: ALL },
      { label: "Chart Trading", plans: ALL },
      { label: "Ordens OCO", plans: ALL },
      { label: "Gerenciamento de Risco", plans: ALL },
      { label: "Relatório de Performance", plans: ALL },
      { label: "Ordem Original", plans: FROM_PRO },
      { label: "Trailing Stop", plans: FROM_PRO },
      { label: "Auto Breakeven", plans: FROM_PRO },
      { label: "Módulo de Opções", plans: FROM_PRO },
      { label: "Copilot IA", plans: ULTRA },
    ],
  },
  {
    id: "automacao",
    title: "Automação & Ultra",
    features: [
      { label: "Backtesting", plans: FROM_PLUS },
      { label: "Estratégias automatizadas", plans: FROM_PLUS },
      { label: "Otimização de parâmetros", plans: ULTRA },
      { label: "Inside Track", plans: ULTRA },
      { label: "Motion Tracker", plans: ULTRA },
      { label: "Replay multi-ativos", plans: ULTRA },
      { label: "IV Rank", plans: ULTRA },
      { label: "Plano de Trade", plans: ULTRA },
    ],
  },
];

const EXPLORER_TABS = [
  { id: "training", label: "Training" },
  { id: "one", label: "One" },
  { id: "plus", label: "Plus" },
  { id: "pro", label: "Pro" },
  { id: "ultra", label: "Ultra", accent: "ultra" },
];

/* ---------------------------------------------------------------- */
/* Sliding tabs                                                      */
/* ---------------------------------------------------------------- */

function SlidingTabs({ options, selected, onSelect, className = "" }) {
  const tabsRef = useRef(null);
  const buttonRefs = useRef({});
  const [indicator, setIndicator] = useState(null);

  const activeOption = options.find((opt) => opt.id === selected);

  useLayoutEffect(() => {
    const update = () => {
      const activeTab = buttonRefs.current[selected];
      const tabs = tabsRef.current;
      if (!activeTab || !tabs) return;
      setIndicator({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
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
    <div className={`pl-tabs ${className}`} role="tablist" ref={tabsRef}>
      {indicator && (
        <span
          className={`pl-tabs-indicator${activeOption?.accent === "ultra" ? " pl-tabs-indicator--ultra" : ""}`}
          style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
          aria-hidden="true"
        />
      )}
      {options.map((opt) => (
        <button
          key={opt.id}
          ref={(node) => { buttonRefs.current[opt.id] = node; }}
          type="button"
          role="tab"
          aria-selected={selected === opt.id}
          className={`pl-tab${selected === opt.id ? " is-active" : ""}`}
          onClick={() => onSelect(opt.id)}
        >
          {opt.label}
          {opt.hint && <em>{opt.hint}</em>}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Hero + pricing cards                                              */
/* ---------------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg className="pl-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="pl-lock" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PlanCard({ plan, discount, index }) {
  const [ref, onMove] = useGlowTracking();
  const price = plan.base * (1 - discount / 100);

  return (
    <article
      ref={ref}
      className={`pl-plan-card${plan.highlight ? " is-highlight" : ""}`}
      style={{ "--i": index }}
      onMouseMove={onMove}
    >
      <span className="pl-plan-glow" aria-hidden="true" />
      {plan.highlight && <span className="pl-plan-flag">{plan.highlightLabel}</span>}
      <header className="pl-plan-head">
        <h3>{plan.name}</h3>
        {plan.badge && <span className="pl-plan-badge">{plan.badge}</span>}
        <p>{plan.desc}</p>
      </header>
      <div className="pl-plan-price">
        <strong>R$ {formatPrice(price)}</strong>
        <span>/mês</span>
      </div>
      {discount > 0 && (
        <span className="pl-plan-was">
          <s>R$ {formatPrice(plan.base)}</s> · economia de {discount}%
        </span>
      )}
      <div className="pl-plan-ctas">
        {plan.highlight && (
          <>
            <Button href="#comece" variant="primary">Testar grátis por 15 dias</Button>
            <span className="pl-plan-cc">Não é necessário cartão de crédito.</span>
          </>
        )}
        <Button href="#comprar" variant={plan.highlight ? "glass" : "dark"}>
          Comprar agora
        </Button>
      </div>
      <div className="pl-plan-features">
        {plan.inherits && <span className="pl-plan-inherits">{plan.inherits}</span>}
        <ul>
          {plan.features.map((f) => (
            <li key={f}>
              <CheckIcon />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PlansHero() {
  const revealRef = useReveal(0.01);
  const [freq, setFreq] = useState("mensal");
  const current = FREQUENCIES.find((f) => f.id === freq);

  const freqTabs = FREQUENCIES.map((f) => ({
    id: f.id,
    label: f.label,
    hint: f.discount > 0 ? `até -${f.discount}%` : null,
  }));

  return (
    <section className="pl-hero" ref={revealRef}>
      <div className="pl-hero-bg" aria-hidden="true">
        <DarkVeil hueShift={210} speed={0.45} warpAmount={0.35} />
        <span className="pl-hero-fade" />
      </div>

      <div className="pl-hero-copy">
        <span className="pl-eyebrow">Planos e preços</span>
        <h1 className="pl-h1">
          Escolha o plano certo<br />
          <span>para a sua operação.</span>
        </h1>
        <p className="pl-sub">
          Do primeiro trade no simulador às ferramentas mais avançadas do mercado.
        </p>
        <SlidingTabs
          className="pl-freq-tabs"
          options={freqTabs}
          selected={freq}
          onSelect={setFreq}
        />
      </div>

      <div className="pl-plans-grid">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} discount={current.discount} index={i} />
        ))}
      </div>

      <p className="pl-footnote">
        * Funcionalidades e valores exclusivos para contratação como pessoa física com a
        Nelogica. Para usuários profissionais e pessoa jurídica entre em contato pelo
        e-mail comercial@nelogica.com.br.
      </p>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Feature explorer                                                  */
/* ---------------------------------------------------------------- */

function ExplorerCard({ category, plan, index }) {
  const [ref, onMove] = useGlowTracking();
  const included = category.features.filter((f) => f.plans.includes(plan)).length;

  return (
    <article className="pl-exp-card" ref={ref} style={{ "--i": index }} onMouseMove={onMove}>
      <span className="pl-plan-glow" aria-hidden="true" />
      <header className="pl-exp-head">
        <h3>{category.title}</h3>
        <span className="pl-exp-count">
          {included}/{category.features.length}
        </span>
      </header>
      <ul className="pl-exp-list">
        {category.features.map((f) => {
          const on = f.plans.includes(plan);
          return (
            <li key={f.label} className={on ? "is-on" : "is-off"}>
              <span className="pl-exp-icon">{on ? <CheckIcon /> : <LockIcon />}</span>
              {f.label}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function FeatureExplorer() {
  const revealRef = useReveal(0.05);
  const [plan, setPlan] = useState("ultra");

  return (
    <section className="pl-explorer" ref={revealRef} id="comparar">
      <div className="pl-explorer-heading">
        <span className="pl-eyebrow">Arsenal incomparável</span>
        <h2 className="pl-h2">Encontre o Profit certo para você.</h2>
        <p className="pl-sub">
          O ecossistema completo para sua performance. Selecione um plano e veja
          instantaneamente as ferramentas incluídas.
        </p>
        <SlidingTabs
          className="pl-explorer-tabs"
          options={EXPLORER_TABS}
          selected={plan}
          onSelect={setPlan}
        />
      </div>
      <div className="pl-exp-grid">
        {EXPLORER.map((cat, i) => (
          <ExplorerCard key={cat.id} category={cat} plan={plan} index={i} />
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
    <section className="pl-final" ref={ref}>
      <span className="pl-final-glow" aria-hidden="true" />
      <h2 className="pl-h2">Comece agora mesmo!</h2>
      <p className="pl-sub">Um novo mundo de possibilidades a poucos cliques de distância.</p>
      <ButtonRow
        actions={[
          { label: "Testar grátis", href: "#comece", variant: "primary" },
          { label: "Ver recursos", href: "#/recursos", variant: "glass" },
        ]}
      />
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function PlanosPage() {
  return (
    <>
      <SiteHeader />
      <main className="pl-page">
        <PlansHero />
        <FeatureExplorer />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
