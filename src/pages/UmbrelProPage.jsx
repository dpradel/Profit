import { useEffect } from "react";
import { ProCompareTable } from "../components/ProCompareTable.jsx";
import { ProFaq } from "../components/ProFaq.jsx";
import { ProHero } from "../components/ProHero.jsx";
import { ProMediaCard } from "../components/ProMediaCard.jsx";
import { ProSectionHeading } from "../components/ProSectionHeading.jsx";
import { ProductPageFooter } from "../components/ProductPageFooter.jsx";
import { ProductPageHeader } from "../components/ProductPageHeader.jsx";
import {
  announcement,
  browserStack,
  crafted,
  hardwareFeatures,
  osFeatures,
  setupSteps,
  specs,
  useCases,
} from "../data/umbrelProData.jsx";

export function UmbrelProPage() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, []);

  return (
    <div className="pro-page">
      <ProductPageHeader flag="https://umbrel.com/flags/br.svg" flagAlt="Brazil" />
      <main>
        <ProHero />

        <section className="pro-announcement">
          <div className="pro-announcement-copy">
            <p>{announcement.eyebrow}</p>
            <h2>{announcement.title}</h2>
          </div>
          <a className="announcement-card" href="https://www.youtube.com/@umbrel" aria-label={announcement.action}>
            <img src={announcement.media} alt="" />
            <span className="play-button" aria-hidden="true"></span>
            <b>{announcement.action}</b>
            <small>{announcement.duration}</small>
          </a>
        </section>

        <section className="pro-promise">
          <ProSectionHeading
            eyebrow="Pare de improvisar. Opere com estrutura profissional."
            title={
              <>
                Mais contexto para decidir.
                <br />
                Mais controle para executar.
              </>
            }
          />
          <div className="use-case-grid">
            {useCases.map((item, index) => (
              <ProMediaCard key={item.title} {...item} className={index === 0 ? "wide" : ""} />
            ))}
          </div>
        </section>

        <section className="pro-hardware">
          <div className="hardware-grid">
            {hardwareFeatures.map((item) => (
              <ProMediaCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section className="pro-os">
          <div className="pro-os-intro">
            <ProSectionHeading eyebrow="Powered by Profit" title="A plataforma completa, elevada ao Ultra." align="left">
              <p>
                O Profit Ultra combina análise, execução, automação e IA em uma experiência premium para traders
                que precisam operar com velocidade, profundidade e consistência.
              </p>
              <a href="#/recursos">Explorar recursos</a>
            </ProSectionHeading>
            <div className="browser-stack" aria-hidden="true">
              {browserStack.map((image, index) => (
                <img key={image} src={image} alt="" style={{ "--stack-index": index }} />
              ))}
            </div>
          </div>

          <div className="os-feature-grid">
            {osFeatures.map((item) => (
              <article className="os-feature" key={item.title}>
                <img src={item.image} alt="" loading="lazy" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pro-setup" id="setup">
          <ProSectionHeading eyebrow="Do primeiro acesso ao workspace pronto." title="Configure o Ultra para sua rotina." align="left" />
          <div className="setup-layout">
            <img src="https://umbrel.com/umbrel-pro/setup/insert-ssds.jpg" alt="" loading="lazy" />
            <div className="setup-steps">
              {setupSteps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pro-specs" id="specs">
          <ProSectionHeading eyebrow="Feito para performance" title="Os recursos que importam." />
          <div className="spec-grid">
            {specs.map((item) => (
              <article key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <div className="connections-card">
            <div>
              <p>Tudo conectado</p>
              <h3>Da análise à execução.</h3>
            </div>
            <img src={crafted.back} alt="" loading="lazy" />
          </div>
        </section>

        <section className="pro-crafted" id="design">
          <div className="crafted-copy">
            <h2>Criado<br />para alta performance.</h2>
            <p>
              O Ultra foi pensado para traders que precisam de uma plataforma capaz de acompanhar decisões rápidas,
              múltiplos ativos e leituras profundas sem quebrar o ritmo da operação.
            </p>
            <p>
              É o Profit com mais inteligência, mais automação e mais recursos para transformar análise, execução e
              revisão em um fluxo contínuo.
            </p>
          </div>
          <div className="crafted-media">
            <video autoPlay muted loop playsInline poster={crafted.poster}>
              <source src={crafted.video} type="video/mp4" />
            </video>
            <span className="play-button crafted-play" aria-hidden="true"></span>
            <span>Conheça a evolução do Profit Ultra</span>
            <small>2:17</small>
          </div>
        </section>

        <ProCompareTable />
        <ProFaq />
      </main>
      <ProductPageFooter
        title="Todo o poder do Profit, elevado à máxima potência."
        subtitle="Teste grátis por 15 dias ou consulte condições especiais pela sua corretora parceira."
        actionHref="/#comece"
        actionLabel="Testar grátis"
      />
    </div>
  );
}
