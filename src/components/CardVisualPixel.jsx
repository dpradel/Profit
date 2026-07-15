import { useEffect, useState } from "react";

const W = 300, H = 170;
const PT = 18, PB = 22, PL = 12, PR = 56;
const CW = W - PL - PR, CH = H - PT - PB;
const N = 12;
const SLOT = CW / N;
const BAR_W = 9;

const YMAX = 114.775, YMIN = 114.638;
const YSCALE = CH / (YMAX - YMIN);

function yp(price) {
  return PT + (YMAX - price) * YSCALE;
}

const RAW_CANDLES = [
  { o: 114.648, h: 114.695, l: 114.638, c: 114.680 },
  { o: 114.680, h: 114.712, l: 114.670, c: 114.705 },
  { o: 114.705, h: 114.718, l: 114.688, c: 114.693 },
  { o: 114.693, h: 114.722, l: 114.680, c: 114.716 },
  { o: 114.716, h: 114.732, l: 114.700, c: 114.708 },
  { o: 114.708, h: 114.728, l: 114.698, c: 114.724 },
  { o: 114.724, h: 114.742, l: 114.714, c: 114.736 },
  { o: 114.736, h: 114.748, l: 114.718, c: 114.722 },
  { o: 114.722, h: 114.740, l: 114.712, c: 114.737 },
  { o: 114.737, h: 114.758, l: 114.724, c: 114.750 },
  { o: 114.750, h: 114.764, l: 114.740, c: 114.744 },
  { o: 114.744, h: 114.770, l: 114.732, c: 114.762 },
];

const CANDLES = RAW_CANDLES.map((c, i) => ({
  ...c,
  up: c.c >= c.o,
  cx: PL + i * SLOT + SLOT / 2,
}));

const Y_LABELS = [114.760, 114.740, 114.720, 114.700, 114.680, 114.660];

const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DUR = '0.5s';

export function CardVisualPixel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const tick = () => {
      current++;
      if (current < N) {
        setIdx(current);
      } else {
        setVisible(false);
        setTimeout(() => { current = 0; setIdx(0); setVisible(true); }, 700);
      }
    };
    const id = setInterval(tick, 700);
    return () => clearInterval(id);
  }, []);

  const c = CANDLES[idx];
  const cx = c.cx;
  const midY = yp((c.h + c.l) / 2);
  const color = c.up ? '#3dc26e' : '#e05858';

  // tooltip: left side for last 4 candles, right for the rest
  const ttW = 94, ttH = 54;
  const toLeft = idx >= N - 4;
  const ttX = toLeft ? cx - ttW - 12 : cx + 12;
  const ttY = Math.min(Math.max(midY - ttH / 2, PT), H - PB - ttH);

  return (
    <div className="card-visual card-visual-pixel">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" className="pixel-svg">
        {/* Y grid + labels */}
        {Y_LABELS.map(price => {
          const y = yp(price);
          return (
            <g key={price}>
              <line x1={PL} y1={y} x2={W - PR} y2={y}
                stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} strokeDasharray="3 3" />
              <text x={W - PR + 4} y={y + 3.5} fontSize="6.8" fill="rgba(255,255,255,0.30)"
                fontFamily="Inter, sans-serif" textAnchor="start">
                {price.toFixed(3)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {CANDLES.map((candle, i) => {
          const isActive = i === idx;
          const col = candle.up ? '#3dc26e' : '#e05858';
          const bodyTop = yp(Math.max(candle.o, candle.c));
          const bodyH = Math.max(Math.abs(yp(candle.o) - yp(candle.c)), 2);
          return (
            <g key={i} style={{
              opacity: visible ? (isActive ? 1 : i < idx ? 0.70 : 0.35) : (i < idx ? 0.70 : 0.35),
              transition: `opacity 0.4s ${EASE}`,
            }}>
              <line x1={candle.cx} y1={yp(candle.h)} x2={candle.cx} y2={yp(candle.l)}
                stroke={col} strokeWidth={isActive ? 1.4 : 1.0} />
              <rect x={candle.cx - BAR_W / 2} y={bodyTop} width={BAR_W} height={bodyH}
                fill={col} rx={1.5} />
              {isActive && visible && (
                <rect x={candle.cx - BAR_W / 2 - 1.5} y={bodyTop - 1.5}
                  width={BAR_W + 3} height={bodyH + 3}
                  fill="none" stroke={col} strokeWidth={0.8} rx={2.5} opacity={0.55} />
              )}
            </g>
          );
        })}

        {/* Crosshair vertical — slides horizontally via translateX */}
        <g style={{
          transform: `translateX(${cx}px)`,
          transition: `transform ${DUR} ${EASE}`,
          opacity: visible ? 1 : 0,
        }}>
          <line x1={0} y1={PT} x2={0} y2={H - PB}
            stroke="rgba(255,255,255,0.35)" strokeWidth={0.7} strokeDasharray="3 2" />
        </g>

        {/* Crosshair horizontal — slides vertically via translateY */}
        <g style={{
          transform: `translateY(${midY}px)`,
          transition: `transform ${DUR} ${EASE}`,
          opacity: visible ? 1 : 0,
        }}>
          <line x1={PL} y1={0} x2={W - PR} y2={0}
            stroke="rgba(255,255,255,0.22)" strokeWidth={0.6} strokeDasharray="3 2" />
        </g>

        {/* Crosshair dot — slides on both axes */}
        <g style={{
          transform: `translate(${cx}px, ${midY}px)`,
          transition: `transform ${DUR} ${EASE}`,
          opacity: visible ? 1 : 0,
        }}>
          <circle cx={0} cy={0} r={2.4} fill="rgba(255,255,255,0.90)" />
        </g>

        {/* Tooltip — slides smoothly to each candle's position */}
        <g style={{
          transform: `translate(${ttX}px, ${ttY}px)`,
          transition: `transform ${DUR} ${EASE}`,
          opacity: visible ? 1 : 0,
        }}>
          <rect x={0} y={0} width={ttW} height={ttH}
            fill="rgba(10,14,26,0.94)" rx={5}
            stroke="rgba(255,255,255,0.11)" strokeWidth={0.7} />
          <text x={7} y={11} fontSize="7.2" fill="rgba(255,255,255,0.80)"
            fontFamily="Inter, sans-serif" fontWeight="700">WINJ25 · 1 Min</text>
          <line x1={4} y1={15} x2={ttW - 4} y2={15}
            stroke="rgba(255,255,255,0.09)" strokeWidth={0.5} />
          {[
            { label: 'O', val: c.o.toFixed(3), col: 'rgba(255,255,255,0.50)' },
            { label: 'H', val: c.h.toFixed(3), col: '#3dc26e' },
            { label: 'L', val: c.l.toFixed(3), col: '#e05858' },
            { label: 'C', val: c.c.toFixed(3), col: color },
          ].map(({ label, val, col: vc }, j) => (
            <g key={j}>
              <text
                x={7 + (j % 2) * 47}
                y={27 + Math.floor(j / 2) * 16}
                fontSize="6.8" fill="rgba(255,255,255,0.38)"
                fontFamily="Inter, sans-serif"
              >{label}:</text>
              <text
                x={16 + (j % 2) * 47}
                y={27 + Math.floor(j / 2) * 16}
                fontSize="6.8" fill={vc}
                fontFamily="Inter, sans-serif" fontWeight="600"
              >{val}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
