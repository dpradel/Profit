import { useEffect, useState } from "react";

const W = 280, H = 150;
const PL = 44, PR = 6, PT = 10, PB = 20;
const CW = W - PL - PR, CH = H - PT - PB;
const ZERO_Y = PT + CH / 2;
const MAX_V = 4;
const N = 11;
const GAP = 6;
const BW_UNIT = (CW - GAP * (N + 1)) / N;
const BW_G = BW_UNIT * 0.88;
const BW_R = BW_G;
const R = 2.5; // corner radius

// Path with only top corners rounded (green bars grow upward)
function roundedTop(x, y, w, h, r) {
  return `M ${x+r},${y} H ${x+w-r} A ${r},${r} 0 0,1 ${x+w},${y+r} V ${y+h} H ${x} V ${y+r} A ${r},${r} 0 0,1 ${x+r},${y} Z`;
}

// Path with only bottom corners rounded (red bars grow downward)
function roundedBottom(x, y, w, h, r) {
  return `M ${x},${y} H ${x+w} V ${y+h-r} A ${r},${r} 0 0,1 ${x+w-r},${y+h} H ${x+r} A ${r},${r} 0 0,1 ${x},${y+h-r} V ${y} Z`;
}

const INIT = [
  { label: '#143', pos: 3.55, neg: 0.95 },
  { label: '#281', pos: 2.20, neg: 0.15 },
  { label: '#285', pos: 1.78, neg: 0.38 },
  { label: '#047', pos: 1.38, neg: 0.25 },
  { label: '#292', pos: 0.98, neg: 0.52 },
  { label: '#339', pos: 0.68, neg: 0.88 },
  { label: '#021', pos: 0.42, neg: 1.28 },
  { label: '#102', pos: 0.28, neg: 1.70 },
  { label: '#100', pos: 0.20, neg: 2.12 },
  { label: '#236', pos: 0.14, neg: 2.78 },
  { label: '#142', pos: 0.08, neg: 3.35 },
];

const Y_TICKS = [3, 2, 1, -1, -2, -3];

function nudge(v, d = 0.22) { return Math.max(0.04, v + (Math.random() * 2 - 1) * d); }
function scaleH(v) { return Math.max(0.02, Math.min(v, MAX_V) / MAX_V); }

export function CardVisualCapital() {
  const [bars, setBars] = useState(INIT);

  useEffect(() => {
    const id = setInterval(() => {
      setBars(prev => prev.map(b => ({ ...b, pos: nudge(b.pos), neg: nudge(b.neg) })));
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-visual card-visual-capital">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%">
        <rect width={W} height={H} fill="transparent" />

        {Y_TICKS.map(v => {
          const y = ZERO_Y - (v / MAX_V) * (CH / 2);
          return (
            <g key={v}>
              <line x1={PL} y1={y} x2={W - PR} y2={y}
                stroke="rgba(255,255,255,0.05)" strokeWidth={0.6} />
              <text x={PL - 3} y={y + 3.5} textAnchor="end"
                fill="rgba(255,255,255,0.25)" fontSize="6.8"
                fontFamily="Inter, sans-serif">
                R${v > 0 ? '+' : ''}{v}k
              </text>
            </g>
          );
        })}
        <line x1={PL} y1={ZERO_Y} x2={W - PR} y2={ZERO_Y}
          stroke="rgba(255,255,255,0.20)" strokeWidth={0.9} />

        {bars.map((b, i) => {
          const slotX = PL + GAP + i * (BW_UNIT + GAP);
          const gx = slotX + (BW_UNIT - BW_G) / 2;
          const rx = slotX + (BW_UNIT - BW_R) / 2;
          const cx = slotX + BW_UNIT / 2;
          const ps = scaleH(b.pos);
          const ns = Math.max(0.20, scaleH(b.neg));

          return (
            <g key={b.label}>
              {/* Green bar — rounded top, flat bottom */}
              <path
                d={roundedTop(gx, PT, BW_G, CH / 2, R)}
                fill="#3dc26e"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: '50% 100%',
                  transform: `scaleY(${ps})`,
                  transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                  willChange: 'transform',
                }}
              />
              {/* Red bar — flat top, rounded bottom */}
              <path
                d={roundedBottom(rx, ZERO_Y, BW_R, CH / 2, R)}
                fill="#e05858"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: '50% 0%',
                  transform: `scaleY(${ns})`,
                  transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
                  willChange: 'transform',
                }}
              />
              <text x={cx} y={H - 2} textAnchor="middle"
                fill="rgba(255,255,255,0.26)"
                fontSize="6.2" fontFamily="Inter, sans-serif">
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
