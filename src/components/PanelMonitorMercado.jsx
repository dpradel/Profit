import { useEffect, useRef, useState } from "react";

// ─── Static market data ──────────────────────────────────────────────────────

const SECTORS = [
  {
    id: "util",
    label: "UTILIDADE PÚBLICA",
    tiles: [
      { ticker: "ENEV3", price: "14,82", variation: 0.44, cap: 5 },
      { ticker: "EQTL3", price: "29,17", variation: -0.85, cap: 3 },
      { ticker: "CPLE6", price: "8,94",  variation: 0.12,  cap: 2 },
      { ticker: "ELET3", price: "37,55", variation: 0.55,  cap: 3.5 },
      { ticker: "CMIG4", price: "10,88", variation: -0.22, cap: 2 },
    ],
  },
  {
    id: "petro",
    label: "PETRÓLEO GÁS E BIOC.",
    tiles: [
      { ticker: "PETR4", price: "35,12", variation: -0.50, cap: 5 },
      { ticker: "CSAN3", price: "14,30", variation: -0.28, cap: 2 },
      { ticker: "PETR3", price: "36,40", variation: -0.47, cap: 3 },
      { ticker: "UGPA3", price: "19,80", variation: 0.20,  cap: 2 },
      { ticker: "PRIO3", price: "43,60", variation: 0.35,  cap: 2.5 },
      { ticker: "BRFS3", price: "22,50", variation: 0.68,  cap: 2 },
      { ticker: "BRAV3", price: "18,70", variation: -0.16, cap: 1.5 },
      { ticker: "RAIZ4", price: "3,92",  variation: -0.51, cap: 1 },
      { ticker: "RECV3", price: "21,30", variation: 0.09,  cap: 1.5 },
    ],
  },
  {
    id: "cicl",
    label: "CONSUMO CÍCLICO",
    tiles: [
      { ticker: "MGLU3", price: "9,42",  variation: -1.26, cap: 2.5 },
      { ticker: "LREN3", price: "14,67", variation: 0.41,  cap: 2.5 },
      { ticker: "RENT3", price: "57,80", variation: 0.17,  cap: 3 },
      { ticker: "VBBR3", price: "21,54", variation: -0.37, cap: 2 },
      { ticker: "CYRE3", price: "23,29", variation: -0.55, cap: 2 },
    ],
  },
  {
    id: "fin",
    label: "FINANCEIRO",
    tiles: [
      { ticker: "ITUB4",  price: "34,92", variation: 0.29,  cap: 5 },
      { ticker: "BPAC11", price: "30,14", variation: 0.82,  cap: 4 },
      { ticker: "B3SA3",  price: "11,25", variation: -0.44, cap: 3 },
      { ticker: "BBDC4",  price: "14,88", variation: -0.67, cap: 3.5 },
      { ticker: "PSSA3",  price: "89,50", variation: 0.56,  cap: 2 },
      { ticker: "ALOS3",  price: "20,74", variation: 0.11,  cap: 2 },
    ],
  },
  {
    id: "mat",
    label: "MATERIAIS BÁSICOS",
    tiles: [
      { ticker: "VALE3",  price: "52,40", variation: 0.35,  cap: 5 },
      { ticker: "GGBR4",  price: "15,90", variation: -0.63, cap: 3 },
      { ticker: "CSNA3",  price: "8,70",  variation: -0.91, cap: 2.5 },
      { ticker: "MRFG3",  price: "13,20", variation: 0.15,  cap: 2 },
      { ticker: "ASAI3",  price: "7,85",  variation: -0.38, cap: 2 },
    ],
  },
  {
    id: "ncicl",
    label: "CONSUMO NÃO CÍCLICO",
    tiles: [
      { ticker: "ABEV3", price: "13,42", variation: 0.63,  cap: 4 },
      { ticker: "BRFS3", price: "22,50", variation: 0.68,  cap: 3 },
      { ticker: "NATU3", price: "14,85", variation: -0.21, cap: 2 },
      { ticker: "BEEF3", price: "9,54",  variation: -0.47, cap: 2 },
    ],
  },
  {
    id: "saude",
    label: "SAÚDE",
    tiles: [
      { ticker: "HAPV3", price: "3,18",  variation: -1.55, cap: 3 },
      { ticker: "RDOR3", price: "27,60", variation: 0.73,  cap: 3.5 },
      { ticker: "FLRY3", price: "16,40", variation: 0.24,  cap: 2 },
      { ticker: "HYPV3", price: "11,90", variation: -0.33, cap: 2 },
    ],
  },
  {
    id: "ind",
    label: "BENS INDUSTRIAIS",
    tiles: [
      { ticker: "EMBR3", price: "42,70", variation: 1.14,  cap: 4 },
      { ticker: "WEGE3", price: "45,20", variation: 0.89,  cap: 4 },
      { ticker: "RAIL3", price: "17,85", variation: -0.11, cap: 2.5 },
      { ticker: "VIVI3", price: "5,62",  variation: -0.72, cap: 1.5 },
    ],
  },
  {
    id: "com",
    label: "COMUNI...",
    tiles: [
      { ticker: "VIVT3", price: "50,30", variation: 0.20,  cap: 3 },
      { ticker: "TIMS3", price: "17,90", variation: -0.33, cap: 2.5 },
      { ticker: "TECH3", price: "32,40", variation: 0.55,  cap: 2 },
    ],
  },
];

// ─── Colour helpers ───────────────────────────────────────────────────────────

function variationBg(v) {
  if (v >= 1.0)  return "rgba(34,197,94,0.55)";
  if (v >= 0.4)  return "rgba(34,197,94,0.38)";
  if (v >= 0.1)  return "rgba(34,197,94,0.20)";
  if (v > -0.1)  return "rgba(255,255,255,0.06)";
  if (v > -0.4)  return "rgba(224,88,88,0.22)";
  if (v > -1.0)  return "rgba(224,88,88,0.38)";
  return                 "rgba(224,88,88,0.55)";
}

function variationColor(v) {
  if (v > 0)  return "#3dc26e";
  if (v < 0)  return "#e05858";
  return "rgba(255,255,255,0.42)";
}

function formatVariation(v) {
  const sign = v >= 0 ? "+" : "";
  return `${sign}${v.toFixed(2)}%`;
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ positive }) {
  const color = positive ? "#3dc26e" : "#e05858";
  const pts = positive
    ? "0,8 4,6 8,7 12,4 16,5 20,2 24,4 28,1 32,3"
    : "0,3 4,4 8,2 12,5 16,3 20,6 24,4 28,7 32,5";
  return (
    <svg className="mmm-sparkline" viewBox="0 0 32 9" xmlns="http://www.w3.org/2000/svg">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ─── Single Tile ──────────────────────────────────────────────────────────────

function MarketTile({ ticker, price, variation, cap, flashing }) {
  const bg = variationBg(variation);
  const col = variationColor(variation);
  const showSparkline = cap >= 3;

  return (
    <div
      className={`mmm-tile${flashing ? " mmm-tile--flash" : ""}`}
      style={{
        flex: `${cap} 0 0`,
        background: bg,
        minWidth: cap >= 4 ? 72 : cap >= 3 ? 58 : cap >= 2 ? 46 : 36,
      }}
    >
      <span className="mmm-tile-ticker">{ticker}</span>
      <span className="mmm-tile-price">{price}</span>
      <span className="mmm-tile-var" style={{ color: col }}>{formatVariation(variation)}</span>
      {showSparkline && <Sparkline positive={variation >= 0} />}
    </div>
  );
}

// ─── Sector Column ────────────────────────────────────────────────────────────

function SectorColumn({ sector, flashingMap }) {
  return (
    <div className="mmm-sector">
      <div className="mmm-sector-label">{sector.label}</div>
      <div className="mmm-sector-tiles">
        {sector.tiles.map((tile) => (
          <MarketTile
            key={tile.ticker + "-" + sector.id}
            {...tile}
            flashing={!!flashingMap[sector.id + ":" + tile.ticker]}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PanelMonitorMercado() {
  // Build a flat index of all tiles for random updates
  const allTiles = useRef(
    SECTORS.flatMap((s) =>
      s.tiles.map((t) => ({ sectorId: s.id, ticker: t.ticker }))
    )
  );

  const [variations, setVariations] = useState(() => {
    const map = {};
    SECTORS.forEach((s) => {
      s.tiles.forEach((t) => {
        map[s.id + ":" + t.ticker] = t.variation;
      });
    });
    return map;
  });

  const [flashing, setFlashing] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const flat = allTiles.current;
      // Pick 4-5 random tiles
      const count = 4 + Math.round(Math.random());
      const picked = [];
      const used = new Set();
      while (picked.length < count) {
        const idx = Math.floor(Math.random() * flat.length);
        const key = flat[idx].sectorId + ":" + flat[idx].ticker;
        if (!used.has(key)) {
          used.add(key);
          picked.push(key);
        }
      }

      setVariations((prev) => {
        const next = { ...prev };
        picked.forEach((key) => {
          const delta = (Math.random() * 0.1 - 0.05);
          next[key] = Math.max(-5, Math.min(5, (prev[key] || 0) + delta));
        });
        return next;
      });

      // Flash the updated tiles
      const flashMap = {};
      picked.forEach((key) => { flashMap[key] = true; });
      setFlashing(flashMap);
      setTimeout(() => setFlashing({}), 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Merge live variations back into sector data
  const liveSectors = SECTORS.map((s) => ({
    ...s,
    tiles: s.tiles.map((t) => ({
      ...t,
      variation: variations[s.id + ":" + t.ticker] ?? t.variation,
    })),
  }));

  return (
    <div className="mmm-panel">
      {/* Window header */}
      <div className="mmm-header">
        <svg className="mmm-header-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="8" width="2" height="5" rx="0.5" fill="rgba(255,255,255,0.50)" />
          <rect x="4.5" y="5.5" width="2" height="7.5" rx="0.5" fill="rgba(255,255,255,0.50)" />
          <rect x="8" y="3" width="2" height="10" rx="0.5" fill="rgba(255,255,255,0.70)" />
          <rect x="11.5" y="1" width="2" height="12" rx="0.5" fill="rgba(255,255,255,0.70)" />
        </svg>
        <span className="mmm-header-title">Monitor de Mercado</span>
      </div>

      {/* Treemap content */}
      <div className="mmm-body">
        {liveSectors.map((sector) => (
          <SectorColumn key={sector.id} sector={sector} flashingMap={flashing} />
        ))}
      </div>
    </div>
  );
}
