import { useEffect, useState, useRef } from "react";

// ─── constants ─────────────────────────────────────────────────────────────
const BROKERS = ["BTG", "XP", "Agora", "Itaú", "Clear", "Modal"];
const QUANTITIES = [100, 200, 500, 1000, 2000];
const BASE_PRICE = 31.83;
const MAX_ROWS = 12;

// ─── helpers ────────────────────────────────────────────────────────────────
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatPrice(n) {
  return n.toFixed(2).replace(".", ",");
}

function formatQty(n) {
  return n.toLocaleString("pt-BR");
}

function padMs(ms) {
  return String(ms).padStart(3, "0");
}

function formatTimestamp(ms) {
  const d = new Date(ms);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const msec = padMs(d.getMilliseconds());
  return `${hh}:${mm}:${ss}.${msec}`;
}

let tradeIdCounter = 1;

function generateTrade(prevTs, bidRatio) {
  const delta = 100 + Math.floor(Math.random() * 300);
  const ts = prevTs + delta;
  const price = BASE_PRICE + (Math.random() - 0.5) * 0.04;
  const buyer = randomItem(BROKERS);
  const seller = randomItem(BROKERS);
  const qty = randomItem(QUANTITIES);
  // bias agressor toward bid side
  const aggresRand = Math.random();
  const agressor = aggresRand < bidRatio ? "C" : "V";
  return { id: tradeIdCounter++, ts, price, buyer, seller, qty, agressor };
}

function generateInitialTrades() {
  const now = Date.now() - 12 * 400;
  const trades = [];
  let ts = now;
  for (let i = 0; i < MAX_ROWS; i++) {
    const t = generateTrade(ts, 0.52);
    trades.push(t);
    ts = t.ts;
  }
  return trades.reverse(); // most recent first
}

// ─── BidAskBar ──────────────────────────────────────────────────────────────
function BidAskBar({ bidVol, askVol }) {
  const total = bidVol + askVol;
  const bidPct = Math.round((bidVol / total) * 100);
  const askPct = 100 - bidPct;

  function fmtM(n) {
    return (n / 1_000_000).toFixed(2).replace(".", ",") + "M";
  }

  return (
    <div className="ptt-bidask-bar">
      <div
        className="ptt-bidask-bid"
        style={{ width: `${bidPct}%` }}
      >
        <span className="ptt-bidask-label ptt-bidask-label--bid">
          ({fmtM(bidVol)}) {bidPct}%
        </span>
      </div>
      <div
        className="ptt-bidask-ask"
        style={{ width: `${askPct}%` }}
      >
        <span className="ptt-bidask-label ptt-bidask-label--ask">
          ({fmtM(askVol)}) {askPct}%
        </span>
      </div>
    </div>
  );
}

// ─── SummaryRow ──────────────────────────────────────────────────────────────
function SummaryRow({ price, variation, hora, volume, negocios, maximo, minimo }) {
  const isPos = variation >= 0;
  return (
    <div className="ptt-summary-row">
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Ativo</span>
        <span className="ptt-summary-value">PETR4</span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Último</span>
        <span className="ptt-summary-value">{formatPrice(price)}</span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Variação</span>
        <span className={`ptt-summary-value ${isPos ? "ptt-green" : "ptt-red"}`}>
          {isPos ? "+" : ""}{variation.toFixed(2).replace(".", ",")}%
        </span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Hora</span>
        <span className="ptt-summary-value">{hora}</span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Volume</span>
        <span className="ptt-summary-value">{volume}</span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Negócios</span>
        <span className="ptt-summary-value">{negocios.toLocaleString("pt-BR")}</span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Máximo</span>
        <span className="ptt-summary-value ptt-green">{formatPrice(maximo)}</span>
      </span>
      <span className="ptt-summary-sep" />
      <span className="ptt-summary-item">
        <span className="ptt-summary-label">Mínimo</span>
        <span className="ptt-summary-value ptt-red">{formatPrice(minimo)}</span>
      </span>
    </div>
  );
}

// ─── TradeRow ────────────────────────────────────────────────────────────────
function TradeRow({ trade, isNew }) {
  return (
    <div className={`ptt-trade-row ${isNew ? "ptt-trade-row--entering" : ""}`}>
      <span className="ptt-cell ptt-cell--time">{formatTimestamp(trade.ts)}</span>
      <span className="ptt-cell ptt-cell--broker">{trade.buyer}</span>
      <span className="ptt-cell ptt-cell--price">{formatPrice(trade.price)}</span>
      <span className="ptt-cell ptt-cell--qty">{formatQty(trade.qty)}</span>
      <span className="ptt-cell ptt-cell--broker">{trade.seller}</span>
      <span className={`ptt-cell ptt-cell--agressor ${trade.agressor === "C" ? "ptt-agressor--c" : "ptt-agressor--v"}`}>
        {trade.agressor}
      </span>
    </div>
  );
}

// ─── PanelTimesTrades ────────────────────────────────────────────────────────
export function PanelTimesTrades() {
  const [trades, setTrades] = useState(() => generateInitialTrades());
  const [newId, setNewId] = useState(null);
  const [negocios, setNegocios] = useState(32054);
  const [volume, setVolume] = useState(123_980_000);
  const [maximo, setMaximo] = useState(32.10);
  const [minimo, setMinimo] = useState(31.80);
  const [lastPrice, setLastPrice] = useState(32.10);
  const [hora, setHora] = useState("14:22:12");

  // bid/ask volumes — drives agressor bias
  const bidVol = 4_840_000;
  const askVol = 5_880_000;
  const bidRatio = bidVol / (bidVol + askVol); // ~0.45 → slight sell pressure

  const latestTsRef = useRef(trades[0]?.ts ?? Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const trade = generateTrade(latestTsRef.current, bidRatio);
      latestTsRef.current = trade.ts;

      setTrades((prev) => [trade, ...prev].slice(0, MAX_ROWS));
      setNewId(trade.id);
      setNegocios((n) => n + 1);
      setVolume((v) => v + trade.qty * Math.round(trade.price));
      setLastPrice(trade.price);
      setMaximo((m) => Math.max(m, trade.price));
      setMinimo((m) => Math.min(m, trade.price));

      const d = new Date(trade.ts);
      setHora(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`
      );

      // clear "new" flag after animation
      setTimeout(() => setNewId(null), 400);
    }, 800);

    return () => clearInterval(interval);
  }, [bidRatio]);

  const variation = ((lastPrice - 31.66) / 31.66) * 100;

  function fmtVolume(v) {
    return (v / 1_000_000).toFixed(2).replace(".", ",") + "M";
  }

  return (
    <div className="ptt-shell">
      {/* ── Window header / tab bar ── */}
      <div className="ptt-header">
        <div className="ptt-tabs">
          <div className="ptt-tab ptt-tab--active">
            <span className="ptt-tab-dot" />
            <span className="ptt-tab-label">PETR4 1D</span>
            <span className="ptt-tab-change ptt-green">+5,10%</span>
            <button className="ptt-tab-close" aria-label="Fechar aba">×</button>
          </div>
          <button className="ptt-tab-add" aria-label="Nova aba">+</button>
        </div>
      </div>

      {/* ── Summary ── */}
      <SummaryRow
        price={lastPrice}
        variation={variation}
        hora={hora}
        volume={fmtVolume(volume)}
        negocios={negocios}
        maximo={maximo}
        minimo={minimo}
      />

      {/* ── Bid / Ask bar ── */}
      <BidAskBar bidVol={bidVol} askVol={askVol} />

      {/* ── Column headers ── */}
      <div className="ptt-col-headers">
        <span className="ptt-col ptt-col--time">Data</span>
        <span className="ptt-col ptt-col--broker">Compradora</span>
        <span className="ptt-col ptt-col--price">Valor</span>
        <span className="ptt-col ptt-col--qty">Quantidade</span>
        <span className="ptt-col ptt-col--broker">Vendedora</span>
        <span className="ptt-col ptt-col--agressor">Agressor</span>
      </div>

      {/* ── Trade list ── */}
      <div className="ptt-trade-list">
        {trades.map((t) => (
          <TradeRow key={t.id} trade={t} isNew={t.id === newId} />
        ))}
      </div>
    </div>
  );
}
