import { useRef } from "react";
import { useInView } from "../hooks/useInView.js";

const cards = [
  {
    id: "capital",
    line1: "Capital alocado",
    line2: "com precisão.",
    image: "/highlight-card-1.png",
    hoverTitle: "Investidores",
    hoverText:
      "Entendemos o que um investidor precisa para alocar capital com máxima eficiência. Os mais exigentes conhecem a importância de contar com as tecnologias da Nelogica para tomar decisões mais precisas e embasadas.",
  },
  {
    id: "performance",
    line1: "Alta performance.",
    line2: "Sempre.",
    image: "/highlight-card-2.png",
    hoverTitle: "Traders",
    hoverText:
      "Os melhores traders do Brasil escolhem o Profit. Nossas plataformas reúnem as ferramentas mais completas para o trading de alta performance — velocidade, precisão e confiabilidade quando mais importa.",
  },
  {
    id: "pixel",
    line1: "Cada pixel do",
    line2: "gráfico conta.",
    image: "/highlight-card-3.png",
    hoverTitle: "Análise Gráfica",
    hoverText:
      "Recursos avançados para interpretação, desenho e projeções gráficas. Disponibilizamos um arsenal completo — de indicadores clássicos a estudos proprietários — que atende às demandas dos analistas mais exigentes.",
  },
  {
    id: "mercado",
    line1: "O mercado fala.",
    line2: "Você entende.",
    image: "/highlight-card-4.png",
    hoverTitle: "Tape Reading",
    hoverText:
      "Leitura de mercado via fluxo de ordens exige agilidade e qualidade. Com o Profit, cada movimento do book é exibido em tempo real com a velocidade que o scalping e o day trade exigem.",
  },
];

export function ProductHighlightCards() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className={`highlight-cards${inView ? " is-visible" : ""}`} ref={ref}>
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
          {card.image && (
            <img
              className="highlight-card-image"
              src={card.image}
              alt=""
              loading="lazy"
            />
          )}
          <div className="highlight-card-hover-content" aria-hidden="true">
            <p className="highlight-card-hover-text">{card.hoverText}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
