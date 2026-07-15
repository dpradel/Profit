import { useEffect, useRef } from "react";
import mockupDesktop from "../assets/mockup-desktop.png";
import mockupLaptop from "../assets/mockup-laptop.png";
import mockupTablet from "../assets/mockup-tablet.png";
import mockupPhone from "../assets/mockup-phone.png";
import iconAppStore from "../assets/icon-app-store.svg";
import iconPlayStore from "../assets/icon-play-store.svg";

const FLOAT_CARDS = [
  { id: "sync",   text: "Sincronização em tempo real entre dispositivos" },
  { id: "cloud",  text: "Configurações e layouts salvos na nuvem" },
  { id: "auth",   text: "Segurança com autenticação em dois fatores" },
  { id: "uptime", text: "Disponível 24 horas por dia, 7 dias por semana" },
];

export function PlatformSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          section.classList.add("plt-revealed");
          revealObs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    revealObs.observe(section);

    return () => {
      revealObs.disconnect();
    };
  }, []);

  return (
    <section className="plt-section" ref={sectionRef}>
      <div className="plt-bg-glow" aria-hidden="true" />

      {/* Header */}
      <div className="plt-header">
        <span className="sec-eyebrow">Multiplataforma</span>
        <h2 className="plt-h2">
          Windows, macOS, iOS,<br />
          Android e Web.
        </h2>
        <p className="plt-lead">
          Um único Profit, disponível em todos os seus dispositivos,
          sempre sincronizado em tempo real.
        </p>
      </div>

      {/* Device composition */}
      <div className="plt-scene-wrap">

        <div className="plt-laptop-anchor">

          {/* Monitor */}
          <div className="plt-dev-pos--monitor">
            <div className="plt-float-block" aria-hidden="true">
              {FLOAT_CARDS.map((card) => (
                <div key={card.id} className="plt-float-item">{card.text}</div>
              ))}
            </div>
            <div className="plt-dev-hover-wrap">
              <div className="plt-dev-mover">
                <img className="plt-mockup-img" src={mockupDesktop} alt="Profit no desktop" />
              </div>
              <div className="plt-hover-card" aria-hidden="true">
                <div className="plt-hover-card-inner">
                  <span className="plt-hover-chip">Windows</span>
                  <span className="plt-hover-chip">macOS</span>
                </div>
                <p className="plt-hover-subtitle">Aplicativo desktop completo</p>
              </div>
            </div>
          </div>

          {/* Laptop */}
          <div className="plt-dev-pos--laptop">
            <div className="plt-float-block" aria-hidden="true">
              {FLOAT_CARDS.map((card) => (
                <div key={card.id} className="plt-float-item">{card.text}</div>
              ))}
            </div>
            <div className="plt-dev-hover-wrap">
              <div className="plt-dev-mover">
                <img className="plt-mockup-img" src={mockupLaptop} alt="Profit no browser" />
              </div>
              <div className="plt-hover-card" aria-hidden="true">
                <div className="plt-hover-card-inner">
                  <span className="plt-hover-chip">Web Browser</span>
                </div>
                <p className="plt-hover-subtitle">Acesso direto, sem instalação</p>
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div className="plt-dev-pos--tablet">
            <div className="plt-float-block" aria-hidden="true">
              {FLOAT_CARDS.map((card) => (
                <div key={card.id} className="plt-float-item">{card.text}</div>
              ))}
            </div>
            <div className="plt-dev-hover-wrap">
              <div className="plt-dev-mover">
                <img className="plt-mockup-img" src={mockupTablet} alt="Profit no tablet" />
              </div>
              <div className="plt-hover-card" aria-hidden="true">
                <div className="plt-hover-card-inner">
                  <span className="plt-hover-chip">Tablet</span>
                </div>
                <p className="plt-hover-subtitle">Interface otimizada</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="plt-dev-pos--phone">
            <div className="plt-float-block" aria-hidden="true">
              {FLOAT_CARDS.map((card) => (
                <div key={card.id} className="plt-float-item">{card.text}</div>
              ))}
            </div>
            <div className="plt-dev-hover-wrap">
              <div className="plt-dev-mover">
                <img className="plt-mockup-img" src={mockupPhone} alt="Profit no celular" />
              </div>
              <div className="plt-hover-card" aria-hidden="true">
                <div className="plt-hover-card-inner">
                  <span className="plt-hover-chip">iOS</span>
                  <span className="plt-hover-chip">Android</span>
                </div>
                <p className="plt-hover-subtitle">App nativo mobile</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Store buttons */}
      <div className="plt-store-row">
        <a href="https://apps.apple.com/" className="plt-store-btn" target="_blank" rel="noopener noreferrer" aria-label="Disponível na App Store">
          <img src={iconAppStore} alt="" />
          <span>
            <span className="plt-store-label">Disponível na</span>
            <span className="plt-store-name">App Store</span>
          </span>
        </a>
        <a href="https://play.google.com/" className="plt-store-btn" target="_blank" rel="noopener noreferrer" aria-label="Disponível no Google Play">
          <img src={iconPlayStore} alt="" />
          <span>
            <span className="plt-store-label">Disponível no</span>
            <span className="plt-store-name">Google Play</span>
          </span>
        </a>
      </div>

    </section>
  );
}
