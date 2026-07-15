import { useRef } from "react";
import { CardVisualCapital } from "./CardVisualCapital.jsx";
import { CardVisualMercado } from "./CardVisualMercado.jsx";
import { CardVisualPerformance } from "./CardVisualPerformance.jsx";
import { CardVisualPixel } from "./CardVisualPixel.jsx";
import { useInView } from "../hooks/useInView.js";

const cards = [
  {
    id: "capital",
    line1: "Capital alocado",
    line2: "com precisão.",
    hoverText:
      "Entendemos o que um investidor precisa para alocar capital com máxima eficiência. Os mais exigentes conhecem a importância de contar com as tecnologias da Nelogica para tomar decisões mais precisas e embasadas.",
    Visual: CardVisualCapital,
  },
  {
    id: "performance",
    line1: "Alta performance.",
    line2: "Sempre.",
    hoverText:
      "Os melhores traders do Brasil escolhem o Profit. Nossas plataformas reúnem as ferramentas mais completas para o trading de alta performance — velocidade, precisão e confiabilidade quando mais importa.",
    Visual: CardVisualPerformance,
  },
  {
    id: "pixel",
    line1: "Cada pixel do",
    line2: "gráfico conta.",
    hoverText:
      "Recursos avançados para interpretação, desenho e projeções gráficas. Disponibilizamos um arsenal completo — de indicadores clássicos a estudos proprietários — que atende às demandas dos analistas mais exigentes.",
    Visual: CardVisualPixel,
  },
  {
    id: "mercado",
    line1: "O mercado fala.",
    line2: "Você entende.",
    hoverText:
      "Leitura de mercado via fluxo de ordens exige agilidade e qualidade. Com o Profit, cada movimento do book é exibido em tempo real com a velocidade que o scalping e o day trade exigem.",
    Visual: CardVisualMercado,
  },
];

export function ProductHighlightCardsAnimated() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section
      className={`highlight-cards highlight-cards-animated${inView ? " is-visible" : ""}`}
      ref={ref}
    >
      {cards.map((card, i) => (
        <div
          className={`highlight-card highlight-card-${card.id}`}
          key={card.id}
          style={{ "--card-index": i }}
        >
          <div className="highlight-card-glow" aria-hidden="true" />
          <h2 className="highlight-card-title">
            {card.line1}
            <br />
            {card.line2}
          </h2>

          <div className={`highlight-card-visual highlight-card-visual-${card.id}`} aria-hidden="true">
            <card.Visual />
          </div>

          <div className="highlight-card-hover-content" aria-hidden="true">
            <p className="highlight-card-hover-text">{card.hoverText}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
