import { useEffect, useRef, useState } from "react";
import { ProfitWebHero } from "../components/ProfitWebHero.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { ToolResourcesPowerExperiment } from "../components/ToolResourcesPowerExperiment.jsx";
import logoWebstore from "../assets/pw-logo-webstore.png";
import logoNelogica from "../assets/pw-logo-nelogica.png";
import logoProfit from "../assets/pw-logo-profit.png";
import profitWebLoginShot from "../assets/macbook-air-profitweb-grafico.png";

const ACCESS_PLANS = [
  {
    id: "nelostore",
    mark: logoWebstore,
    title: "Contrate o opcional Profit Web",
    description: "A partir de R$ 39,90/mês. Veja os planos disponíveis na NeloStore.",
    href: "#",
    linkLabel: "Ver planos na NeloStore",
  },
  {
    id: "multibroker",
    mark: logoNelogica,
    title: "Clientes Multi-broker",
    description: "Clientes Nelogica com assinatura de qualquer plano do Profit.",
    href: "#",
    linkLabel: "Conhecer os planos Profit",
  },
  {
    id: "ultra",
    mark: logoProfit,
    title: "Planos de teste Profit Ultra",
    description: "Teste o Profit Ultra e garanta acesso a todas as versões do Profit.",
    href: "#",
    linkLabel: "Testar o Profit Ultra",
  },
];

const ADVANTAGES = [
  {
    id: "cloud",
    title: "Mais leve, mais rápido e mais eficiente que nunca",
    description:
      "O Profit Web exige menos do hardware do seu computador, utilizando computação em nuvem para processar os dados.",
  },
  {
    id: "anywhere",
    title: "Acesse em qualquer computador",
    description:
      "O Profit Web pode ser acessado a partir de qualquer computador que possua conexão à internet¹.",
  },
  {
    id: "updates",
    title: "Esqueça as atualizações manuais",
    description:
      "Sempre que utilizá-lo, o Profit Web estará atualizado com as últimas melhorias e funcionalidades disponibilizadas.",
  },
  {
    id: "storage",
    title: "Poupe espaço de armazenamento",
    description:
      "Sem downloads, sem instalações extras. Você acessa a plataforma online e poupa o armazenamento do seu dispositivo.",
  },
];

function AccessSection() {
  return (
    <section className="pw-access" id="acesso">
      <div className="pw-access-inner">
        <div className="pw-access-heading">
          <h2 className="pw-h2">Acesse agora pelo seu navegador.</h2>
          <p className="pw-lead">Disponível exclusivamente para:</p>
        </div>
        <div className="pw-plan-row">
          {ACCESS_PLANS.map((plan) => (
            <a key={plan.id} className="pw-plan" href={plan.href}>
              <span className="pw-plan-mark">
                <img className="pw-plan-mark-img" src={plan.mark} alt="" />
              </span>
              <h3 className="pw-plan-title">{plan.title}</h3>
              <p className="pw-plan-desc">{plan.description}</p>
              <span className="pw-plan-link">
                {plan.linkLabel}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantagesSection() {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(ADVANTAGES[0].id);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          section.classList.add("pw-revealed");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="pw-adv" ref={sectionRef}>
      <div className="pw-adv-glow" aria-hidden="true" />
      <div className="pw-adv-inner">
        <div className="pw-adv-heading">
          <span className="sec-eyebrow">Vantagens do Profit Web</span>
          <h2 className="pw-h2">
            Todo o poder do Profit,<br />direto no navegador.
          </h2>
          <div className="pw-adv-shot-frame">
            <div className="pw-adv-shot-glow" aria-hidden="true" />
            <img
              className="pw-adv-shot"
              src={profitWebLoginShot}
              alt="Profit Web em um MacBook Air"
            />
          </div>
        </div>
        <div className="pw-adv-list">
          {ADVANTAGES.map((adv, i) => (
            <div
              key={adv.id}
              className={`pw-adv-row${activeId === adv.id ? " is-active" : ""}`}
              style={{ "--i": i }}
              onMouseEnter={() => setActiveId(adv.id)}
            >
              <h3 className="pw-adv-title">{adv.title}</h3>
              <p className="pw-adv-desc">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProfitWebPage() {
  return (
    <>
      <SiteHeader />
      <main className="pw-page">
        <ProfitWebHero />
        <AccessSection />
        <AdvantagesSection />
        <ToolResourcesPowerExperiment />
      </main>
      <SiteFooter />
    </>
  );
}
