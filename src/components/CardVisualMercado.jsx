import { useEffect, useRef, useState } from "react";

const SEED_MS = 16 * 3600000 + 20 * 60000 + 52000; // 16:20:52

function msToTime(ms) {
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000) % 24;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Reduced to 6 key fields so each one is visually larger
const FIELDS = [
  { label: 'Tipo',        value: 'Limite',        strong: true  },
  { label: 'Preço',       value: 'R$ 23,29',      strong: true  },
  { label: 'Preço Médio', value: 'R$ 75,00',      strong: false },
  { label: 'Total',       value: 'R$ 224.075,00', strong: true  },
  { label: 'Validade',    value: 'Hoje',           strong: true  },
  { label: 'Atualização', value: null,             strong: false, clock: true },
];

export function CardVisualMercado() {
  const elapsed = useRef(SEED_MS);
  const [time, setTime] = useState(msToTime(SEED_MS));

  useEffect(() => {
    const id = setInterval(() => {
      elapsed.current += 1000;
      setTime(msToTime(elapsed.current));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-visual card-visual-mercado">
      <div className="mercado-card-inner">
        {/* Header */}
        <div className="mercado-header">
          <span className="mercado-arrow">▼</span>
          <div className="mercado-ticker-wrap">
            <span className="mercado-ticker-icon">ñ</span>
            <span className="mercado-ticker-name">CYRE3</span>
          </div>
          <span className="mercado-qty-badge">80V</span>
          <span className="mercado-status-badge">Aberta</span>
        </div>

        {/* Field grid — 2 columns, larger */}
        <div className="mercado-grid">
          {FIELDS.map((f, i) => (
            <div className="mercado-field" key={i}>
              <span className="mercado-field-label">{f.label}</span>
              <span className={`mercado-field-value${f.strong ? ' mercado-value-bold' : ''}${f.clock ? ' mercado-value-mono' : ''}`}>
                {f.clock ? time : f.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
