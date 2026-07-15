export function HeroTradingInterface() {
  return (
    <div className="hero-interface-shell">
      <div className="hero-interface-glow" />
      <div className="hero-interface-waves" />
      <div className="hero-interface-frame">
        <iframe
          src={`${import.meta.env.BASE_URL}profit-glass-chart.html`}
          className="profit-chart-iframe"
          title="Profit Interface"
          scrolling="no"
        />
      </div>
    </div>
  );
}
