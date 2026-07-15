import { useRef } from "react";
import { useInView } from "../hooks/useInView.js";
import { Button } from "./Button.jsx";

const logos = [
  { file: "agora-investimentos.svg", label: "Agora Investimentos" },
  { file: "capital.svg",             label: "Capital" },
  { file: "clear-corretora.svg",     label: "Clear Corretora" },
  { file: "genial-investimentos.svg",label: "Genial Investimentos" },
  { file: "guide-investimentos.svg", label: "Guide Investimentos" },
  { file: "itau-corretora-e-ion-itau.svg", label: "Itaú Corretora" },
  { file: "logo_ativa.svg",          label: "Ativa Investimentos" },
  { file: "logo_btg.svg",            label: "BTG Pactual" },
  { file: "logo_xp.svg",             label: "XP Investimentos" },
  { file: "master-corretora.svg",    label: "Master Corretora" },
  { file: "orama.svg",               label: "Órama" },
  { file: "rico.svg",                label: "Rico" },
  { file: "terra-investimentos.svg", label: "Terra Investimentos" },
  { file: "toro.svg",                label: "Toro" },
];

export function AppStoreSection() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const track = [...logos, ...logos];

  return (
    <section className={`corretoras-section${inView ? " is-visible" : ""}`} ref={ref}>
      <div className="corretoras-blob corretoras-blob-a" aria-hidden="true" />
      <div className="corretoras-blob corretoras-blob-b" aria-hidden="true" />
      <div className="corretoras-blob corretoras-blob-c" aria-hidden="true" />
      <div className="corretoras-noise" aria-hidden="true" />

      <div className="corretoras-inner">
        <div className="corretoras-icon-wrap" aria-hidden="true">
          <div className="corretoras-icon-glow" />
          <img className="corretoras-icon" src={`${import.meta.env.BASE_URL}icone-profit.svg`} alt="" />
        </div>

        <div className="corretoras-copy">
          <p className="corretoras-eyebrow">Corretoras parceiras</p>
          <h2 className="corretoras-heading">
            Confira as ofertas especiais<br />de corretoras parceiras!
          </h2>
          <p className="corretoras-body">
            As corretoras parceiras da Nelogica possuem ofertas especiais para traders. Confira as condições da sua corretora para conseguir ótimos descontos ou até mesmo isenção da assinatura.
          </p>
          <Button href="#corretoras" variant="primary">Conferir</Button>
        </div>
      </div>

      <div className="corretoras-carousel-wrap">
        <div className="corretoras-carousel">
          <div className="corretoras-track">
            {track.map((logo, i) => (
              <div className="corretoras-logo-item" key={i}>
                <img src={`${import.meta.env.BASE_URL}logos-corretoras/${logo.file}`} alt={logo.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
