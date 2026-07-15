import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import bmcNewsLogo from "../assets/bmc-news/bmc-news-logo.png";
import bmcNewsMain from "../assets/bmc-news/bmc-news-main.png";
import bmcNewsSideLeft from "../assets/bmc-news/bmc-news-side-left.png";
import bmcNewsSideRight from "../assets/bmc-news/bmc-news-side-right.png";
import akelooLogoDark from "../assets/akeloo/akeloo_logo_dark.png";
import copilotIcon from "../assets/copilot/copilot-icon.svg";
import replayForwardTradeIcon from "../assets/replay/replay-avancar-trade.svg";
import replaySetTimeIcon from "../assets/replay/replay-definir-horario.svg";
import replayBackIcon from "../assets/replay/replay-retroceder.svg";
import indicatorTrendIcon from "../assets/indicators/indicator-trend.svg";
import indicatorCurveIcon from "../assets/indicators/indicator-curve.svg";
import indicatorBarsIcon from "../assets/indicators/indicator-bars.svg";
import indicatorWaveIcon from "../assets/indicators/indicator-wave.svg";
import { planOptions, toolResources } from "../data/toolResourcesData.jsx";

function getPlanOption(planId) {
  return planOptions.find((plan) => plan.id === planId) ?? planOptions[planOptions.length - 1];
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function Bars({ count = 8, className = "" }) {
  return (
    <div className={`tool-bars ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ "--bar-index": index }} />
      ))}
    </div>
  );
}

function Rows({ count = 8, className = "" }) {
  return (
    <div className={`tool-rows ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ "--row-index": index }}>
          <i />
          <b />
          <em />
        </span>
      ))}
    </div>
  );
}

function ChartScene({ dense = false }) {
  return (
    <div className={`tool-chart-scene${dense ? " dense" : ""}`}>
      <div className="tool-grid-lines" />
      <div className="tool-candles" aria-hidden="true">
        {Array.from({ length: 22 }, (_, index) => (
          <span key={index} style={{ "--candle-index": index }} />
        ))}
      </div>
      <svg viewBox="0 0 420 190" aria-hidden="true">
        <polyline points="2,140 34,128 64,152 96,96 128,104 160,70 190,84 220,48 250,58 280,38 320,54 360,22 418,40" />
        <path d="M2 140 L34 128 L64 152 L96 96 L128 104 L160 70 L190 84 L220 48 L250 58 L280 38 L320 54 L360 22 L418 40 L418 190 L2 190 Z" />
      </svg>
      <Bars count={6} className="tool-price-scale" />
    </div>
  );
}

const insideTrackBars = [
  ["3%", "27%", "green", "0ms"],
  ["6%", "31%", "green", "38ms"],
  ["11%", "22%", "red", "76ms"],
  ["18%", "44%", "green", "114ms"],
  ["20%", "63%", "green", "152ms"],
  ["21.8%", "78%", "green", "190ms"],
  ["24.3%", "49%", "green", "228ms"],
  ["35%", "57%", "green", "266ms"],
  ["37.6%", "45%", "red", "304ms"],
  ["40.8%", "52%", "green", "342ms"],
  ["48%", "20%", "green", "380ms"],
  ["53.5%", "66%", "green", "418ms"],
  ["60%", "33%", "red", "456ms"],
  ["63.2%", "50%", "green", "494ms"],
  ["65.4%", "59%", "green", "532ms"],
  ["67.6%", "48%", "green", "570ms"],
  ["74.5%", "70%", "green", "608ms"],
  ["77.2%", "88%", "green", "646ms"],
  ["80.1%", "50%", "green", "684ms"],
  ["83.6%", "63%", "green", "722ms"],
  ["86.2%", "34%", "red", "760ms"],
  ["97%", "34%", "red", "798ms"],
];

const insideTrackMarkers = [
  ["16%", "63%", "green"],
  ["17.5%", "58%", "green"],
  ["19.2%", "53%", "green"],
  ["21%", "50%", "green"],
  ["24%", "48%", "green"],
  ["35%", "39%", "green"],
  ["37.5%", "28%", "red"],
  ["40.5%", "22%", "green"],
  ["48%", "12%", "green"],
  ["53.5%", "20%", "green"],
  ["60%", "18%", "red"],
  ["63%", "14%", "green"],
  ["65.6%", "11%", "green"],
  ["67.6%", "14%", "green"],
  ["74.4%", "9%", "green"],
  ["77.3%", "8%", "green"],
  ["80%", "10%", "green"],
  ["83.6%", "12%", "green"],
  ["86.4%", "8%", "red"],
  ["96.8%", "5%", "red"],
];

function InsideTrackScene() {
  return (
    <div className="inside-track-scene">
      <header className="inside-track-tabs">
        <span className="inside-track-brand" />
        <span className="inside-track-tab is-active">
          <i />
          <b />
        </span>
        <span className="inside-track-tab">
          <i />
          <b />
        </span>
        <span className="inside-track-add">+</span>
      </header>

      <div className="inside-track-toolbar">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index}>
            <i />
            <b />
          </span>
        ))}
      </div>

      <div className="inside-track-columns">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <section className="inside-track-chart">
        <div className="inside-track-grid" />
        <svg viewBox="0 0 560 228" aria-hidden="true">
          <path d="M0 150 L35 176 L76 165 L116 158 L156 170 L178 120 L215 104 L246 104 L282 62 L324 82 L363 70 L404 82 L430 62 L468 72 L505 38 L540 46 L560 26 L560 228 L0 228 Z" />
          <polyline pathLength="1" points="0,150 35,176 76,165 116,158 156,170 178,120 215,104 246,104 282,62 324,82 363,70 404,82 430,62 468,72 505,38 540,46 560,26" />
        </svg>

        <div className="inside-track-volume">
          {insideTrackBars.map(([left, height, tone, delay], index) => (
            <i key={index} className={`is-${tone}`} style={{ "--inside-left": left, "--inside-height": height, "--inside-delay": delay }} />
          ))}
        </div>

        <div className="inside-track-markers">
          {insideTrackMarkers.map(([left, top, tone], index) => (
            <b key={index} className={`is-${tone}`} style={{ "--inside-left": left, "--inside-top": top, "--inside-marker-index": index }} />
          ))}
        </div>
      </section>
    </div>
  );
}

const ivRankLinePoints =
  "0,156 10,130 18,164 27,84 38,150 50,142 61,148 72,142 82,170 92,118 106,118 118,176 128,200 141,176 149,204 158,118 168,118 180,50 188,58 196,164 210,140 224,140 236,156 246,136 258,166 268,148 282,148 294,142 304,148 314,132 324,142 334,98 346,98 356,140 366,140 374,112 382,152 392,38 402,118 414,118 424,136 434,118 444,118 454,134 464,118 474,154 484,154 494,142 504,166 514,132 524,148 534,122 544,116 554,116 566,150 578,42 588,112 598,70 608,124 620,116 632,120 644,102 654,132 664,132 676,112 688,24 700,174";

function IvRankScene() {
  return (
    <div className="iv-rank-scene">
      <header className="iv-rank-tabs">
        <span className="iv-rank-brand" />
        <span className="iv-rank-tab is-active">
          <i />
          <b />
        </span>
        <span className="iv-rank-tab">
          <i />
          <b />
        </span>
        <span className="iv-rank-add">+</span>
      </header>

      <div className="iv-rank-columns">
        {Array.from({ length: 11 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <section className="iv-rank-chart">
        <div className="iv-rank-grid" />
        <svg viewBox="0 0 700 224" aria-hidden="true">
          <polyline pathLength="1" points={ivRankLinePoints} />
        </svg>
      </section>
    </div>
  );
}

const motionTrackerCandles = [
  { x: 4, top: 39, height: 34, tone: "green" },
  { x: 7, top: 17, height: 50, tone: "green" },
  { x: 9, top: 25, height: 32, tone: "red" },
  { x: 12, top: 34, height: 44, tone: "green" },
  { x: 15, top: 52, height: 28, tone: "red" },
  { x: 18, top: 30, height: 42, tone: "green" },
  { x: 21, top: 21, height: 58, tone: "red" },
  { x: 24, top: 46, height: 32, tone: "red" },
  { x: 28, top: 54, height: 24, tone: "green" },
  { x: 31, top: 48, height: 30, tone: "red" },
  { x: 35, top: 58, height: 28, tone: "green" },
  { x: 39, top: 63, height: 36, tone: "red" },
  { x: 43, top: 50, height: 34, tone: "green" },
  { x: 46, top: 45, height: 42, tone: "green" },
  { x: 50, top: 64, height: 28, tone: "red" },
  { x: 55, top: 53, height: 34, tone: "green" },
  { x: 59, top: 47, height: 42, tone: "green" },
  { x: 62, top: 42, height: 38, tone: "red" },
  { x: 66, top: 48, height: 34, tone: "red" },
  { x: 70, top: 57, height: 28, tone: "green" },
  { x: 74, top: 60, height: 32, tone: "red" },
  { x: 78, top: 66, height: 28, tone: "green" },
  { x: 84, top: 71, height: 24, tone: "red" },
  { x: 90, top: 62, height: 30, tone: "green" },
];

function MotionTrackerScene() {
  return (
    <div className="motion-tracker-scene">
      <section className="motion-chart-window">
        <header className="motion-chart-tabs">
          <span className="motion-chart-brand" />
          <span className="motion-chart-tab is-active">
            <i />
            <b />
          </span>
          <span className="motion-chart-tab">
            <i />
            <b />
          </span>
          <span className="motion-chart-add" />
        </header>

        <div className="motion-chart-toolbar">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="motion-chart-canvas">
          <div className="motion-chart-grid" />
          <div className="motion-candles">
            {motionTrackerCandles.map((candle, index) => (
              <i
                className={`is-${candle.tone}`}
                key={index}
                style={{
                  "--motion-candle-x": `${candle.x}%`,
                  "--motion-candle-top": `${candle.top}%`,
                  "--motion-candle-height": `${candle.height}%`,
                  "--motion-candle-index": index,
                }}
              />
            ))}
          </div>
          <span className="motion-price-marker" />
        </div>
      </section>

      <section className="motion-panel">
        <article className="motion-mini-row is-blue" style={{ "--motion-row-index": 0 }}>
          <span />
          <i />
          <b />
          <em />
        </article>
        <article className="motion-mini-row is-cyan" style={{ "--motion-row-index": 1 }}>
          <span />
          <i />
          <b />
          <em />
        </article>
        <article className="motion-control-card" style={{ "--motion-row-index": 2 }}>
          <header>
            <span />
            <b />
            <i />
            <em />
          </header>
          <div className="motion-control-body">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} />
            ))}
            <strong />
            <strong />
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

function TableScene({ heat = false }) {
  return (
    <div className={`tool-table-scene${heat ? " heat" : ""}`}>
      <div className="tool-table-head">
        <Bars count={6} />
      </div>
      <Rows count={9} />
    </div>
  );
}

function OrdersListScene() {
  return (
    <div className="orders-list-scene">
      <header className="orders-list-tabs">
        <span className="orders-list-brand" />
        {Array.from({ length: 5 }, (_, index) => (
          <span className={index === 0 ? "orders-list-tab is-active" : "orders-list-tab"} key={index}>
            <b />
          </span>
        ))}
      </header>

      <div className="orders-list-head">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <section className="orders-list-table">
        {Array.from({ length: 13 }, (_, rowIndex) => (
          <article key={rowIndex} style={{ "--orders-row-index": rowIndex }}>
            {Array.from({ length: 7 }, (_, columnIndex) => (
              <span key={columnIndex} className={columnIndex === 0 ? "is-asset" : columnIndex === 3 ? "is-status" : undefined}>
                <b />
              </span>
            ))}
          </article>
        ))}
      </section>
    </div>
  );
}

function QuoteGridScene() {
  const groups = [
    { tone: "positive", rows: 2 },
    { tone: "negative", rows: 3 },
    { tone: "positive", rows: 2 },
  ];
  let rowIndex = 0;

  return (
    <div className="quote-grid-scene">
      <header className="quote-grid-titlebar">
        <span className="quote-grid-brand" />
        <span className="quote-grid-tab is-active">
          <i />
        </span>
        <span className="quote-grid-tab">
          <i />
        </span>
        <div className="quote-grid-window-actions">
          <i />
          <i />
          <i />
        </div>
      </header>

      <div className="quote-grid-toolbar">
        <span className="quote-grid-plus" />
        <span className="quote-grid-database" />
        <span className="quote-grid-wave" />
        <span className="quote-grid-filter" />
        <span className="quote-grid-list" />
        <span className="quote-grid-clock" />
        <span className="quote-grid-study" />
        <span className="quote-grid-pin" />
      </div>

      <div className="quote-grid-columns">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="quote-grid-body">
        {groups.map((group, groupIndex) => (
          <section className={`quote-sector is-${group.tone}`} key={groupIndex}>
            <header>
              <i />
              <span />
              <b />
            </header>
            {Array.from({ length: group.rows }, (_, index) => {
              const currentRowIndex = rowIndex;
              rowIndex += 1;
              const down = group.tone === "negative" || (groupIndex === 1 && index > 0);

              return (
                <article className={down ? "is-down" : undefined} key={currentRowIndex} style={{ "--quote-row-index": currentRowIndex }}>
                  <span className="quote-row-status">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="quote-row-asset">
                    <i />
                    <b />
                  </span>
                  <span className="quote-row-sparkline">
                    <svg viewBox="0 0 120 42" aria-hidden="true">
                      <polyline points={down ? "0,8 14,16 28,13 42,22 56,18 70,28 84,31 98,36 120,30" : "0,30 14,24 28,28 42,18 56,20 70,14 84,16 98,8 120,12"} />
                    </svg>
                  </span>
                  <span className="quote-row-price" />
                  <span className="quote-row-time" />
                  <span className="quote-row-extra" />
                </article>
              );
            })}
          </section>
        ))}
      </div>

      <footer className="quote-grid-footer">
        {Array.from({ length: 6 }, (_, index) => (
          <span className={index === 0 ? "is-active" : undefined} key={index} />
        ))}
      </footer>
    </div>
  );
}

const indicatorCards = [
  ["trend", "teal"],
  ["wave", "teal"],
  ["dots", "teal"],
  ["curve", "red"],
  ["curve", "red"],
  ["trend", "teal"],
  ["bars", "mixed"],
  ["trend", "teal"],
  ["wave", "teal"],
  ["trend", "teal"],
  ["trend", "teal"],
  ["curve", "red"],
];

const indicatorIconMap = {
  trend: indicatorTrendIcon,
  wave: indicatorWaveIcon,
  dots: indicatorTrendIcon,
  curve: indicatorCurveIcon,
  bars: indicatorBarsIcon,
};

const indicatorPreviewLines = [
  "0,78 18,54 34,62 52,30 70,48 88,20 104,34 124,12 144,24",
  "0,64 20,70 36,46 52,52 70,28 88,42 108,20 126,30 144,18",
  "0,76 18,70 32,84 50,52 66,58 82,36 102,44 124,24 144,34",
];

function IndicatorGlyph({ type, tone }) {
  return (
    <span className={`indicator-glyph is-${type} is-${tone}`}>
      <i />
      <i />
      <i />
    </span>
  );
}

function IndicatorsScene() {
  return (
    <div className="indicators-scene">
      <aside className="indicators-sidebar">
        <div className="indicators-sidebar-title">
          <span />
          <i />
        </div>
        <div className="indicators-search">
          <i />
          <span />
          <b />
        </div>

        <div className="indicators-sidebar-group is-short">
          <header>
            <span />
            <i />
          </header>
          <b />
          <b />
        </div>

        <div className="indicators-sidebar-group">
          <header>
            <span />
            <i />
          </header>
          {Array.from({ length: 12 }, (_, index) => (
            <b key={index} style={{ "--indicator-list-index": index }} />
          ))}
        </div>
      </aside>

      <main className="indicators-main">
        <header className="indicators-main-head">
          <span />
        </header>

        <section className="indicators-card-grid">
          {indicatorCards.map(([type, tone], index) => (
            <article key={index} style={{ "--indicator-card-index": index }}>
              <img src={indicatorIconMap[type]} alt="" />
              <div>
                <span />
                <b />
              </div>
            </article>
          ))}
        </section>

        <div className="indicators-bottom-label" />

        <section className="indicators-preview-strip">
          {indicatorPreviewLines.map((points, index) => (
            <article key={index} style={{ "--indicator-preview-index": index }}>
              <div className="indicators-preview-grid" />
              <div className="indicators-preview-candles">
                {Array.from({ length: 11 }, (_, candleIndex) => (
                  <span key={candleIndex} />
                ))}
              </div>
              <svg viewBox="0 0 144 96" aria-hidden="true">
                <polyline pathLength="1" points={points} />
                <polyline pathLength="1" className="is-secondary" points="0,58 18,50 34,54 52,38 70,44 88,30 104,34 124,22 144,28" />
              </svg>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

function DashboardScene() {
  return (
    <div className="tool-dashboard-scene">
      <div className="tool-gauge">
        <span />
        <i />
      </div>
      <div className="tool-dashboard-main">
        <Bars count={4} />
        <ChartScene />
      </div>
      <Rows count={5} />
    </div>
  );
}

function PerformanceReportScene() {
  return (
    <div className="performance-report-scene">
      <header className="performance-titlebar">
        <span className="performance-brand" />
        <span className="performance-tab is-active">
          <i />
        </span>
      </header>

      <section className="performance-toolbar">
        <div className="performance-summary">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="performance-filter is-small">
          <i />
          <span />
        </div>
        <div className="performance-filter is-small">
          <i />
          <span />
        </div>
        <div className="performance-filter">
          <span />
          <b />
        </div>
        <div className="performance-filter">
          <span />
          <b />
        </div>
      </section>

      <section className="performance-chart-panel">
        <div className="performance-grid" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} />
          ))}
        </div>

        <svg className="performance-chart-line" viewBox="0 0 520 180" aria-hidden="true">
          <line className="performance-baseline" x1="42" y1="106" x2="482" y2="106" />
          <line className="performance-crosshair" x1="318" y1="46" x2="318" y2="164" />
          <polyline
            className="performance-line-negative"
            pathLength="1"
            points="62,106 68,132 82,114 98,110 116,115 132,112 148,119 162,114 176,122 192,111 206,116 220,102"
          />
          <polyline
            className="performance-line-positive"
            pathLength="1"
            points="220,102 235,84 248,92 263,78 276,88 291,74 304,86 318,50 330,72 340,59 354,75 370,72 388,73 402,67 418,77 436,81 452,80 470,84"
          />
          <circle className="performance-peak-dot" cx="318" cy="50" r="7" />
          <circle className="performance-base-dot" cx="318" cy="106" r="7" />
        </svg>

        <div className="performance-glass-card">
          <span />
          <span />
          <span />
          <i />
        </div>
      </section>
    </div>
  );
}

const tradePlanMiniLines = [
  "0,52 44,52 74,52 108,36 144,18",
  "0,52 38,52 72,52 110,38 144,18",
  "0,54 46,54 82,54 112,36 144,14",
];

const tradePlanBars = [
  [42, "is-positive"],
  [66, "is-positive"],
  [18, "is-negative"],
  [54, "is-positive"],
  [20, "is-negative"],
  [42, "is-positive"],
];

function TradePlanScene() {
  return (
    <div className="trade-plan-scene">
      <div className="trade-plan-window">
        <header className="trade-plan-tabs">
          <span className="trade-plan-brand" />
          <span className="trade-plan-tab is-active">
            <b />
          </span>
          <span className="trade-plan-tab">
            <b />
          </span>
          <span className="trade-plan-divider" />
          <span className="trade-plan-tab is-short">
            <b />
          </span>
        </header>

        <aside className="trade-plan-sidebar">
          <span className="trade-plan-sidebar-title" />
          <span className="trade-plan-sidebar-small" />
          <div className="trade-plan-gauge">
            <svg viewBox="0 0 100 50" fill="none" aria-hidden="true">
              <path d="M 10 50 A 40 40 0 0 1 90 50" stroke="rgba(255,255,255,0.15)" strokeWidth="14" strokeLinecap="butt" />
              <path d="M 10 50 A 40 40 0 0 1 78.3 21.7" stroke="rgba(45,145,226,0.96)" strokeWidth="14" strokeLinecap="butt" />
            </svg>
            <b />
          </div>
          <div className="trade-plan-sidebar-lines">
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="trade-plan-progress">
            <span />
            <b />
            <span />
            <b />
          </div>
        </aside>

        <main className="trade-plan-main">
          <section className="trade-plan-kpis">
            {tradePlanMiniLines.map((points, index) => (
              <article className="trade-plan-kpi-card" key={points} style={{ "--trade-kpi-index": index }}>
                <span />
                <b />
                <svg viewBox="0 0 144 68" aria-hidden="true">
                  <line x1="0" y1="52" x2="144" y2="52" />
                  <polyline pathLength="1" points={points} />
                </svg>
              </article>
            ))}
          </section>

          <section className="trade-plan-chart-panel">
            <div className="trade-plan-chart-head">
              <span />
              <div>
                <i />
                <b />
                <i />
                <b />
              </div>
            </div>
            <div className="trade-plan-chart-grid" />
            <div className="trade-plan-chart-bars" aria-hidden="true">
              {tradePlanBars.map(([height, tone], index) => (
                <span
                  className={tone}
                  key={index}
                  style={{ "--trade-bar-height": `${height}%`, "--trade-bar-index": index }}
                />
              ))}
            </div>
            <div className="trade-plan-chart-axis">
              {Array.from({ length: 6 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function PositionScene() {
  const rows = [
    { tone: "positive" },
    { tone: "positive" },
    { tone: "negative" },
    { tone: "positive" },
  ];

  return (
    <div className="position-scene">
      <header className="position-tabs">
        <span className="position-brand" />
        {Array.from({ length: 5 }, (_, index) => (
          <span className={index === 0 ? "position-tab is-active" : "position-tab"} key={index}>
            <b />
          </span>
        ))}
      </header>

      <div className="position-column-head">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <section className="position-layout">
        <aside className="position-donut-panel">
          <div className="position-donut">
            <div className="position-donut-labels">
              <span />
              <strong />
              <span />
              <strong />
            </div>
          </div>
        </aside>

        <main className="position-table-panel">
          <div className="position-table-rows">
            {rows.map((row, rowIndex) => (
              <article className={`position-table-row is-${row.tone}`} key={rowIndex} style={{ "--position-row-index": rowIndex }}>
                <span className="position-asset">
                  <i />
                  <b />
                </span>
                <span>
                  <b />
                </span>
                <span>
                  <b />
                </span>
                <span className="position-status">
                  <b />
                </span>
              </article>
            ))}
          </div>
          <div className="position-empty-panel" />
        </main>
      </section>
    </div>
  );
}

function CalculatorScene() {
  return (
    <div className="akeloo-scene">
      <aside className="akeloo-sidebar">
        <img className="akeloo-logo" src={akelooLogoDark} alt="" aria-hidden="true" />
        <span className="is-active">
          <i />
          <b />
        </span>
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index}>
            <i />
            <b />
            <em />
          </span>
        ))}
      </aside>

      <main className="akeloo-dashboard">
        <div className="akeloo-topbar">
          <i />
          <div>
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <b />
        </div>

        <section className="akeloo-summary">
          <div>
            <span />
            <em />
          </div>
          <div>
            <span />
            <em />
          </div>
        </section>

        <section className="akeloo-chart-card">
          <span />
          <svg viewBox="0 0 320 150" aria-hidden="true">
            <path d="M0 122 C36 80 58 60 92 75 C128 94 146 60 184 38 C220 15 232 98 264 70 C286 52 300 42 320 36 L320 150 L0 150 Z" />
            <polyline pathLength="1" points="0,122 34,84 64,62 92,75 126,92 158,58 190,34 220,42 244,98 272,66 294,48 320,36" />
          </svg>
          <div className="akeloo-axis">
            {Array.from({ length: 10 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
        </section>

        <section className="akeloo-gauge-card">
          <div className="akeloo-gauge-ring">
            <span />
            <strong />
          </div>
          <em />
        </section>
      </main>
    </div>
  );
}

const marketMonitorTiles = [
  { tone: "green", area: "1 / 1 / 4 / 6", rows: ["wide", "inline", "medium", "small"] },
  { tone: "red", area: "1 / 6 / 5 / 9", rows: ["large", "inline", "medium", "medium"] },
  { tone: "green", area: "1 / 9 / 3 / 11", rows: ["small", "inline", "small", "small"] },
  { tone: "bright", area: "1 / 11 / 3 / 13", rows: ["small", "inline", "small", "small"] },
  { tone: "green", area: "4 / 1 / 9 / 4", rows: ["large", "inline", "large", "medium"] },
  { tone: "red", area: "4 / 4 / 9 / 6", rows: ["large", "inline", "medium", "large"] },
  { tone: "red", area: "5 / 6 / 7 / 9", rows: ["inline", "small", "small"] },
  { tone: "muted", area: "3 / 9 / 5 / 11", rows: ["small", "inline", "small", "small"] },
  { tone: "green", area: "3 / 11 / 5 / 13", rows: ["small", "inline", "small", "small"] },
  { tone: "red", area: "7 / 6 / 9 / 8", rows: ["medium", "inline", "small", "small"] },
  { tone: "green", area: "7 / 8 / 9 / 9", rows: ["inline", "small", "small"] },
  { tone: "red", area: "5 / 9 / 7 / 11", rows: ["inline", "small", "small"] },
  { tone: "green", area: "5 / 11 / 7 / 13", rows: ["inline", "small", "small"] },
  { tone: "green", area: "7 / 9 / 9 / 11", rows: ["inline", "small", "small"] },
  { tone: "muted", area: "7 / 11 / 9 / 13", rows: ["inline", "small", "small"] },
];

function MarketMonitorScene() {
  return (
    <div className="market-monitor-scene">
      <header className="market-monitor-tabs">
        <span className="market-monitor-brand">
          <i />
        </span>
        {Array.from({ length: 5 }, (_, index) => (
          <span className={index === 0 ? "market-monitor-tab is-active" : "market-monitor-tab"} key={index}>
            <b />
          </span>
        ))}
      </header>

      <section className="market-monitor-map">
        {marketMonitorTiles.map((tile, index) => (
          <article className={`is-${tile.tone}`} key={index} style={{ "--monitor-area": tile.area, "--monitor-tile-index": index }}>
            <div>
              {tile.rows.map((row, rowIndex) => (
                <span className={`is-${row}`} key={rowIndex}>
                  <i />
                  <b />
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

const pressurePanels = [
  { tone: "blue", width: "42%", align: "end" },
  { tone: "red", width: "38%", align: "start" },
  { tone: "blue", width: "39%", align: "end" },
  { tone: "red", width: "36%", align: "start" },
  { tone: "green", width: "40%", align: "end" },
  { tone: "dark-red", width: "41%", align: "start" },
];

function PressureMetersScene() {
  return (
    <div className="pressure-meters-scene">
      <header className="pressure-meters-tabs">
        <span className="pressure-meters-brand" />
        <span className="pressure-meters-tab is-active">
          <i />
          <b />
        </span>
        <span className="pressure-meters-tab">
          <i />
          <b />
        </span>
        <span className="pressure-meters-add" />
      </header>

      <section className="pressure-meters-grid">
        {pressurePanels.map((panel, index) => (
          <article
            className={`is-${panel.tone}`}
            key={index}
            style={{ "--pressure-bar-width": panel.width, "--pressure-row-index": index, "--pressure-align": panel.align }}
          >
            <span />
          </article>
        ))}
      </section>
    </div>
  );
}

function MatrixScene() {
  return (
    <div className="tool-matrix-scene">
      <header className="matrix-titlebar">
        <span className="matrix-brand" />
        <b />
      </header>

      <section className="matrix-toolbar">
        <span className="matrix-calendar">
          <i />
          <i />
          <i />
        </span>
        <b />
        <em />
        <b />
        <em />
        <span className="matrix-list-icon">
          <i />
          <i />
          <i />
        </span>
      </section>

      <div className="matrix-column-head">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="matrix-body">
        <aside className="matrix-row-head">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index} style={{ "--matrix-row-index": index }} />
          ))}
        </aside>

        <section className="matrix-cells">
          {Array.from({ length: 120 }, (_, index) => (
            <span key={index} style={{ "--matrix-cell-index": index }} />
          ))}
        </section>
      </div>
    </div>
  );
}

const bookOfferRows = [
  { side: "ask", bid: 18, ask: 58, price: 44 },
  { side: "ask", bid: 24, ask: 38, price: 40 },
  { side: "ask", bid: 22, ask: 68, price: 48 },
  { side: "ask", bid: 16, ask: 82, price: 36 },
  { side: "ask", bid: 30, ask: 52, price: 46 },
  { side: "ask", bid: 20, ask: 44, price: 42 },
  { side: "last", bid: 34, ask: 30, price: 62 },
  { side: "bid", bid: 68, ask: 20, price: 48 },
  { side: "bid", bid: 52, ask: 24, price: 43 },
  { side: "bid", bid: 82, ask: 18, price: 38 },
  { side: "bid", bid: 56, ask: 22, price: 44 },
  { side: "bid", bid: 72, ask: 26, price: 41 },
  { side: "bid", bid: 44, ask: 18, price: 36 },
];

function BookScene() {
  return (
    <div className="book-offers-scene">
        <section className="book-offers-window">
          <header className="book-offers-tabs">
            <span className="book-offers-brand" />
            {Array.from({ length: 2 }, (_, index) => (
              <span className={index === 0 ? "book-offers-tab is-active" : "book-offers-tab"} key={index}>
                <i />
                <b />
              </span>
            ))}
            <span className="book-offers-add" />
          </header>

          <div className="book-offers-toolbar">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="book-offers-head">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <section className="book-offers-rows">
            {bookOfferRows.map((row, index) => (
              <article
                className={`book-offers-row is-${row.side}`}
                key={index}
                style={{
                  "--book-row-index": index,
                  "--bid-depth": `${row.bid}%`,
                  "--ask-depth": `${row.ask}%`,
                  "--price-width": `${row.price}%`,
                }}
              >
                <em className="book-depth book-depth-bid" />
                <i className="book-cell book-bid-size" />
                <b className="book-price-level" />
                <i className="book-cell book-ask-size" />
                <em className="book-depth book-depth-ask" />
              </article>
            ))}
          </section>

          <footer className="book-offers-footer">
            {Array.from({ length: 7 }, (_, index) => (
              <span key={index} />
            ))}
          </footer>
        </section>
      </div>
  );
}

const superDomRows = [
  { side: "ask", size: 44 },
  { side: "ask", size: 36 },
  { side: "ask", size: 58 },
  { side: "ask", size: 40 },
  { side: "ask", size: 64 },
  { side: "ask", size: 48 },
  { side: "last", size: 54 },
  { side: "bid", size: 46 },
  { side: "bid", size: 62 },
  { side: "bid", size: 38 },
  { side: "bid", size: 54 },
  { side: "bid", size: 68 },
  { side: "bid", size: 44 },
];

const superDomActions = ["yellow", "olive", "red", "gray", "green", "green"];

function SuperDomScene() {
  return (
    <div className="superdom-scene">
      <section className="superdom-window">
        <header className="superdom-tabs">
          <span className="superdom-brand" />
          <span className="superdom-tab is-active">
            <i />
            <b />
            <em />
          </span>
          <span className="superdom-tab">
            <i />
            <b />
            <em />
          </span>
          <span className="superdom-add">+</span>
          <span />
        </header>

        <section className="superdom-ladder">
          {superDomRows.map((row, index) => (
            <article
              className={`is-${row.side}`}
              key={index}
              style={{ "--superdom-row-index": index, "--superdom-size": row.size }}
            >
              <span className="superdom-gap" />
              <span className="superdom-zone is-bid">
                <i />
              </span>
              <b className="superdom-price" />
              <span className="superdom-zone is-ask">
                <i />
              </span>
              <span className="superdom-gap" />
            </article>
          ))}
        </section>

        <div className="superdom-summary">
          <span />
          <span />
        </div>

        <div className="superdom-actions">
          {superDomActions.map((tone, index) => (
            <span className={`is-${tone}`} key={index} style={{ "--superdom-action-index": index }} />
          ))}
        </div>

        <footer className="superdom-controls">
          <span className="superdom-control-add">+</span>
          <i />
          <span className="superdom-stepper">
            <b />
          </span>
          <i />
          <span className="superdom-stepper">
            <b />
          </span>
          <span className="superdom-check" />
          <i />
        </footer>
      </section>
    </div>
  );
}

const volumePriceRows = [
  { blue: "light", g: 6, r: 9 },
  { blue: "mid", g: 13, r: 12 },
  { blue: "deep", g: 17, r: 14 },
  { blue: "light", g: 25, r: 24 },
  { blue: "mid", g: 28, r: 26, soft: true },
  { blue: "light", g: 40, r: 60, soft: true },
  { blue: "mid", g: 54, r: 37, soft: true },
  { blue: "deep", g: 32, r: 28, soft: true },
  { blue: "light", g: 52, r: 23 },
  { blue: "mid", g: 21, r: 26, hl: true },
  { blue: "light", g: 10, r: 24 },
  { blue: "mid", g: 8, r: 13 },
  { blue: "deep", g: 6, r: 10 },
  { blue: "light", g: 5, r: 12 },
  { blue: "mid", g: 16, r: 19, soft: true },
  { blue: "light", g: 21, r: 28, soft: true },
  { blue: "deep", g: 52, r: 23, soft: true },
  { blue: "mid", g: 22, r: 26, soft: true },
  { blue: "light", g: 11, r: 28 },
];

function VolumeAtPriceScene() {
  return (
    <div className="volume-price-scene">
      <section className="volume-price-window">
        <header className="volume-price-tabs">
          <span className="volume-price-brand" />
          <span className="volume-price-tab is-active">
            <i />
            <b />
            <em />
          </span>
          <span className="volume-price-tab">
            <i />
            <b />
            <em />
          </span>
          <span className="volume-price-add">+</span>
          <span />
        </header>

        <section className="volume-price-rows">
          {volumePriceRows.map((row, index) => (
            <article
              className={
                [row.hl && "is-highlight", row.soft && "is-soft"].filter(Boolean).join(" ") || undefined
              }
              key={index}
              style={{ "--vp-row-index": index, "--vp-buy": row.g, "--vp-sell": row.r }}
            >
              <span className="volume-price-level">
                <i />
              </span>
              <span className={`volume-price-band is-${row.blue}`}>
                <i />
              </span>
              <span className="volume-price-bars">
                <em className="is-buy" />
                <em className="is-sell" />
              </span>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}

const flowMapRows = [
  ["86%", "red", "0ms"],
  ["78%", "red", "38ms"],
  ["92%", "red", "76ms"],
  ["76%", "red", "114ms"],
  ["88%", "red", "152ms"],
  ["70%", "red", "190ms"],
  ["80%", "blue", "228ms"],
  ["73%", "blue", "266ms"],
  ["86%", "blue", "304ms"],
  ["92%", "blue", "342ms"],
  ["78%", "blue", "380ms"],
  ["86%", "blue", "418ms"],
];

const flowMapBubbles = [
  ["2%", "43%", "42px", "green", "0ms"],
  ["8%", "42%", "72px", "red", "80ms"],
  ["17%", "40%", "34px", "green", "160ms"],
  ["20%", "43%", "34px", "red", "240ms"],
  ["28%", "43%", "112px", "green", "320ms"],
  ["41%", "42%", "36px", "green", "400ms"],
  ["47%", "43%", "36px", "red", "480ms"],
  ["54%", "43%", "42px", "green", "560ms"],
  ["61%", "43%", "76px", "red", "640ms"],
  ["72%", "43%", "118px", "red", "720ms"],
  ["84%", "43%", "40px", "red", "800ms"],
];

const flowMapBottomBars = [
  ["11%", "24%", "72px", "green", "0ms"],
  ["26%", "33%", "42px", "green", "90ms"],
  ["39%", "42%", "28px", "green", "180ms"],
  ["52%", "50%", "28px", "green", "270ms"],
  ["66%", "36%", "38px", "red", "360ms"],
  ["80%", "44%", "30px", "red", "450ms"],
];

const profitNewsRows = [
  { tone: "up" },
  { tone: "down" },
  { tone: "up", highlight: true },
  { tone: "down" },
  { tone: "up", highlight: true },
  { tone: "neutral" },
];

function FlowMapScene() {
  return (
    <div className="flow-map-scene">
      <header className="flow-map-tabs">
        <span className="flow-map-brand" />
        <span className="flow-map-tab is-active">
          <i />
        </span>
        <span className="flow-map-tab">
          <i />
        </span>
        <span />
      </header>

      <section className="flow-map-canvas">
        <div className="flow-map-rows">
          {flowMapRows.map(([width, tone, delay], index) => (
            <span key={index} className={`is-${tone}`} style={{ "--flow-row-width": width, "--flow-delay": delay }} />
          ))}
        </div>

        <div className="flow-map-bubbles">
          {flowMapBubbles.map(([left, top, size, tone, delay], index) => (
            <i key={index} className={`is-${tone}`} style={{ "--flow-left": left, "--flow-top": top, "--flow-size": size, "--flow-delay": delay }} />
          ))}
        </div>

        <div className="flow-map-bottom">
          {flowMapBottomBars.map(([left, height, width, tone, delay], index) => (
            <b key={index} className={`is-${tone}`} style={{ "--flow-left": left, "--flow-height": height, "--flow-width": width, "--flow-delay": delay }} />
          ))}
        </div>
      </section>
    </div>
  );
}

function NewsScene({ video = false }) {
  if (video) {
    return (
      <div className="tool-video-scene bmc-news-scene">
        <div className="bmc-side bmc-side-left">
          <img src={bmcNewsSideRight} alt="" />
        </div>
        <div className="bmc-side bmc-side-right">
          <img src={bmcNewsSideLeft} alt="" />
        </div>

        <div className="bmc-browser-frame" aria-hidden="true">
          <span>TV</span>
          <i />
        </div>

        <div className="bmc-live-badge" aria-hidden="true">
          <i />
          AO VIVO
        </div>

        <div className="bmc-main-video">
          <img src={bmcNewsMain} alt="" />
          <div className="bmc-lower-third">
            <strong>BM&C NEWS</strong>
            <span />
            <em />
          </div>
          <img className="bmc-floating-logo" src={bmcNewsLogo} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="tool-news-scene profit-news-scene">
      <section className="profit-news-window">
        <header className="profit-news-topbar">
          <span className="profit-news-brand">
            <i />
            <i />
            <i />
          </span>
          <b />
        </header>

        <div className="profit-news-body">
          <section className="profit-news-list">
            {profitNewsRows.map((row, index) => (
              <article
                className={`is-${row.tone}${row.highlight ? " is-highlighted" : ""}`}
                key={index}
                style={{ "--news-row-index": index }}
              >
                <span className="profit-news-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="profit-news-trend">
                  <i />
                  <i />
                </span>
                <div className="profit-news-copy">
                  <b />
                  <span />
                  <em />
                </div>
                <div className="profit-news-meta">
                  <span />
                  <span />
                </div>
              </article>
            ))}
          </section>

          <aside className="profit-news-detail">
            <header>
              <b />
              <i />
              <i />
            </header>
            <div className="profit-news-paragraph">
              {Array.from({ length: 7 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="profit-news-paragraph is-second">
              {Array.from({ length: 6 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function AutomationScene({ replay = false }) {
  return (
    <div className={`tool-automation-scene${replay ? " replay" : ""}`}>
      <ChartScene dense />
      <div className="automation-stack">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} style={{ "--stack-index": index }}>
            <i />
            <b />
            <em />
          </span>
        ))}
      </div>
    </div>
  );
}

const parameterOptimizationBars = [
  { left: 13, positive: 52, negative: 15 },
  { left: 31, positive: 28, negative: 15 },
  { left: 49, positive: 16, negative: 38 },
  { left: 67, positive: 16, negative: 15 },
  { left: 85, positive: 12, negative: 24 },
];

function ParameterOptimizationScene() {
  const cards = [
    { tone: "neutral" },
    { tone: "positive" },
    { tone: "negative" },
    { tone: "neutral" },
    { tone: "neutral" },
  ];

  return (
    <div className="parameter-optimization-scene">
      <header className="parameter-optimization-head">
        <span />
        <b />
      </header>

      <section className="parameter-optimization-cards">
        {cards.map((card, index) => (
          <article className={`${index === 0 ? "is-active " : ""}is-${card.tone}`} key={index} style={{ "--param-card-index": index }}>
            <i />
            <em />
          </article>
        ))}
      </section>

      <section className="parameter-optimization-chart">
        <aside className="parameter-optimization-scale">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} />
          ))}
        </aside>

        <div className="parameter-optimization-plot">
          <div className="parameter-optimization-grid" />
          <div className="parameter-optimization-baseline" />
          <div className="parameter-optimization-bars">
            {parameterOptimizationBars.map((bar, index) => (
              <span
                key={index}
                style={{
                  "--param-bar-index": index,
                  "--param-bar-left": `${bar.left}%`,
                  "--param-positive-height": bar.positive,
                  "--param-negative-height": bar.negative,
                }}
              >
                <i />
                <b />
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const replayCandles = [
  { x: 17, top: 63, height: 24 },
  { x: 20, top: 58, height: 34 },
  { x: 23, top: 66, height: 22 },
  { x: 26, top: 61, height: 28 },
  { x: 29, top: 64, height: 20 },
  { x: 32, top: 56, height: 34 },
  { x: 35, top: 52, height: 30 },
  { x: 38, top: 46, height: 36 },
  { x: 41, top: 38, height: 46 },
  { x: 43.5, top: 36, height: 30 },
  { x: 46, top: 31, height: 36 },
  { x: 49, top: 26, height: 46 },
  { x: 52, top: 24, height: 42 },
  { x: 55, top: 22, height: 38 },
  { x: 58, top: 20, height: 46 },
  { x: 61, top: 16, height: 50 },
  { x: 64, top: 18, height: 34 },
];

function ReplayMultiScene() {
  return (
    <div className="replay-multi-scene">
      <div className="replay-grid" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="replay-price-scale" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="replay-candles" aria-hidden="true">
        {replayCandles.map((candle, index) => (
          <span
            key={index}
            style={{
              "--replay-x": `${candle.x}%`,
              "--replay-top": `${candle.top}%`,
              "--replay-height": `${candle.height}%`,
              "--replay-index": index,
            }}
          />
        ))}
      </div>

      <div className="replay-cursor" aria-hidden="true">
        <i />
        <b />
      </div>

      <div className="replay-control-card">
        <header>
          <span>10:00:00</span>
          <span>17:30</span>
        </header>
        <div className="replay-timeline">
          <i />
          <b />
        </div>
        <div className="replay-controls" aria-hidden="true">
          <button className="is-restart has-svg-icon" type="button" aria-label="Voltar para o início">
            <img src={replayBackIcon} alt="" />
          </button>
          <button className="is-back" type="button" aria-label="Retroceder" />
          <button className="is-play" type="button" aria-label="Reproduzir" />
          <button className="is-forward" type="button" aria-label="Avançar" />
          <button className="is-step has-svg-icon" type="button" aria-label="Avançar trade a trade">
            <img src={replayForwardTradeIcon} alt="" />
          </button>
          <button className="is-loop has-svg-icon" type="button" aria-label="Definir horário do replay">
            <img src={replaySetTimeIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StrategyAutomationScene() {
  return (
    <div className="tool-strategy-scene">
      <div className="strategy-window">
        <header className="strategy-titlebar">
          <span className="strategy-brand" />
          <i className="strategy-caret" />
          <b className="strategy-home" />
          <span className="strategy-tab is-active" />
          <span className="strategy-tab" />
          <em />
        </header>

        <section className="strategy-toolbar">
          <button type="button" aria-label="Criar estratégia">
            <span />
          </button>
          <div className="strategy-column-head">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        </section>

        <div className="strategy-list">
          {Array.from({ length: 5 }, (_, index) => (
            <article className={index > 2 ? "is-muted" : undefined} key={index} style={{ "--strategy-row-index": index }}>
              <span className={index < 2 ? "strategy-run is-primary" : index === 4 ? "strategy-run is-alert" : "strategy-run"} />
              <div className="strategy-params">
                <i />
                <b />
                <em />
              </div>
              <span className="strategy-name" />
              <div className={index === 3 ? "strategy-metric is-negative" : "strategy-metric is-positive"}>
                <i />
                <b />
              </div>
              <div className={index === 2 ? "strategy-metric" : index === 3 ? "strategy-metric is-negative" : "strategy-metric is-positive"}>
                <i />
                <b />
              </div>
              <span className={index < 2 ? "strategy-action is-stop" : "strategy-action is-play"} />
              <div className="strategy-tools">
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlarmManagerScene() {
  return (
    <div className="tool-alarm-scene">
      <div className="alarm-table-window">
        <header className="alarm-table-head">
          <span className="alarm-table-icon">
            <i />
            <b />
          </span>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} />
          ))}
        </header>

        <div className="alarm-table-body">
          {Array.from({ length: 10 }, (_, index) => (
            <article key={index} style={{ "--alarm-row-index": index }}>
              <i />
              <span />
              <span />
              <span />
              <span />
              <span />
            </article>
          ))}
        </div>
      </div>

      <section className="alarm-card alarm-card-back">
        <span className="alarm-clock" />
        <i />
        <b />
      </section>

      <section className="alarm-card alarm-card-front">
        <span className="alarm-clock" />
        <i />
        <b />
      </section>
    </div>
  );
}

function CopyInvestScene() {
  return (
    <div className="tool-copy-scene">
      <div className="copy-main-window">
        <header className="copy-topbar">
          <span className="copy-app-icon" />
          <i />
          <i />
          <div className="copy-control-strip">
            <strong />
            <em />
          </div>
        </header>

        <div className="copy-tab-row">
          {Array.from({ length: 10 }, (_, index) => (
            <span key={index}>
              {index % 3 === 0 ? <i /> : null}
              <b />
            </span>
          ))}
        </div>

        <div className="copy-strategy-stack">
          {Array.from({ length: 3 }, (_, index) => (
            <article
              className={index % 2 === 0 ? "is-active" : undefined}
              key={index}
              style={{ "--copy-row-index": index }}
            >
              <span className="copy-favorite" />
              <span className="copy-primary-action" />
              <span className={index > 1 ? "copy-secondary-action is-orange" : "copy-secondary-action"} />
              <span className="copy-avatar" />
              <div className="copy-title-lines">
                <i />
                <b />
              </div>
              <div className="copy-pills">
                <i />
                <i />
              </div>
              <div className="copy-status-group">
                <strong />
                <em />
              </div>
              <div className="copy-status-group muted">
                <strong />
                <em />
              </div>
              <div className="copy-returns">
                <strong />
                <em />
              </div>
              <div className="copy-actions">
                <i />
                <b />
              </div>
            </article>
          ))}
        </div>

        <div className="copy-dashboard">
          <div className="copy-filter-row">
            {Array.from({ length: 6 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="copy-dashboard-grid">
            <aside>
              {Array.from({ length: 7 }, (_, index) => (
                <span key={index} />
              ))}
            </aside>
            <section>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} />
              ))}
            </section>
            <section>
              {Array.from({ length: 4 }, (_, index) => (
                <span key={index} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const copilotCandles = [
  [32, 12, true],
  [58, 20, false],
  [46, 8, true],
  [74, 28, false],
  [54, 20, false],
  [86, 34, true],
  [118, 48, false],
  [72, 40, true],
  [96, 58, false],
  [138, 70, false],
  [84, 62, true],
  [112, 78, false],
  [64, 70, true],
  [92, 84, false],
  [120, 96, false],
  [76, 88, true],
  [104, 102, false],
  [144, 114, false],
  [88, 104, true],
  [126, 116, false],
  [94, 108, true],
  [132, 122, false],
  [108, 118, false],
  [78, 112, true],
  [96, 126, false],
  [124, 136, false],
  [86, 128, true],
  [116, 140, false],
  [150, 150, false],
  [102, 144, true],
  [134, 154, false],
  [112, 148, false],
  [84, 140, true],
  [104, 150, false],
];

function CopilotScene() {
  return (
    <div className="tool-copilot-scene">
      <div className="copilot-chart-grid" />
      <div className="copilot-candles" aria-hidden="true">
        {copilotCandles.map(([height, bottom, down], index) => (
          <span
            className={down ? "is-down" : undefined}
            key={index}
            style={{
              "--candle-left": `${index * 12}px`,
              "--candle-height": `${height}px`,
              "--candle-bottom": `${bottom}px`,
              "--candle-delay": `${index * 12}ms`,
            }}
          />
        ))}
      </div>
      <div className="copilot-price-tags">
        <i />
        <i />
        <strong />
      </div>

      <div className="copilot-suggestion">
        <span className="copilot-avatar">
          <img src={copilotIcon} alt="" />
        </span>
        <i />
        <b />
        <button type="button" aria-label="Recusar sugestão" />
        <button type="button" aria-label="Aceitar sugestão" />
        <em />
      </div>

      <div className="copilot-control-panel">
        <div className="copilot-panel-head">
          <span className="copilot-avatar">
            <img src={copilotIcon} alt="" />
          </span>
          <i />
          <button type="button" aria-label="Fechar" />
        </div>
        <div className="copilot-panel-line long" />
        <div className="copilot-panel-line controls">
          <span />
          <i />
          <b />
          <em />
        </div>
        <div className="copilot-panel-line split">
          <i />
          <b />
        </div>
        <div className="copilot-panel-actions">
          <button type="button" />
          <button type="button" />
        </div>
      </div>
    </div>
  );
}

function ChatScene() {
  const contacts = ["VV", "TF", "SS", "DR", "TE", "JR", "FG"];
  const messages = [
    { side: "incoming", lines: 2 },
    { side: "outgoing", lines: 2 },
    { side: "outgoing", lines: 2 },
    { side: "outgoing", lines: 2 },
    { side: "incoming", lines: 2 },
  ];

  return (
    <div className="tool-chat-scene">
      <aside className="chat-sidebar">
        <header className="chat-sidebar-head">
          <span className="chat-avatar">VV</span>
          <div>
            <i />
            <b />
          </div>
          <em />
          <em />
        </header>

        <div className="chat-search">
          <i />
          <span />
        </div>

        <div className="chat-contact-list">
          {contacts.slice(1).map((contact, index) => (
            <article className={index === 2 ? "is-active" : undefined} key={contact} style={{ "--chat-contact-index": index }}>
              <span className="chat-avatar">{contact}</span>
              <div>
                <i />
                <b />
              </div>
              <em />
            </article>
          ))}
        </div>
      </aside>

      <section className="chat-conversation">
        <header className="chat-conversation-head">
          <span className="chat-avatar">DR</span>
          <i />
          <em />
        </header>

        <div className="chat-pattern" aria-hidden="true">
          {Array.from({ length: 24 }, (_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <article
              className={`chat-bubble is-${message.side}`}
              key={`${message.side}-${index}`}
              style={{ "--chat-message-index": index }}
            >
              {Array.from({ length: message.lines }, (_, lineIndex) => (
                <span key={lineIndex} />
              ))}
            </article>
          ))}
        </div>

        <footer className="chat-compose">
          <i />
          <span />
          <b />
        </footer>
      </section>
    </div>
  );
}

const tickerItems = ["up", "up", "down", "up", "down", "up", "up", "down"];

const tickerCandles = [
  [16, 12, 1],
  [24, 10, 0],
  [18, 14, 1],
  [28, 16, 1],
  [40, 10, 0],
  [32, 12, 1],
  [40, 14, 1],
  [50, 10, 0],
  [42, 12, 0],
  [34, 10, 1],
  [40, 14, 1],
  [50, 12, 0],
  [42, 12, 1],
  [50, 16, 1],
  [62, 10, 0],
  [54, 12, 1],
  [62, 14, 1],
  [72, 10, 0],
  [64, 12, 1],
  [72, 10, 1],
  [78, 8, 0],
  [72, 10, 1],
  [78, 10, 1],
  [72, 12, 0],
];

function TickerScene() {
  return (
    <div className="ticker-scene">
      <header className="ticker-strip-pro">
        {tickerItems.map((tone, index) => (
          <article className={`is-${tone}`} key={index} style={{ "--ticker-item-index": index }}>
            <span className="ticker-item-head">
              <em />
              <i />
              <b />
            </span>
            <span className="ticker-item-quote">
              <i />
              <b />
            </span>
          </article>
        ))}
      </header>

      <section className="ticker-chart-window">
        <header className="ticker-chart-tabs">
          <span className="ticker-chart-brand" />
          <span className="ticker-chart-tab is-active">
            <i />
            <b />
            <em />
          </span>
          <span className="ticker-chart-add">+</span>
          <span />
        </header>

        <div className="ticker-chart-toolbar">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="ticker-chart-canvas">
          {tickerCandles.map(([bottom, height, up], index) => (
            <span
              className={up ? "is-up" : "is-down"}
              key={index}
              style={{ "--candle-bottom": bottom, "--candle-height": height, "--ticker-candle-index": index }}
            />
          ))}
          <i className="ticker-chart-tag" />
        </div>
      </section>
    </div>
  );
}

const timesTradesRows = ["sell", "buy", "buy", "sell", "buy", "sell", "buy", "buy", "sell", "buy", "sell"];

function TimesTradesScene() {
  return (
    <div className="times-trades-scene">
      <header className="times-trades-titlebar">
        <span className="times-trades-brand" />
        <i />
      </header>

      <div className="times-trades-toolbar">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="times-trades-filters">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="times-trades-pressure">
        <span className="is-buy">
          <i />
        </span>
        <span className="is-sell">
          <i />
        </span>
      </div>

      <div className="times-trades-columns">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <section className="times-trades-rows">
        {timesTradesRows.map((tone, index) => (
          <article key={index} style={{ "--tt-row-index": index }}>
            <span className="is-wide" />
            <span />
            <span />
            <span />
            <span />
            <b className={`is-${tone}`}>
              <i />
            </b>
          </article>
        ))}
      </section>
    </div>
  );
}

const marketViewCards = [
  { tone: "up", base: 84, points: "2,44 12,38 20,42 30,30 38,34 48,22 56,28 66,18 76,24 86,14 96,20 108,10 118,16" },
  { tone: "down", base: 16, points: "2,12 10,18 20,14 30,24 40,20 50,30 60,26 70,36 80,32 92,42 102,38 112,48 118,44" },
  { tone: "up", base: 58, points: "2,30 10,38 18,34 26,44 34,40 44,46 52,38 60,20 68,30 78,26 88,34 100,18 118,22" },
  { tone: "down", base: 18, points: "2,14 12,22 22,18 32,28 42,24 52,34 62,30 72,40 82,36 92,44 104,40 118,46" },
  { tone: "up", base: 80, points: "2,42 12,46 22,40 32,44 42,38 52,42 62,34 72,30 82,24 94,18 106,14 118,10" },
  { tone: "down", base: 20, points: "2,12 12,20 22,26 32,22 42,30 52,28 62,36 72,34 82,40 94,38 106,44 118,42" },
  { tone: "down", base: 22, points: "2,18 14,24 26,20 38,30 50,26 62,34 74,32 86,40 98,38 110,44 118,42" },
  { tone: "up", base: 76, points: "2,40 14,34 26,38 38,28 50,32 62,24 74,28 86,18 98,24 110,14 118,18" },
  { tone: "down", base: 18, points: "2,14 14,20 26,16 38,26 50,22 62,32 74,28 86,38 98,34 110,42 118,40" },
];

function MarketViewScene() {
  return (
    <div className="market-view-scene">
      <header className="market-view-titlebar">
        <span className="market-view-brand" />
        <i />
      </header>

      <section className="market-view-grid">
        {marketViewCards.map((card, index) => (
          <article className={`is-${card.tone}`} key={index} style={{ "--mv-card-index": index, "--mv-baseline": card.base }}>
            <header>
              <span />
              <span className="market-view-select">
                <i />
                <em />
              </span>
              <b />
            </header>
            <div className="market-view-chart">
              <svg viewBox="0 0 120 56" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <polygon points={`${card.points} 118,56 2,56`} />
                <polyline points={card.points} pathLength="1" />
              </svg>
              <i />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

const volumeMarketRows = [
  { a: 0, b: 10, c: 8, tone: "buy" },
  { a: 0, b: 14, c: 12, tone: "buy" },
  { a: 0, b: 10, c: 8, tone: "buy" },
  { a: 34, b: 18, c: 14, tone: "buy" },
  { a: 30, b: 26, c: 18, tone: "buy" },
  { a: 22, b: 34, c: 24, tone: "buy" },
  { a: 30, b: 22, c: 12, tone: "sell" },
  { a: 28, b: 30, c: 26, tone: "buy" },
  { a: 26, b: 38, c: 30, tone: "buy" },
  { a: 30, b: 30, c: 22, tone: "sell" },
  { a: 42, b: 34, c: 28, tone: "buy" },
  { a: 26, b: 44, c: 36, tone: "sell", highlight: true },
  { a: 24, b: 30, c: 24, tone: "buy" },
  { a: 18, b: 26, c: 18, tone: "sell" },
];

function VolumeAtMarketScene() {
  return (
    <div className="volume-market-scene">
      <header className="volume-market-titlebar">
        <span className="volume-market-brand" />
        <i />
      </header>

      <div className="volume-market-columns">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <section className="volume-market-rows">
        {volumeMarketRows.map((row, index) => (
          <article
            className={row.highlight ? "is-highlight" : undefined}
            key={index}
            style={{
              "--vm-row-index": index,
              "--vm-bar-a": row.a,
              "--vm-bar-b": row.b,
              "--vm-bar-c": row.c,
            }}
          >
            <span className="volume-market-price" />
            <span className="volume-market-zone is-agg">
              {row.a > 0 && <em />}
              {row.a > 0 && <i />}
            </span>
            <span className={`volume-market-zone is-hist is-${row.tone}`}>
              <em className="is-b" />
              <i />
            </span>
            <span className={`volume-market-zone is-hist is-${row.tone}`}>
              <em className="is-c" />
              <i />
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}

function renderScene(visual) {
  if (visual === "video") return <NewsScene video />;
  if (visual === "calculator") return <CalculatorScene />;
  if (visual === "position") return <PositionScene />;
  if (visual === "performance") return <PerformanceReportScene />;
  if (visual === "plan") return <TradePlanScene />;
  if (visual === "matrix") return <MatrixScene />;
  if (visual === "pressure") return <PressureMetersScene />;
  if (visual === "monitor") return <MarketMonitorScene />;
  if (visual === "marketview") return <MarketViewScene />;
  if (visual === "book") return <BookScene />;
  if (visual === "superdom") return <SuperDomScene />;
  if (visual === "flow") return <FlowMapScene />;
  if (visual === "volume-market") return <VolumeAtMarketScene />;
  if (visual === "volume-price") return <VolumeAtPriceScene />;
  if (visual === "chat") return <ChatScene />;
  if (visual === "news") return <NewsScene />;
  if (visual === "ticker") return <TickerScene />;
  if (visual === "indicators") return <IndicatorsScene />;
  if (visual === "inside") return <InsideTrackScene />;
  if (visual === "line") return <IvRankScene />;
  if (visual === "motion") return <MotionTrackerScene />;
  if (visual === "assistant") return <CopilotScene />;
  if (visual === "copy") return <CopyInvestScene />;
  if (visual === "strategy") return <StrategyAutomationScene />;
  if (visual === "alerts") return <AlarmManagerScene />;
  if (visual === "replay") return <ReplayMultiScene />;
  if (visual === "optimization") return <ParameterOptimizationScene />;
  if (visual === "quotes") return <QuoteGridScene />;
  if (visual === "orders") return <OrdersListScene />;
  if (visual === "times") return <TimesTradesScene />;
  if (visual === "assets") return <TableScene />;

  return <ChartScene dense={visual === "indicators" || visual === "inside" || visual === "line" || visual === "motion"} />;
}

export function ToolMockup({ tool }) {
  return (
    <div className={`tool-mockup tool-mockup-${tool.visual}`}>
      <div className="tool-window">
        <div className="tool-window-bar">
          <span />
          <i />
          <i />
          <i />
        </div>
        {renderScene(tool.visual)}
      </div>
    </div>
  );
}

export function PlanSelector({ selectedPlan, onSelect }) {
  const tabsRef = useRef(null);
  const buttonRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 8, width: 0 });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeTab = buttonRefs.current[selectedPlan];
      const tabs = tabsRef.current;
      if (!activeTab || !tabs) return;

      const tabRect = activeTab.getBoundingClientRect();
      const tabsRect = tabs.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - tabsRect.left,
        width: tabRect.width,
      });
    };

    updateIndicator();
    const onResize = () => window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", onResize);

    let observer;
    if ("ResizeObserver" in window && tabsRef.current) {
      observer = new ResizeObserver(onResize);
      observer.observe(tabsRef.current);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [selectedPlan]);

  return (
    <div className="resource-plan-tabs" ref={tabsRef} aria-label="Filtrar recursos por plano">
      <span
        className={`resource-plan-indicator${selectedPlan === "ultra" ? " is-ultra" : ""}`}
        style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }}
        aria-hidden="true"
      />
      {planOptions.map((plan) => (
        <button
          key={plan.id}
          ref={(node) => {
            buttonRefs.current[plan.id] = node;
          }}
          className={`resource-plan-tab${selectedPlan === plan.id ? " active" : ""}`}
          data-plan={plan.id}
          type="button"
          onClick={() => onSelect(plan.id)}
        >
          {plan.label}
        </button>
      ))}
    </div>
  );
}

export function ToolResourcesShowcase() {
  const [selectedPlan, setSelectedPlan] = useState("ultra");
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedPlanOption = useMemo(() => getPlanOption(selectedPlan), [selectedPlan]);

  const filteredTools = useMemo(() => {
    return toolResources.filter((tool) => tool.plans.includes(selectedPlanOption.fullLabel));
  }, [selectedPlanOption.fullLabel]);

  const activeTool = filteredTools[activeIndex] ?? filteredTools[0] ?? toolResources[0];
  const goTo = (index) => {
    if (!filteredTools.length) return;
    setActiveIndex((index + filteredTools.length) % filteredTools.length);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedPlan]);

  return (
    <section className="tool-resources" id="ferramentas">
      <div className="tool-resources-bg" aria-hidden="true" />

      <div className="tool-resources-heading">
        <p>Recursos do Profit</p>
        <h2>
          Um arsenal completo para cada <span>forma de operar.</span>
        </h2>
        <strong>
          Explore ferramentas de análise, fluxo, automação, gestão e acompanhamento de mercado, com disponibilidade por
          plano.
        </strong>
      </div>

      <div className="resource-plan-filter">
        <PlanSelector selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
      </div>

      <div className="resource-explorer">
        <div className="resource-stage">
          <article
            key={activeTool.id}
            className="resource-spotlight"
            style={{
              "--tool-tone-a": activeTool.theme[0],
              "--tool-tone-b": activeTool.theme[1],
              "--tool-accent": activeTool.theme[2],
            }}
          >
            <div className="resource-visual-panel">
              <ToolMockup tool={activeTool} />
            </div>

            <div className="resource-detail-panel">
              <div className="resource-copy">
                <div className="resource-title-row">
                  <span className="resource-icon">
                    <img src={activeTool.icon} alt="" />
                  </span>
                  <div>
                    <h3>{activeTool.name}</h3>
                    {activeTool.aliases?.length ? <small>Também conhecido como {activeTool.aliases.join(", ")}</small> : null}
                  </div>
                </div>
                <p>{activeTool.description}</p>
              </div>
            </div>
          </article>
        </div>

        <aside className="resource-index-panel">
          <div className="resource-tools-grid" aria-label="Selecionar ferramenta">
            {filteredTools.map((tool, index) => (
              <button
                key={tool.id}
                type="button"
                className={`resource-tool-card${index === activeIndex ? " is-active" : ""}`}
                style={{ "--tool-accent": tool.theme[2] }}
                onClick={() => goTo(index)}
              >
                <span className="resource-tool-card-icon">
                  <img src={tool.icon} alt="" />
                </span>
                <span className="resource-tool-card-copy">
                  <strong>{tool.name}</strong>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
