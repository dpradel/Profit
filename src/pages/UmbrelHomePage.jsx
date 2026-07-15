import { ProductPageFooter } from "../components/ProductPageFooter.jsx";
import { ProductPageHeader } from "../components/ProductPageHeader.jsx";
import {
  controlCards,
  homeAppCards,
  homeHardwareStats,
  homeHero,
  homeNavLinks,
  homeOs,
  homeProduct,
  homeSpecs,
  setup,
} from "../data/umbrelHomeData.jsx";

function PlusIcon() {
  return <span aria-hidden="true">+</span>;
}

export function UmbrelHomePage() {
  return (
    <div className="home-device-page">
      <ProductPageHeader
        navLinks={homeNavLinks}
        ariaLabel="Recursos navigation"
        buyHref="/recursos#buy"
        actionLabel="Testar grátis"
        flag="https://umbrel.com/flags/br.svg"
        flagAlt="Brazil"
      />

      <main>
        <section className="home-hero">
          <video className="home-hero-media" autoPlay muted loop playsInline preload="auto" poster={homeHero.poster}>
            <source src={homeHero.video} type="video/mp4" />
          </video>
          <div className="home-hero-shade" />
          <div className="home-hero-card">
            <p>{homeHero.eyebrow}</p>
            <h1>
              {homeHero.title} <span>{homeHero.accent}</span>
            </h1>
            <strong>{homeHero.description}</strong>
            <div className="home-hero-buy">
              <a href={`${import.meta.env.BASE_URL}#comece`}>Testar grátis</a>
              <div>
                <b>{homeHero.price}</b>
                <small>{homeHero.delivery}</small>
              </div>
            </div>
          </div>
          <a className="home-watch" href={homeHero.announcementUrl}>
            <span className="play-button" aria-hidden="true"></span>
            <small>Começar agora</small>
          </a>
        </section>

        <section className="home-steroids">
          <div className="home-section-heading">
            <h2>Recursos para operar com mais contexto.</h2>
            <p>Conheça o que você pode fazer com o Profit</p>
          </div>
          <div className="home-app-grid">
            {homeAppCards.map((card) => (
              <article key={card.label} className="home-app-card">
                <img src={card.image} alt="" loading="lazy" />
                <div>
                  <h3>{card.label}</h3>
                  <PlusIcon />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-powerhouse">
          <div className="home-section-heading">
            <p>Ferramentas para diferentes estilos de operação.</p>
            <h2>
              Leitura, execução e gestão.
              <br />
              Tudo conectado ao seu fluxo.
            </h2>
          </div>
          <img className="home-hand-device" src={homeProduct.hero} alt="" loading="lazy" />
          <div className="home-feature-grid">
            {homeProduct.tiles.map((tile) => (
              <article key={tile.title} className="home-feature-tile">
                {tile.eyebrow ? <span>{tile.eyebrow}</span> : null}
                <h3>{tile.title}</h3>
                <p>{tile.description}</p>
                <img src={tile.image} alt="" loading="lazy" />
              </article>
            ))}
          </div>
        </section>

        <section className="home-control">
          <div className="home-control-intro">
            <h2>Por que o Profit é a melhor opção?</h2>
            <p>
              Porque uma plataforma de trading precisa unir profundidade técnica, estabilidade, velocidade e suporte.
              O Profit foi criado para acompanhar a rotina real de quem decide com o mercado aberto.
            </p>
          </div>
          <div className="home-control-grid">
            {controlCards.map((card) => (
              <article key={card.title}>
                <i aria-hidden="true"></i>
                <p>
                  <strong>{card.title}</strong> {card.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-hardware">
          <div className="home-section-heading">
            <h2>Infraestrutura e recursos para alta performance.</h2>
            <p>Uma combinação de dados, ferramentas e suporte para operar com consistência.</p>
          </div>
          <div className="home-stat-grid">
            {homeHardwareStats.map((stat) => (
              <article key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="home-setup">
          <div className="home-section-heading">
            <h2>Comece do seu jeito.</h2>
            <p>Configure a plataforma para o seu perfil, sua corretora e sua rotina operacional.</p>
          </div>
          <div className="home-setup-layout">
            <div className="home-setup-steps">
              {setup.steps.map((step) => (
                <article key={step.title}>
                  <span></span>
                  <p>
                    <strong>{step.title}</strong> {step.text}
                  </p>
                </article>
              ))}
            </div>
            <img src={setup.image} alt="" loading="lazy" />
          </div>
        </section>

        <section className="home-os">
          <div className="home-section-heading">
            <h2>
              Sua rotina de mercado. Em qualquer <span>dispositivo.</span>
            </h2>
            <p>Acesse pelo desktop, celular, tablet ou navegador, com layouts e configurações sincronizados.</p>
          </div>
          <div className="home-os-devices" aria-hidden="true">
            <img className="home-os-laptop" src={homeOs.devices.laptop} alt="" loading="lazy" />
            <img className="home-os-tablet" src={homeOs.devices.tablet} alt="" loading="lazy" />
            <img className="home-os-phone" src={homeOs.devices.phone} alt="" loading="lazy" />
          </div>
          <div className="home-os-note">
            <strong>Profit Web.</strong> Acesso direto pelo navegador, sem instalação.
          </div>
          <div className="home-os-files">
            <div>
              <h3>Profit Mobile.</h3>
              <p>Acompanhe mercado, posições e estudos mesmo quando estiver longe do desktop.</p>
              <a href={`${import.meta.env.BASE_URL}#comece`}>Testar grátis</a>
            </div>
            <img src={homeOs.files} alt="" loading="lazy" />
          </div>
        </section>

        <section className="home-migration">
          <div className="home-section-heading">
            <h2>Já usa uma plataforma de trading?</h2>
            <p>Migre seus estudos para uma experiência mais completa, estável e conectada.</p>
          </div>
          <img src={homeOs.migration} alt="" loading="lazy" />
        </section>

        <section className="home-specs">
          <img src={homeSpecs.image} alt="" loading="lazy" />
          <div className="home-spec-copy">
            <p>RECURSOS</p>
            <h2>Recursos</h2>
            <span>O conjunto essencial para sua rotina no mercado</span>
            <dl>
              {homeSpecs.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="home-spec-buy">
              <a href={`${import.meta.env.BASE_URL}#comece`}>Testar grátis</a>
              <div>
                <b>{homeHero.price}</b>
                <small>{homeHero.delivery}</small>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ProductPageFooter
        title="Tudo que você precisa para operar melhor."
        subtitle="Explore os recursos do Profit, teste grátis por 15 dias e escolha o plano ideal para sua rotina."
        actionHref="/#comece"
        actionLabel="Testar grátis"
      />
    </div>
  );
}
