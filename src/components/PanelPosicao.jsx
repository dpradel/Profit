import { useEffect, useRef, useState } from "react";

// ─── static seed data ────────────────────────────────────────────────────────

const INITIAL_ROWS = [
  { id: 1, ativo: "PETR4",  precoMedio: 123.45, precoAtual: 65.43,  qtd: 100, tipo: "V" },
  { id: 2, ativo: "BBDC4",  precoMedio: 123.45, precoAtual: 65.43,  qtd: 100, tipo: "C" },
  { id: 3, ativo: "BITQ25", precoMedio: 123.45, precoAtual: 65.43,  qtd: 100, tipo: "V" },
  { id: 4, ativo: "ITSA4",  precoMedio: 123.45, precoAtual: 65.43,  qtd: 100, tipo: "V" },
  { id: 5, ativo: "MELI34", precoMedio: 123.45, precoAtual: 65.43,  qtd: 100, tipo: "C" },
  { id: 6, ativo: "AMAR",   precoMedio: 123.45, precoAtual: 65.43,  qtd: 100, tipo: "C" },
];

// ─── helpers ─────────────────────────────────────────────────────────────────

function fmtBRL(v) {
  const abs = Math.abs(v);
  const str = abs.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (v < 0 ? "-" : "") + "R$ " + str;
}

function fmtPct(v) {
  return (v >= 0 ? "" : "-") + Math.abs(v).toFixed(2).replace(".", ",") + "%";
}

function calcResAberto(row) {
  // sell (V): gain when precoAtual > precoMedio; buy (C): gain when precoAtual > precoMedio
  const dir = row.tipo === "V" ? 1 : 1;
  return dir * (row.precoAtual - row.precoMedio) * row.qtd;
}

function calcResAbertoPct(row) {
  return ((row.precoAtual - row.precoMedio) / row.precoMedio) * 100 * (row.tipo === "V" ? 1 : 1);
}

function calcResDia(row) {
  // simulate a small intraday move — 0.5% of precoAtual * qtd for demo
  const sign = row.tipo === "C" ? -1 : 1;
  return sign * row.precoAtual * row.qtd * 0.005;
}

function calcResDiaPct(row) {
  return (calcResDia(row) / (row.precoMedio * row.qtd)) * 100;
}

// ─── Donut chart ──────────────────────────────────────────────────────────────

const DONUT_SEGMENTS = [
  { color: "#7c5cfc", pct: 0.32 },
  { color: "#2ec4b6", pct: 0.26 },
  { color: "#f5d64a", pct: 0.22 },
  { color: "#22c55e", pct: 0.20 },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startDeg, endDeg) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end   = polarToCartesian(cx, cy, r, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

function DonutChart({ rotOffset }) {
  const cx = 80, cy = 80, R = 58, gap = 3;
  let cursor = 0;
  const arcs = DONUT_SEGMENTS.map((seg) => {
    const sweep = seg.pct * 360 - gap;
    const path  = describeArc(cx, cy, R, cursor + gap / 2, cursor + sweep + gap / 2);
    cursor += seg.pct * 360;
    return { ...seg, path };
  });

  return (
    <svg
      viewBox="0 0 160 160"
      width="160"
      height="160"
      className="posicao-donut-svg"
      style={{ transform: `rotate(${rotOffset}deg)` }}
    >
      {arcs.map((arc, i) => (
        <path
          key={i}
          d={arc.path}
          fill="none"
          stroke={arc.color}
          strokeWidth="14"
          strokeLinecap="round"
        />
      ))}
      {/* inner ring decoration */}
      <circle cx={cx} cy={cy} r={38} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    </svg>
  );
}

// ─── summary stats bar ───────────────────────────────────────────────────────

function StatItem({ label, value, sub, positive }) {
  const cls = positive === true
    ? "posicao-stat-val posicao-val-green"
    : positive === false
    ? "posicao-stat-val posicao-val-red"
    : "posicao-stat-val";
  return (
    <div className="posicao-stat-item">
      <span className="posicao-stat-label">{label}</span>
      <span className={cls}>
        {value}
        {sub && <span className="posicao-stat-sub"> | {sub}</span>}
      </span>
    </div>
  );
}

// ─── quantity badge ───────────────────────────────────────────────────────────

function QtdBadge({ qtd, tipo }) {
  return (
    <span className={`posicao-qtd-badge posicao-qtd-${tipo === "V" ? "v" : "c"}`}>
      {qtd} {tipo}
    </span>
  );
}

// ─── table row ───────────────────────────────────────────────────────────────

function PosicaoRow({ row, flash }) {
  const resAberto    = calcResAberto(row);
  const resAbertoPct = calcResAbertoPct(row);
  const resDia       = calcResDia(row);
  const resDiaPct    = calcResDiaPct(row);

  return (
    <tr className={`posicao-tr${flash ? " posicao-tr-flash" : ""}`}>
      <td className="posicao-td posicao-td-ativo">{row.ativo}</td>
      <td className="posicao-td">{fmtBRL(row.precoMedio)}</td>
      <td className={`posicao-td posicao-td-price${flash ? " posicao-price-flash" : ""}`}>
        {fmtBRL(row.precoAtual)}
      </td>
      <td className="posicao-td">
        <QtdBadge qtd={row.qtd} tipo={row.tipo} />
      </td>
      <td className={`posicao-td ${resAberto >= 0 ? "posicao-val-green" : "posicao-val-red"}`}>
        {fmtBRL(resAberto)}
      </td>
      <td className={`posicao-td ${resAbertoPct >= 0 ? "posicao-val-green" : "posicao-val-red"}`}>
        {fmtPct(resAbertoPct)}
      </td>
      <td className={`posicao-td ${resDia >= 0 ? "posicao-val-green" : "posicao-val-red"}`}>
        {fmtBRL(resDia)}
      </td>
      <td className={`posicao-td ${resDiaPct >= 0 ? "posicao-val-green" : "posicao-val-red"}`}>
        {fmtPct(resDiaPct)}
      </td>
    </tr>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function PanelPosicao() {
  const [activeTab, setActiveTab] = useState("posicao");
  const [rows, setRows]           = useState(INITIAL_ROWS);
  const [flashId, setFlashId]     = useState(null);
  const [rotOffset, setRotOffset] = useState(0);
  const rafRef  = useRef(null);
  const lastRef = useRef(null);

  // slow donut rotation
  useEffect(() => {
    let start = null;
    function tick(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      setRotOffset((elapsed * 0.012) % 360);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // random price tick every 2.5s
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const idx  = Math.floor(Math.random() * prev.length);
        const delta = (Math.random() > 0.5 ? 0.10 : -0.10);
        const next = prev.map((r, i) =>
          i === idx ? { ...r, precoAtual: Math.max(0.01, +(r.precoAtual + delta).toFixed(2)) } : r
        );
        setFlashId(prev[idx].id);
        return next;
      });
    }, 2500);

    const clearFlash = setInterval(() => setFlashId(null), 400);
    return () => { clearInterval(id); clearInterval(clearFlash); };
  }, []);

  // aggregate stats
  const totalResAberto = rows.reduce((s, r) => s + calcResAberto(r), 0);
  const totalResDia    = rows.reduce((s, r) => s + calcResDia(r), 0);
  const totalPosicionado = rows.reduce((s, r) => s + r.precoAtual * r.qtd, 0);
  const resAbertoPct   = 11.39;

  return (
    <div className="posicao-panel">
      {/* ── tab bar ── */}
      <div className="posicao-tabbar">
        <button
          className={`posicao-tab${activeTab === "posicao" ? " posicao-tab-active" : ""}`}
          onClick={() => setActiveTab("posicao")}
        >
          Posição
        </button>
        <button
          className={`posicao-tab${activeTab === "custodia" ? " posicao-tab-active" : ""}`}
          onClick={() => setActiveTab("custodia")}
        >
          Custódia
        </button>
        <div className="posicao-tab-spacer" />
      </div>

      {/* ── stats bar ── */}
      <div className="posicao-statsbar">
        <StatItem
          label="Res. Aberto"
          value="123,45%"
          sub="123,45 pts"
          positive={true}
        />
        <div className="posicao-stat-divider" />
        <StatItem
          label="Res. Aberto (%)"
          value={fmtBRL(totalResAberto)}
          positive={totalResAberto >= 0}
        />
        <div className="posicao-stat-divider" />
        <StatItem
          label="Res. Dia"
          value={fmtBRL(totalResDia)}
          positive={totalResDia >= 0}
        />
        <div className="posicao-stat-divider" />
        <StatItem
          label="Res. Dia (%)"
          value="123,45%"
          sub="123,45 pts"
          positive={true}
        />
        <div className="posicao-stat-divider" />
        <StatItem label="Ativo" value="17" />
        <div className="posicao-stat-divider" />
        <StatItem
          label="Total Posicionado"
          value={fmtBRL(totalPosicionado)}
        />
        <div className="posicao-stat-divider" />
        <StatItem label="Total" value={fmtBRL(totalPosicionado * 1.12)} />
      </div>

      {/* ── content area ── */}
      <div className="posicao-content">

        {/* LEFT — donut */}
        <div className="posicao-chart-col">
          <span className="posicao-col-header">Gráfico</span>
          <div className="posicao-donut-wrap">
            <DonutChart rotOffset={rotOffset} />
            {/* center labels */}
            <div className="posicao-donut-labels">
              <span className="posicao-donut-label-inner">
                <span className="posicao-donut-label-title">Res. Dia</span>
                <span className="posicao-donut-label-val">0,00%</span>
              </span>
            </div>
            {/* outer label */}
            <div className="posicao-donut-outer-label">
              <span className="posicao-donut-label-title posicao-label-yellow">Res. Aberto</span>
              <span className="posicao-donut-label-val posicao-label-yellow">{resAbertoPct.toFixed(2).replace(".", ",")}%</span>
            </div>
          </div>
        </div>

        {/* RIGHT — table */}
        <div className="posicao-table-col">
          <div className="posicao-table-wrap">
            <table className="posicao-table">
              <thead>
                <tr>
                  <th className="posicao-th">Ativo</th>
                  <th className="posicao-th">Preço Médio</th>
                  <th className="posicao-th">Preço Atual</th>
                  <th className="posicao-th">Qtd</th>
                  <th className="posicao-th">Res. Aberto</th>
                  <th className="posicao-th">Res. Aberto (%)</th>
                  <th className="posicao-th">Res. do Dia</th>
                  <th className="posicao-th">Res. do Dia (%)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <PosicaoRow
                    key={row.id}
                    row={row}
                    flash={flashId === row.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
