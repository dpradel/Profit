import { testimonialsData } from "../data/marketingData.jsx";

export function TestimonialsSection() {
  const { stats, items } = testimonialsData;
  const doubled = [...items, ...items];

  return (
    <section className="tst-section">
      <div className="tst-bg-glow" aria-hidden="true" />

      <div className="tst-head">
        <span className="tst-eyebrow">Depoimentos</span>
        <h2 className="tst-h2">
          Mais de 2 milhões de clientes
          <br />
          ao redor do mundo
        </h2>
      </div>

      <div className="tst-stats">
        {stats.map((s) => (
          <div key={s.label} className="tst-stat">
            <span className="tst-stat-val">{s.value}</span>
            <span className="tst-stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="tst-marquee-wrap">
        {/* Row 1 — scrolls left */}
        <div className="tst-row tst-row--a" aria-hidden="true">
          {doubled.map((item, i) => (
            <TstCard key={i} {...item} />
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="tst-row tst-row--b" aria-hidden="true">
          {doubled.slice().reverse().map((item, i) => (
            <TstCard key={i} {...item} />
          ))}
        </div>

        {/* Screen-reader-accessible version */}
        <ul className="tst-sr-only">
          {items.map((item) => (
            <li key={item.name}>
              <blockquote>
                <p>{item.quote}</p>
                <footer>
                  {item.name}, {item.role} — {item.location}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TstCard({ quote, name, role, location }) {
  return (
    <div className="tst-card">
      <div className="tst-stars" aria-label="5 estrelas">
        {"★★★★★"}
      </div>
      <p className="tst-quote">"{quote}"</p>
      <div className="tst-author">
        <span className="tst-name">{name}</span>
        <span className="tst-meta">
          {role} · {location}
        </span>
      </div>
    </div>
  );
}
