import { useEffect, useRef } from "react";

// Low-tension catmull-rom — slight smoothing without artificial perfection
function mildSmooth(pts) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  const t = 0.10;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[Math.max(0, i - 2)];
    const p1 = pts[i - 1];
    const p2 = pts[i];
    const p3 = pts[Math.min(pts.length - 1, i + 1)];
    const cp1x = p1[0] + (p2[0] - p0[0]) * t;
    const cp1y = p1[1] + (p2[1] - p0[1]) * t;
    const cp2x = p2[0] - (p3[0] - p1[0]) * t;
    const cp2y = p2[1] - (p3[1] - p1[1]) * t;
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// Realistic market-data feel: flat open → first leg → consolidation → sharp push → final rally
// x: 62→318, y: 48(high=114.690) to ~135(low≈114.634)
const PTS = [
  // Flat/choppy opening
  [62,132],[70,134],[79,131],[88,133],[97,130],[105,132],
  // First leg up — moderate
  [113,126],[121,129],[128,122],[135,119],
  // Brief dip/pause
  [143,123],[150,120],[156,124],[162,117],
  // Sharp second leg
  [170,111],[178,106],[185,110],[191,104],[198,99],
  // Sideways consolidation
  [205,102],[212,98],[218,101],[224,96],
  // Final rally — volatile, decisive
  [231,90],[237,86],[243,80],[250,84],[256,77],
  [263,72],[269,68],[276,63],[283,57],[291,61],
  [298,54],[305,50],[311,53],[318,48],
];

const LINE_D = mildSmooth(PTS);
const AREA_D = LINE_D + ' L 318,140 L 62,140 Z';

// y=16→114.710, y=32→114.700, y=48→114.690, y=64→114.680 …
const Y_LABELS = [
  { v: '114.710', y: 16 },
  { v: '114.700', y: 32 },
  { v: '114.690', y: 48 },
  { v: '114.680', y: 64 },
  { v: '114.670', y: 80 },
  { v: '114.660', y: 96 },
  { v: '114.650', y: 112 },
  { v: '114.640', y: 128 },
];

const X_LABELS = [
  { v: '13/03', x: 75  },
  { v: '14/03', x: 140 },
  { v: '15/03', x: 210 },
  { v: '16/03', x: 278 },
];

export function CardVisualPerformance() {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const len = Math.ceil(el.getTotalLength());
    el.style.setProperty('--perf-len', len);
    el.style.strokeDasharray = len;
  }, []);

  return (
    <div className="card-visual card-visual-performance">
      {/* viewBox: 0-60 = badge zone, 60-320 = chart, 320-370 = Y labels */}
      <svg viewBox="0 0 370 150" width="100%" height="100%" className="perf-svg">
        <defs>
          <linearGradient id="perfAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#22c55e" stopOpacity="0.38" />
            <stop offset="65%"  stopColor="#22c55e" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
          <clipPath id="perfChartClip">
            <rect x="62" y="8" width="258" height="136" />
          </clipPath>
        </defs>

        {/* Y-axis grid lines */}
        {Y_LABELS.map(({ v, y }) => (
          <g key={v}>
            <line x1={62} y1={y} x2={318} y2={y}
              stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} strokeDasharray="3 3" />
            <text x={323} y={y + 3.5} fontSize="7" fill="rgba(255,255,255,0.38)"
              textAnchor="start" fontFamily="Inter, sans-serif">{v}</text>
          </g>
        ))}

        {/* Price badge + current-price dashed line at 114.690 (y=48) */}
        <line x1={58} y1={48} x2={318} y2={48}
          stroke="#22c55e" strokeWidth={0.9} strokeDasharray="4 3" opacity={0.55} />
        <rect x={2} y={41} width={56} height={14} fill="#22c55e" rx={3} />
        <text x={30} y={51.5} fill="#fff" fontSize="8.5" textAnchor="middle"
          fontFamily="Inter, sans-serif" fontWeight="700">114.690</text>

        {/* Reference level at 114.680 (y=64) */}
        <line x1={62} y1={64} x2={318} y2={64}
          stroke="rgba(255,255,255,0.18)" strokeWidth={0.6} strokeDasharray="5 3" />

        <g clipPath="url(#perfChartClip)">
          <path d={AREA_D} fill="url(#perfAreaGrad)" className="perf-area" />
          <path
            ref={lineRef}
            d={LINE_D}
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="perf-line"
          />
          <circle cx={318} cy={48} r={3.5} fill="#22c55e" className="perf-end-dot" />
          <circle cx={318} cy={48} r={3.5} fill="#22c55e" className="perf-end-ring" />
        </g>

        {/* X labels */}
        {X_LABELS.map(({ v, x }) => (
          <text key={v} x={x} y={147} fontSize="7" fill="rgba(255,255,255,0.28)"
            textAnchor="middle" fontFamily="Inter, sans-serif">{v}/2023</text>
        ))}
      </svg>
    </div>
  );
}
