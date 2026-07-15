import { useState, useEffect, useRef, useCallback } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

function fmt(n, decimals = 2) {
  return n.toFixed(decimals).replace(".", ",");
}

function fmtQty(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(".", ",") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "k";
  return String(n);
}

function fmtVol(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(".", ",") + "M";
  return n.toFixed(0);
}

const PRICE_STEP = 0.1;
const BASE_PRICE = 31.7;
const LEVELS_ABOVE = 9;  // ask levels above mid
const LEVELS_BELOW = 18; // bid levels below mid

function buildLevels(midPrice) {
  const levels = [];
  for (let i = LEVELS_ABOVE; i >= 1; i--) {
    levels.push({
      price: parseFloat((midPrice + i * PRICE_STEP).toFixed(2)),
      side: "ask",
      qty: Math.floor(Math.random() * 800 + 100),
      qtyBracket: Math.floor(Math.random() * 500 + 50),
      rs: parseFloat((Math.random() * 30 + 30).toFixed(0)),
    });
  }
  levels.push({
    price: midPrice,
    side: "mid",
    qty: Math.floor(Math.random() * 200 + 50),
    qtyBracket: Math.floor(Math.random() * 100 + 10),
    rs: parseFloat((Math.random() * 10 + 24).toFixed(0)),
    pnb: "1,5",
  });
  for (let i = 1; i <= LEVELS_BELOW; i++) {
    levels.push({
      price: parseFloat((midPrice - i * PRICE_STEP).toFixed(2)),
      side: "bid",
      qty: Math.floor(Math.random() * 800 + 100),
      qtyBracket: Math.floor(Math.random() * 500 + 50),
      rs: -parseFloat((Math.random() * 10 + i * 2).toFixed(0)),
    });
  }
  return levels;
}

const INITIAL_TABS = [
  { id: "PETR4", label: "PETR4", change: "+5,10%", changePositive: true },
  { id: "WDOA25", label: "WDOA25", change: "+5,10%", changePositive: true },
];

// ── sub-components ────────────────────────────────────────────────────────────

function TabBar({ tabs, activeTab, onSelect, onClose, onAdd }) {
  return (
    <div className="sdom-tabbar">
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tab"
          className={`sdom-tab${t.id === activeTab ? " sdom-tab--active" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          <span className="sdom-tab-dot" />
          <span className="sdom-tab-label">{t.label}</span>
          <span className={`sdom-tab-change${t.changePositive ? " sdom-tab-change--pos" : " sdom-tab-change--neg"}`}>
            {t.change}
          </span>
          <button
            className="sdom-tab-close"
            onClick={(e) => { e.stopPropagation(); onClose(t.id); }}
          >
            ×
          </button>
        </div>
      ))}
      <button className="sdom-tab-add" onClick={onAdd}>+</button>
    </div>
  );
}

function SummaryBar({ ticker, last, change, time, volume, trades, high, low }) {
  const positive = !change.startsWith("-");
  return (
    <div className="sdom-summary">
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Ativo</span>
        <span className="sdom-summary-val">{ticker}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Último</span>
        <span className="sdom-summary-val">{last}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Variação</span>
        <span className={`sdom-summary-val ${positive ? "sdom-green" : "sdom-red"}`}>{change}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Hora</span>
        <span className="sdom-summary-val">{time}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Volume</span>
        <span className="sdom-summary-val">{volume}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Negócios</span>
        <span className="sdom-summary-val">{trades}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Máximo</span>
        <span className="sdom-summary-val sdom-green">{high}</span>
      </span>
      <span className="sdom-summary-sep" />
      <span className="sdom-summary-item">
        <span className="sdom-summary-key">Mínimo</span>
        <span className="sdom-summary-val sdom-red">{low}</span>
      </span>
    </div>
  );
}

function RatioBar({ bidVol, askVol }) {
  const total = bidVol + askVol;
  const bidPct = Math.round((bidVol / total) * 100);
  const askPct = 100 - bidPct;
  return (
    <div className="sdom-ratio-wrap">
      <div className="sdom-ratio-label sdom-ratio-label--bid">
        <span className="sdom-ratio-vol">({fmtVol(bidVol)})</span>
        <span className="sdom-ratio-pct">{bidPct}%</span>
      </div>
      <div className="sdom-ratio-bar">
        <div
          className="sdom-ratio-fill sdom-ratio-fill--bid"
          style={{ width: `${bidPct}%` }}
        />
        <div
          className="sdom-ratio-fill sdom-ratio-fill--ask"
          style={{ width: `${askPct}%` }}
        />
      </div>
      <div className="sdom-ratio-label sdom-ratio-label--ask">
        <span className="sdom-ratio-vol">({fmtVol(askVol)})</span>
        <span className="sdom-ratio-pct">{askPct}%</span>
      </div>
    </div>
  );
}

function ColHeaders() {
  return (
    <div className="sdom-colheaders">
      <span className="sdom-ch sdom-ch-actions-left">X (-) C</span>
      <span className="sdom-ch sdom-ch-bid">Qtd. Compra</span>
      <span className="sdom-ch sdom-ch-price">Preço</span>
      <span className="sdom-ch sdom-ch-pnb">PNB</span>
      <span className="sdom-ch sdom-ch-ask">Qtd. Venda</span>
      <span className="sdom-ch sdom-ch-actions-right">(-) X</span>
      <span className="sdom-ch sdom-ch-rs">R$</span>
    </div>
  );
}

function OrderRow({ row, isMid, flash }) {
  const isAsk = row.side === "ask";
  const isBid = row.side === "bid";

  return (
    <div className={`sdom-row${isMid ? " sdom-row--mid" : ""}${flash ? " sdom-row--flash" : ""}`}>
      {/* left action col */}
      <span className="sdom-cell sdom-cell-actions-left">
        {isMid && <span className="sdom-arrow sdom-arrow--up">▲</span>}
      </span>

      {/* bid qty */}
      <span className="sdom-cell sdom-cell-bid">
        {(isBid || isMid) && (
          <span className={`sdom-qty${isMid ? " sdom-qty--mid" : ""}`}>
            <span className="sdom-qty-main">{row.qty}</span>
            <span className="sdom-qty-bracket"> [{row.qtyBracket}]</span>
          </span>
        )}
      </span>

      {/* price */}
      <span className="sdom-cell sdom-cell-price">
        <span className={`sdom-price${isMid ? " sdom-price--mid" : ""}`}>
          {fmt(row.price)}
        </span>
      </span>

      {/* pnb */}
      <span className="sdom-cell sdom-cell-pnb">
        {row.pnb && <span className="sdom-pnb">{row.pnb}</span>}
      </span>

      {/* ask qty */}
      <span className="sdom-cell sdom-cell-ask">
        {(isAsk || isMid) && (
          <span className="sdom-qty sdom-qty--ask">
            <span className="sdom-qty-main">{row.qty}</span>
            <span className="sdom-qty-bracket"> [{row.qtyBracket}]</span>
          </span>
        )}
      </span>

      {/* right action col */}
      <span className="sdom-cell sdom-cell-actions-right">
        {isMid && <span className="sdom-arrow sdom-arrow--down">▼</span>}
      </span>

      {/* R$ */}
      <span className="sdom-cell sdom-cell-rs">
        <span className={`sdom-rs${row.rs >= 0 ? " sdom-rs--pos" : " sdom-rs--neg"}`}>
          {row.rs >= 0 ? "" : ""}{Math.abs(row.rs)},00
        </span>
      </span>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────

export function PanelSuperDOM() {
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const [activeTab, setActiveTab] = useState("PETR4");
  const [midPrice, setMidPrice] = useState(BASE_PRICE);
  const [levels, setLevels] = useState(() => buildLevels(BASE_PRICE));
  const [bidVol, setBidVol] = useState(4_840_000);
  const [askVol, setAskVol] = useState(5_880_000);
  const [flashRows, setFlashRows] = useState(new Set());
  const [time, setTime] = useState("14:22:12");
  const tickRef = useRef(null);

  // clock
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // animation tick
  useEffect(() => {
    tickRef.current = setInterval(() => {
      // update 2-3 random row quantities
      const count = Math.floor(Math.random() * 2) + 2;
      const toFlash = new Set();

      setLevels((prev) => {
        const next = prev.map((row) => ({ ...row }));
        const indices = [];
        while (indices.length < count) {
          const i = Math.floor(Math.random() * next.length);
          if (!indices.includes(i)) indices.push(i);
        }
        indices.forEach((i) => {
          next[i].qty = Math.max(50, next[i].qty + Math.floor((Math.random() - 0.4) * 120));
          next[i].qtyBracket = Math.max(10, next[i].qtyBracket + Math.floor((Math.random() - 0.4) * 60));
          toFlash.add(i);
        });
        return next;
      });

      // animate ratio bar
      setBidVol((prev) => {
        const delta = (Math.random() - 0.5) * 200_000;
        return Math.max(2_000_000, Math.min(8_000_000, prev + delta));
      });
      setAskVol((prev) => {
        const delta = (Math.random() - 0.5) * 200_000;
        return Math.max(2_000_000, Math.min(8_000_000, prev + delta));
      });

      // occasionally move mid price
      if (Math.random() < 0.18) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        setMidPrice((prev) => {
          const next = parseFloat((prev + dir * PRICE_STEP).toFixed(2));
          setLevels(buildLevels(next));
          return next;
        });
      }

      setFlashRows(toFlash);
      setTimeout(() => setFlashRows(new Set()), 400);
    }, 1200);

    return () => clearInterval(tickRef.current);
  }, []);

  const handleCloseTab = useCallback((id) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (activeTab === id && next.length > 0) setActiveTab(next[0].id);
      return next;
    });
  }, [activeTab]);

  const handleAddTab = useCallback(() => {
    const id = `TAB${Date.now()}`;
    setTabs((prev) => [...prev, { id, label: id, change: "+0,00%", changePositive: true }]);
    setActiveTab(id);
  }, []);

  const last = fmt(midPrice);
  const high = fmt(midPrice + 0.4);
  const low = fmt(midPrice - 0.4);

  return (
    <div className="sdom-panel">
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onSelect={setActiveTab}
        onClose={handleCloseTab}
        onAdd={handleAddTab}
      />
      <SummaryBar
        ticker={activeTab}
        last={last}
        change="+0,44%"
        time={time}
        volume="123,98M"
        trades="32.054"
        high={high}
        low={low}
      />
      <RatioBar bidVol={bidVol} askVol={askVol} />
      <ColHeaders />
      <div className="sdom-book">
        {levels.map((row, i) => (
          <OrderRow
            key={`${row.price}-${row.side}`}
            row={row}
            isMid={row.side === "mid"}
            flash={flashRows.has(i)}
          />
        ))}
      </div>
    </div>
  );
}
