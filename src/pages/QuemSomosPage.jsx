import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import "../styles/quemsomos.css";

import heroImg from "../../assets/figma-quemsomos/qs-1.jpeg";
import sobreImg from "../../assets/figma-quemsomos/qs-11.jpeg";
import uniaoImg from "../../assets/figma-quemsomos/qs-13.jpeg";
import sedePoa from "../../assets/figma-quemsomos/qs-18.png";
import sedeSp from "../../assets/figma-quemsomos/qs-19.png";
import sedeRj from "../../assets/figma-quemsomos/qs-20.png";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* In-view reveal (adds .is-visible once). */
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-visible");
      return;
    }
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
/* Hero + stats                                                      */
/* ---------------------------------------------------------------- */

/* Count-up: animates the numeric part of the headline on reveal. */
function StatCard({ prefix = "", value, suffix = "", decimals = 0, label, desc, index }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const format = (v) =>
    v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    const num = numRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("is-visible");
      if (num && value != null) num.textContent = format(value);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add("is-visible");
        obs.disconnect();
        if (!num || value == null) return;
        const dur = 1400;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          num.textContent = format(value * ease(p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);

  return (
    <article className="qs-stat" ref={ref} style={{ "--i": index }}>
      <h3 className="qs-stat-title">
        {value != null ? (
          <>
            {prefix}
            <span ref={numRef}>{format(0)}</span>
            {suffix}
          </>
        ) : (
          label
        )}
      </h3>
      <p>{desc}</p>
    </article>
  );
}

function Hero() {
  const ref = useReveal(0.05);
  return (
    <section className="qs-hero" ref={ref}>
      <div className="qs-hero-bg" aria-hidden="true">
        <img src={heroImg} alt="" />
        <span className="qs-hero-shade" />
      </div>
      <div className="qs-hero-inner">
        <span className="qs-eyebrow">Nelogica</span>
        <h1 className="qs-hero-title">Quem somos</h1>
        <p className="qs-hero-copy">
          Com 20 anos no mercado, a Nelogica é uma empresa tech que cria soluções
          de alta tecnologia para o mercado financeiro. É líder de mercado de
          plataformas de investimento na América Latina e responsável pelo maior
          fluxo de ordens enviadas à bolsa de valores no Brasil.
        </p>
      </div>
      <div className="qs-stats">
        <StatCard
          index={0}
          prefix="+ de "
          value={2}
          suffix=" milhões de clientes"
          desc="Entre pessoas físicas e instituições financeiras utilizando nossas soluções diariamente."
        />
        <StatCard
          index={1}
          value={1.2}
          decimals={1}
          suffix=" bilhão de ordens"
          desc="Enviadas e executadas em todas as nossas plataformas no último ano."
        />
        <StatCard
          index={2}
          label="Presença internacional"
          desc="Estamos presentes em mais de 160 países por meio das nossas soluções em tecnologia."
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Timeline                                                          */
/* ---------------------------------------------------------------- */

const MILESTONES = [
  { year: "2003", title: "Fundação da Nelogica", text: "Os sócios e amigos Marcos e Fabiano decidem dar os primeiros passos em busca da democratização do mercado financeiro." },
  { year: "2005", title: "Lançamento do Profit", text: "Em uma sala comercial no sul do Brasil, foi desenvolvida a plataforma mais utilizada por traders em toda a América Latina: o Profit." },
  { year: "2006", title: "Futuro Eletrônico", text: "A bolsa brasileira se torna 100% eletrônica. É oficialmente extinto o famoso pregão presencial." },
  { year: "2012", title: "Conta real", text: "A primeira ordem enviada para a bolsa saída dos nossos servidores é executada com sucesso." },
  { year: "2014", title: "Mercado institucional", text: "As soluções da Nelogica para o mercado corporativo começam a ser adotadas por clientes institucionais em larga escala." },
  { year: "2017", title: "Marco histórico", text: "A Nelogica chega a 100 mil clientes, elevando ainda mais o patamar da empresa e o nível de responsabilidade das entregas." },
  { year: "2018", title: "Profit ganha versão mobile", text: "Com o avanço da tecnologia dos smartphones, o Profit também começou a caber na palma da mão do trader, permitindo negociar de qualquer lugar." },
  { year: "2020", title: "Lançamento do Vector", text: "A Nelogica ingressa no mercado de criptoativos com o Vector, utilizando a experiência de quase 20 anos, sempre entendendo as necessidades do trader e trazendo soluções até então exclusivas para um novo mercado." },
  { year: "2021", title: "1 milhão de clientes", text: "Atingimos a marca de 1 milhão de clientes globalmente, utilizando nossas soluções. Motivo de orgulho e de buscarmos melhorar cada vez mais!" },
  { year: "2023", title: "Lançamento BlackArrow", text: "BlackArrow reúne o que temos de mais avançado em termos de análise, negociação e segurança. Nossa mais poderosa plataforma até agora apresenta a solução que faltava, sem limites para negociação de ativos ao redor do mundo." },
];

function TimelineItem({ m, side, lit }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <li
      className={`qs-tl-item qs-tl-${side}${visible ? " is-visible" : ""}${lit ? " is-lit" : ""}`}
      ref={ref}
    >
      <span className="qs-tl-dot" aria-hidden="true" />
      <span className="qs-tl-year">{m.year}</span>
      <div className="qs-tl-card">
        <h3>{m.title}</h3>
        <p>{m.text}</p>
      </div>
    </li>
  );
}

function TimelineSection() {
  const headRef = useReveal();
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const [litCount, setLitCount] = useState(0);
  const litRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    if (prefersReducedMotion()) {
      fill.style.transform = "scaleY(1)";
      setLitCount(MILESTONES.length + 1);
      return;
    }

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    let rafId;
    let last = -1;

    const tick = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress of the line: fills as the section scrolls past the
      // viewport's 70% mark.
      const p = clamp((vh * 0.7 - rect.top) / rect.height, 0, 1);
      if (p !== last) {
        last = p;
        fill.style.transform = `scaleY(${p})`;

        // Light up each milestone whose dot the fill has passed.
        const items = track.querySelectorAll(".qs-tl-item");
        let count = 0;
        const fillY = rect.top + rect.height * p;
        items.forEach((it) => {
          if (it.getBoundingClientRect().top + 14 <= fillY) count += 1;
        });
        if (count !== litRef.current) {
          litRef.current = count;
          setLitCount(count);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="qs-timeline" ref={headRef}>
      <div className="qs-section-heading">
        <span className="qs-eyebrow">Nossa trajetória</span>
        <h2 className="qs-h2">A nossa história começou em 2003</h2>
      </div>
      <div className="qs-tl-track" ref={trackRef}>
        <span className="qs-tl-line" aria-hidden="true">
          <span className="qs-tl-line-fill" ref={fillRef} />
        </span>
        <ol className="qs-tl-list">
          {MILESTONES.map((m, i) => (
            <TimelineItem key={m.year} m={m} side={i % 2 === 0 ? "left" : "right"} lit={i < litCount} />
          ))}
          <li className={`qs-tl-item qs-tl-cap${litCount > MILESTONES.length ? " is-lit" : ""}`}>
            <span className="qs-tl-dot" aria-hidden="true" />
            <div className="qs-tl-card qs-tl-card-cap">
              <h3>O futuro do mercado financeiro</h3>
              <p>
                Queremos fazer parte da democratização do mercado financeiro ao
                redor do mundo. Onde houver um trader, estaremos levando nossas
                soluções em tecnologia.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Sobre / União / Sedes / CTA                                       */
/* ---------------------------------------------------------------- */

/* Subtle parallax drift on an image as it crosses the viewport. */
function useParallax(strength = 32) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    let rafId;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const progress = clamp(1 - center / vh, 0, 1);
      el.style.transform = `translateY(${(0.5 - progress) * strength}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [strength]);
  return ref;
}

function SobreSection() {
  const ref = useReveal(0.12);
  const parallaxRef = useParallax(38);
  return (
    <section className="qs-sobre" ref={ref}>
      <div className="qs-sobre-media">
        <img ref={parallaxRef} src={sobreImg} alt="Escritório da Nelogica" loading="lazy" />
      </div>
      <div className="qs-sobre-copy">
        <span className="qs-eyebrow">Sobre a Nelogica</span>
        <h2 className="qs-h2">Transformar e democratizar o mercado financeiro</h2>
        <p>
          A história da nossa empresa começou em 2003, quando os sócios e amigos
          Marcos Boschetti e Fabiano Kerber pensaram em transformar e
          democratizar o mercado financeiro.
        </p>
        <p>
          Isso foi possível com o desenvolvimento de uma plataforma de trading
          completa e acessível, recurso até então disponível somente grandes
          bancos e escritórios de investimento.
        </p>
        <p>
          Desde então, a partir do lançamento do Profit, em 2005, a Nelogica tem
          se aperfeiçoado constantemente com base no conhecimento adquirido ao
          longo dos anos e também com as sugestões dos clientes.
        </p>
      </div>
    </section>
  );
}

function UniaoSection() {
  const ref = useReveal(0.12);
  return (
    <section className="qs-uniao" ref={ref}>
      <div className="qs-uniao-copy">
        <span className="qs-eyebrow">Nosso time</span>
        <h2 className="qs-h2">União de esforços</h2>
        <p>
          Times de tecnologia, produto, dados e atendimento trabalham lado a
          lado, todos os dias, para entregar as melhores soluções ao trader.
          É essa colaboração constante que transforma boas ideias nos produtos
          mais utilizados do mercado financeiro da América Latina.
        </p>
      </div>
      <div className="qs-uniao-media">
        <img src={uniaoImg} alt="Equipes da Nelogica trabalhando juntas" loading="lazy" />
      </div>
    </section>
  );
}

const OFFICES = [
  { img: sedePoa, city: "Porto Alegre", tag: "Matriz", address: "Av. Carlos Gomes, 466 — Porto Alegre - RS, 90480-000" },
  { img: sedeSp, city: "São Paulo", address: "Av. Brigadeiro Faria Lima, 4055, sala 301 — São Paulo - SP, 04538-133" },
  { img: sedeRj, city: "Rio de Janeiro", address: "Av. Ataulfo de Paiva, 1120, sala 301 — Rio de Janeiro - RJ, 22440-035" },
];

function SedesSection() {
  const ref = useReveal(0.1);
  return (
    <section className="qs-sedes" ref={ref}>
      <div className="qs-section-heading">
        <span className="qs-eyebrow">Sedes</span>
        <h2 className="qs-h2">Conheça os endereços de nossas sedes</h2>
      </div>
      <div className="qs-sedes-grid">
        {OFFICES.map((o, i) => (
          <article className="qs-sede" key={o.city} style={{ "--i": i }}>
            <div className="qs-sede-media">
              <img src={o.img} alt={`Sede de ${o.city}`} loading="lazy" />
            </div>
            <div className="qs-sede-body">
              <h3>
                {o.city}
                {o.tag && <span className="qs-sede-tag">{o.tag}</span>}
              </h3>
              <p>{o.address}</p>
              <a
                className="qs-sede-map"
                href={`https://www.google.com/maps/search/${encodeURIComponent(o.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver no mapa
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  const ref = useReveal();
  return (
    <section className="qs-final" ref={ref}>
      <div className="qs-final-glow" aria-hidden="true" />
      <h2 className="qs-h2">Comece agora mesmo</h2>
      <Button href="#comece" variant="gradient">Testar grátis</Button>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function QuemSomosPage() {
  return (
    <>
      <SiteHeader />
      <main className="qs-page">
        <Hero />
        <TimelineSection />
        <SobreSection />
        <UniaoSection />
        <SedesSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
