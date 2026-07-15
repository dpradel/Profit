import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import DarkVeil from "../components/fx/DarkVeil.jsx";
import "../styles/contato.css";
import hqPoa from "../../assets/figma-contato/ct-1.png";
import hqSp from "../../assets/figma-contato/ct-12.png";
import hqRio from "../../assets/figma-contato/ct-14.png";

/* In-view reveal (same pattern as ProfitUltraPage) */
function useReveal(threshold = 0.15, rootMargin = "0px") {
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
/* Hero                                                              */
/* ---------------------------------------------------------------- */

function ContatoHero() {
  return (
    <section className="ct-hero">
      <div className="ct-hero-veil" aria-hidden="true">
        <DarkVeil hueShift={210} speed={0.45} warpAmount={0.35} />
      </div>
      <div className="ct-hero-fade" aria-hidden="true" />
      <div className="ct-hero-copy">
        <span className="ct-eyebrow">Fale com a Nelogica</span>
        <h1 className="ct-hero-title">Contato</h1>
        <p className="ct-hero-sub">Como podemos ajudar? Entre em contato conosco.</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Channels                                                          */
/* ---------------------------------------------------------------- */

const CHANNEL_ICONS = {
  suporte: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M3 15a2 2 0 0 1 2-2h1v5H5a2 2 0 0 1-2-2v-1z" />
      <path d="M21 15a2 2 0 0 0-2-2h-1v5h1a2 2 0 0 0 2-2v-1z" />
      <path d="M19 18v1a2 2 0 0 1-2 2h-3" />
    </svg>
  ),
  relacionamento: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  financeiro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  ),
  comercial: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  ),
  imprensa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8a4 4 0 0 0-4 4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a4 4 0 0 0-4-4z" />
      <path d="M12 8V4" />
      <path d="M5 12H3M21 12h-2M6.3 6.3 4.9 4.9M17.7 6.3l1.4-1.4" />
    </svg>
  ),
};

const CHANNELS = [
  {
    id: "suporte",
    title: "Suporte",
    desc: "Para resolução de problemas técnicos em nossas plataformas, entre em contato com nosso time de suporte disponível 24h por dia e 7 dias por semana, por e-mail ou pelo chat em nossa Central de Ajuda.",
    email: "suporte@nelogica.com.br",
  },
  {
    id: "relacionamento",
    title: "Relacionamento",
    desc: "Se você é nosso cliente e tem dúvidas sobre os nossos produtos e seu funcionamento, entre em contato com nosso setor de relacionamento.",
    email: "relacionamento@nelogica.com.br",
  },
  {
    id: "financeiro",
    title: "Financeiro",
    desc: "Precisando consultar suas informações financeiras, entre em contato com nossa equipe.",
    email: "pagamentos@nelogica.com.br",
  },
  {
    id: "comercial",
    title: "Comercial",
    desc: "Se você deseja solicitar uma demonstração ou contratar nossos produtos, entre em contato para ser atendido por nossa equipe altamente qualificada.",
    email: "comercial@nelogica.com.br",
  },
  {
    id: "imprensa",
    title: "Imprensa",
    desc: "Para pedidos especiais, como entrevistas, informações e materiais específicos, entre em contato com o nosso Assessoria de Imprensa.",
    email: "press@nelogica.com.br",
  },
];

function ChannelsSection() {
  const ref = useReveal(0.08);
  return (
    <section className="ct-channels" ref={ref}>
      <div className="ct-channels-grid">
        {CHANNELS.map((c, i) => (
          <article className="ct-channel" key={c.id} style={{ "--i": i }}>
            <span className="ct-channel-icon">{CHANNEL_ICONS[c.id]}</span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <a className="ct-channel-mail" href={`mailto:${c.email}`}>
              {c.email}
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Form                                                              */
/* ---------------------------------------------------------------- */

const SUBJECTS = ["Suporte", "Relacionamento", "Financeiro", "Comercial", "Imprensa", "Outro"];

function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="ct-form-card ct-form-success" role="status">
        <span className="ct-success-ring">
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <circle className="ct-success-circle" cx="26" cy="26" r="24" fill="none" />
            <path className="ct-success-check" d="M14 27l8 8 16-17" fill="none" />
          </svg>
        </span>
        <h3>Mensagem enviada!</h3>
        <p>Retornaremos em breve.</p>
      </div>
    );
  }

  return (
    <form className="ct-form-card" onSubmit={onSubmit} noValidate>
      <h3 className="ct-form-title">Entre em contato</h3>

      <label className="ct-field">
        <span>Nome*</span>
        <input type="text" name="nome" required placeholder="Seu nome completo" />
      </label>

      <label className="ct-field">
        <span>E-mail*</span>
        <input type="email" name="email" required placeholder="voce@email.com" />
      </label>

      <label className="ct-field">
        <span>Assunto*</span>
        <select name="assunto" required defaultValue="">
          <option value="" disabled>Selecione um assunto</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <label className="ct-field">
        <span>Mensagem*</span>
        <textarea name="mensagem" required rows={5} placeholder="Escreva sua mensagem..." />
      </label>

      <button type="submit" className="ct-submit">
        Enviar
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

function FormSection() {
  const ref = useReveal(0.08);
  return (
    <section className="ct-formsec" ref={ref}>
      <div className="ct-formsec-glow" aria-hidden="true" />
      <div className="ct-formsec-inner">
        <div className="ct-formsec-copy">
          <h2 className="ct-h2">Envie dúvidas, comentários e sugestões para a nossa equipe.</h2>
          <p className="ct-body">
            Acesse nossa central de dúvidas frequentes. Caso você não encontre a
            resposta para sua pergunta, entre em contato conosco.
          </p>
          <a className="ct-faq-link" href="https://ajuda.nelogica.com.br" target="_blank" rel="noopener noreferrer">
            Acessar dúvidas frequentes
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Sedes                                                             */
/* ---------------------------------------------------------------- */

const OFFICES = [
  {
    id: "poa",
    city: "Porto Alegre",
    tag: "Matriz",
    address: "Av. Carlos Gomes, 466",
    zip: "Porto Alegre - RS, 90480-000",
    photo: hqPoa,
  },
  {
    id: "sp",
    city: "São Paulo",
    tag: null,
    address: "Av. Brigadeiro Faria Lima, 4055, sala 301",
    zip: "São Paulo - SP, 04538-133",
    photo: hqSp,
  },
  {
    id: "rio",
    city: "Rio de Janeiro",
    tag: null,
    address: "Av. Ataulfo de Paiva, 1120, sala 301",
    zip: "Rio de Janeiro - RJ, 22440-035",
    photo: hqRio,
  },
];

function OfficesSection() {
  const ref = useReveal(0.08);
  return (
    <section className="ct-offices" ref={ref}>
      <div className="ct-offices-heading">
        <span className="ct-eyebrow">Nossas sedes</span>
        <h2 className="ct-h2">Conheça os endereços de nossas sedes</h2>
      </div>
      <div className="ct-offices-grid">
        {OFFICES.map((o, i) => (
          <article className="ct-office" key={o.id} style={{ "--i": i }}>
            <div className="ct-office-photo">
              <img src={o.photo} alt={`Sede da Nelogica em ${o.city}`} loading="lazy" />
            </div>
            <div className="ct-office-info">
              <h3>
                {o.city}
                {o.tag && <span className="ct-office-tag">{o.tag}</span>}
              </h3>
              <p>{o.address}</p>
              <p className="ct-office-zip">{o.zip}</p>
            </div>
          </article>
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
    <section className="ct-final" ref={ref}>
      <div className="ct-final-glow" aria-hidden="true" />
      <h2 className="ct-h2">Comece agora mesmo!</h2>
      <p className="ct-body">Cadastre-se hoje e teste nossa plataforma por 14 dias!</p>
      <Button href="#comece" variant="gradient">Iniciar teste grátis</Button>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function ContatoPage() {
  return (
    <>
      <SiteHeader />
      <main className="ct-page">
        <ContatoHero />
        <ChannelsSection />
        <FormSection />
        <OfficesSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
