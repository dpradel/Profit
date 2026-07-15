import { useState, useEffect, useRef, useCallback } from "react";

// ─── Static data ─────────────────────────────────────────────────────────────

const INITIAL_SECTORS = [
  {
    id: "agro",
    name: "Agropecuário",
    variation: "+0,57%",
    positive: true,
    stocks: [
      { id: "BEEF3", ticker: "BEEF3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
      { id: "PETR4-agro", ticker: "PETR4", price: 65.43, time: "11:19:56", variation: "-5,45%", positive: false, max: 65.43, min: 65.43 },
    ],
  },
  {
    id: "alimentos",
    name: "Alimentos Processados",
    variation: "+0,29%",
    positive: true,
    stocks: [
      { id: "CAML3", ticker: "CAML3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
      { id: "JALL3", ticker: "JALL3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
      { id: "MDIA3", ticker: "MDIA3", price: 65.43, time: "11:19:56", variation: "-5,45%", positive: false, max: 65.43, min: 65.43 },
      { id: "PETR4-alim", ticker: "PETR4", price: 65.43, time: "11:19:56", variation: "-5,45%", positive: false, max: 65.43, min: 65.43 },
      { id: "SMTO3", ticker: "SMTO3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
      { id: "JBSS3", ticker: "JBSS3", price: 65.43, time: "11:19:56", variation: "-5,45%", positive: false, max: 65.43, min: 65.43 },
    ],
  },
  {
    id: "autos",
    name: "Automóveis e Motocicletas",
    variation: "+3,24%",
    positive: true,
    stocks: [
      { id: "MYPK3", ticker: "MYPK3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    variation: "+0,07%",
    positive: true,
    stocks: [],
  },
  {
    id: "comercio",
    name: "Comércio e Distribuição",
    variation: "+0,21%",
    positive: true,
    stocks: [],
  },
  {
    id: "computadores",
    name: "Computadores e Equipamentos",
    variation: "-0,24%",
    positive: false,
    stocks: [
      { id: "INTB3", ticker: "INTB3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
      { id: "MLAS3", ticker: "MLAS3", price: 65.43, time: "11:19:56", variation: "-5,45%", positive: false, max: 65.43, min: 65.43 },
      { id: "POSI3", ticker: "POSI3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
    ],
  },
  {
    id: "construcao",
    name: "Construção Civil",
    variation: "+0,79%",
    positive: true,
    stocks: [],
  },
  {
    id: "diversos",
    name: "Diversos",
    variation: "+0,83%",
    positive: true,
    stocks: [
      { id: "VAMO3", ticker: "VAMO3", price: 65.43, time: "11:19:56", variation: "+4,12%", positive: true, max: 65.43, min: 65.43 },
      { id: "RENT3", ticker: "RENT3", price: 65.43, time: "11:19:56", variation: "-5,45%", positive: false, max: 65.43, min: 65.43 },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(val) {
  return val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function nowTime() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="pgc-header-icon">
      <rect x="1" y="1" width="5" height="5" rx="1" fill="rgba(255,255,255,0.45)" />
      <rect x="8" y="1" width="5" height="5" rx="1" fill="rgba(255,255,255,0.45)" />
      <rect x="1" y="8" width="5" height="5" rx="1" fill="rgba(255,255,255,0.45)" />
      <rect x="8" y="8" width="5" height="5" rx="1" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

function ChevronDown({ collapsed }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"pgc-chevron" + (collapsed ? " pgc-chevron--collapsed" : "")}
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TickerSquare({ ticker }) {
  // Use a short 1–2 char abbreviation for the icon square
  const abbr = ticker.replace(/[0-9]/g, "").slice(0, 2);
  return (
    <div className="pgc-ticker-sq">
      <span className="pgc-ticker-sq-text">{abbr}</span>
    </div>
  );
}

function StockRow({ stock, flashState }) {
  const flash = flashState[stock.id];
  let priceClass = "pgc-cell-price";
  if (flash === "up") priceClass += " pgc-flash-up";
  if (flash === "down") priceClass += " pgc-flash-down";

  return (
    <div className="pgc-stock-row">
      <div className={"pgc-row-bar" + (stock.positive ? " pgc-row-bar--pos" : " pgc-row-bar--neg")} />
      <div className="pgc-stock-row-inner">
        <div className="pgc-cell pgc-cell-ativo">
          <TickerSquare ticker={stock.ticker} />
          <span className="pgc-ticker-label">{stock.ticker}</span>
        </div>
        <div className={"pgc-cell pgc-cell-ultimo " + priceClass}>
          {formatPrice(stock.price)}
        </div>
        <div className="pgc-cell pgc-cell-hora">{stock.time}</div>
        <div className={"pgc-cell pgc-cell-var" + (stock.positive ? " pgc-pos" : " pgc-neg")}>
          {stock.variation}
        </div>
        <div className="pgc-cell pgc-cell-max">{formatPrice(stock.max)}</div>
        <div className="pgc-cell pgc-cell-min">{formatPrice(stock.min)}</div>
      </div>
    </div>
  );
}

function SectorRow({ sector, collapsed, onToggle, flashState }) {
  return (
    <div className="pgc-sector-block">
      <div className="pgc-sector-header" onClick={onToggle} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onToggle()}>
        <ChevronDown collapsed={collapsed} />
        <span className="pgc-sector-name">{sector.name}</span>
        <span className={"pgc-sector-var" + (sector.positive ? " pgc-pos" : " pgc-neg")}>
          {sector.variation}
        </span>
      </div>
      {!collapsed && sector.stocks.length > 0 && (
        <div className="pgc-sector-stocks">
          {sector.stocks.map((s) => (
            <StockRow key={s.id} stock={s} flashState={flashState} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PanelGradeCotacoes() {
  const [sectors, setSectors] = useState(INITIAL_SECTORS);
  const [collapsed, setCollapsed] = useState({});
  const [flashState, setFlashState] = useState({});
  const timerRef = useRef(null);

  // Collect all stock ids that exist
  const getAllStockIds = useCallback((secs) => {
    const ids = [];
    secs.forEach((sec) => sec.stocks.forEach((s) => ids.push(s.id)));
    return ids;
  }, []);

  // Animate: pick 3-4 random rows, update price, flash
  useEffect(() => {
    const tick = () => {
      setSectors((prev) => {
        const allIds = getAllStockIds(prev);
        if (allIds.length === 0) return prev;

        // Pick 3-4 random unique indices
        const count = 3 + Math.floor(Math.random() * 2);
        const shuffled = [...allIds].sort(() => Math.random() - 0.5).slice(0, Math.min(count, allIds.length));

        const newFlash = {};
        const next = prev.map((sec) => ({
          ...sec,
          stocks: sec.stocks.map((s) => {
            if (!shuffled.includes(s.id)) return s;
            const delta = (Math.random() * 0.02 - 0.01); // ±0.01 max
            const roundedDelta = Math.round(delta * 100) / 100;
            const newPrice = Math.max(0.01, Math.round((s.price + roundedDelta) * 100) / 100);
            const direction = newPrice >= s.price ? "up" : "down";
            newFlash[s.id] = direction;

            // Recalculate variation based on base 65.43 reference
            const base = 65.43;
            const varPct = ((newPrice - base) / base) * 100;
            const varSign = varPct >= 0 ? "+" : "";
            const varStr = varSign + varPct.toFixed(2).replace(".", ",") + "%";

            return {
              ...s,
              price: newPrice,
              time: nowTime(),
              variation: varStr,
              positive: varPct >= 0,
              max: Math.max(s.max, newPrice),
              min: Math.min(s.min, newPrice),
            };
          }),
        }));

        setFlashState(newFlash);

        // Clear flash after 600ms
        setTimeout(() => {
          setFlashState({});
        }, 600);

        return next;
      });
    };

    timerRef.current = setInterval(tick, 2800);
    return () => clearInterval(timerRef.current);
  }, [getAllStockIds]);

  const toggleSector = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pgc-shell">
      {/* Window header */}
      <div className="pgc-window-header">
        <GridIcon />
        <span className="pgc-window-title">Grade de Cotações</span>
      </div>

      {/* Column headers */}
      <div className="pgc-col-headers">
        <div className="pgc-col-h pgc-col-h-ativo">Ativo</div>
        <div className="pgc-col-h pgc-col-h-ultimo">Último</div>
        <div className="pgc-col-h pgc-col-h-hora">Hora</div>
        <div className="pgc-col-h pgc-col-h-var">Variação</div>
        <div className="pgc-col-h pgc-col-h-max">Máximo</div>
        <div className="pgc-col-h pgc-col-h-min">Mínimo</div>
        <div className="pgc-col-h pgc-col-h-fech">Fechamento Ante</div>
      </div>

      {/* Scrollable content */}
      <div className="pgc-content">
        {sectors.map((sec) => (
          <SectorRow
            key={sec.id}
            sector={sec}
            collapsed={!!collapsed[sec.id]}
            onToggle={() => toggleSector(sec.id)}
            flashState={flashState}
          />
        ))}
      </div>

    </div>
  );
}

/*
=============================================================================
USAGE:
  import { PanelGradeCotacoes } from "./components/PanelGradeCotacoes";
  // Add the CSS block below into src/styles/global.css
=============================================================================
*/

/* === PanelGradeCotacoes CSS === */
/*
.pgc-shell {
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 480px;
  background: rgba(8, 10, 18, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: rgba(255, 255, 255, 0.88);
}

.pgc-window-header {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  min-height: 28px;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.pgc-header-icon {
  flex-shrink: 0;
}

.pgc-window-title {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.pgc-col-headers {
  display: grid;
  grid-template-columns: 1fr 80px 72px 72px 72px 72px 96px;
  align-items: center;
  height: 24px;
  min-height: 24px;
  padding: 0 10px 0 22px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.pgc-col-h {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.30);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pgc-col-h-ultimo,
.pgc-col-h-max,
.pgc-col-h-min,
.pgc-col-h-fech {
  text-align: right;
}

.pgc-col-h-var {
  text-align: right;
}

.pgc-col-h-hora {
  text-align: center;
}

.pgc-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.pgc-content::-webkit-scrollbar {
  width: 4px;
}

.pgc-content::-webkit-scrollbar-track {
  background: transparent;
}

.pgc-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.10);
  border-radius: 2px;
}

.pgc-sector-block {
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.pgc-sector-header {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}

.pgc-sector-header:hover {
  background: rgba(255, 255, 255, 0.04);
}

.pgc-sector-header:focus-visible {
  outline: 1px solid rgba(74, 158, 255, 0.5);
  outline-offset: -1px;
}

.pgc-chevron {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.pgc-chevron--collapsed {
  transform: rotate(-90deg);
}

.pgc-sector-name {
  flex: 1;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pgc-sector-var {
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.pgc-pos {
  color: #22c55e;
}

.pgc-neg {
  color: #e05858;
}

.pgc-sector-stocks {
  padding-bottom: 2px;
}

.pgc-stock-row {
  display: flex;
  align-items: stretch;
  position: relative;
  transition: background 0.12s;
}

.pgc-stock-row:hover {
  background: rgba(255, 255, 255, 0.04);
}

.pgc-row-bar {
  width: 3px;
  flex-shrink: 0;
  border-radius: 0 2px 2px 0;
}

.pgc-row-bar--pos {
  background: #22c55e;
}

.pgc-row-bar--neg {
  background: #e05858;
}

.pgc-stock-row-inner {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 80px 72px 72px 72px 72px;
  align-items: center;
  height: 28px;
  padding: 0 10px 0 4px;
  gap: 0;
}

.pgc-cell {
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.88);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pgc-cell-ativo {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
}

.pgc-ticker-sq {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 4px;
  background: rgba(245, 214, 74, 0.14);
  border: 1px solid rgba(245, 214, 74, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pgc-ticker-sq-text {
  font-size: 7px;
  font-weight: 700;
  color: #f5d64a;
  letter-spacing: 0.02em;
}

.pgc-ticker-label {
  font-size: 11px;
  font-weight: 600;
  color: #f5d64a;
  letter-spacing: 0.02em;
}

.pgc-cell-ultimo {
  text-align: right;
  font-variant-numeric: tabular-nums;
  transition: background 0.1s;
  border-radius: 3px;
  padding: 0 2px;
}

.pgc-cell-hora {
  text-align: center;
  color: rgba(255, 255, 255, 0.42);
  font-variant-numeric: tabular-nums;
  font-size: 10px;
}

.pgc-cell-var {
  text-align: right;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.pgc-cell-max,
.pgc-cell-min {
  text-align: right;
  color: rgba(255, 255, 255, 0.60);
  font-variant-numeric: tabular-nums;
}

@keyframes pgcFlashUp {
  0%   { background: rgba(34, 197, 94, 0.35); color: #3dc26e; }
  60%  { background: rgba(34, 197, 94, 0.15); }
  100% { background: transparent; color: rgba(255, 255, 255, 0.88); }
}

@keyframes pgcFlashDown {
  0%   { background: rgba(224, 88, 88, 0.35); color: #e05858; }
  60%  { background: rgba(224, 88, 88, 0.15); }
  100% { background: transparent; color: rgba(255, 255, 255, 0.88); }
}

.pgc-flash-up {
  animation: pgcFlashUp 0.6s ease forwards;
}

.pgc-flash-down {
  animation: pgcFlashDown 0.6s ease forwards;
}

.pgc-tabbar {
  display: flex;
  align-items: center;
  height: 30px;
  min-height: 30px;
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.pgc-tabbar::-webkit-scrollbar {
  display: none;
}

.pgc-tab {
  flex-shrink: 0;
  height: 100%;
  padding: 0 12px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.42);
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
}

.pgc-tab:hover {
  color: rgba(255, 255, 255, 0.70);
}

.pgc-tab--active {
  color: rgba(255, 255, 255, 0.88);
  border-bottom-color: #4a9eff;
}
*/
/* === END PanelGradeCotacoes CSS === */
