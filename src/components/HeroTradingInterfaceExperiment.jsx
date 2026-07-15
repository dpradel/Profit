import { HeroTradingInterface } from "./HeroTradingInterface.jsx";
import { PanelGradeCotacoes } from "./PanelGradeCotacoes.jsx";
import { PanelPosicao } from "./PanelPosicao.jsx";
import { PanelTimesTrades } from "./PanelTimesTrades.jsx";

export function HeroTradingInterfaceExperiment() {
  return (
    <div className="trading-grid-wrap">
      <div className="trading-grid-glow" aria-hidden="true" />
      <div className="trading-grid-shell">
        {/* Row 1 – tall: narrow Grade | wide Chart */}
        <div className="trading-panel trading-panel-grade-cotacoes">
          <PanelGradeCotacoes />
        </div>
        <div className="trading-panel trading-panel-chart">
          <HeroTradingInterface />
        </div>
        {/* Row 2 – short: narrow T&T | wide Posição */}
        <div className="trading-panel trading-panel-times-trades">
          <PanelTimesTrades />
        </div>
        <div className="trading-panel trading-panel-posicao">
          <PanelPosicao />
        </div>
      </div>
    </div>
  );
}
