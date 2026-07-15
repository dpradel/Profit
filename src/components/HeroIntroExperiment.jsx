import { useEffect, useRef } from "react";
import { heroIntro, umbrelPro } from "../data/siteData.jsx";
import { ButtonRow } from "./Button.jsx";
import { HeroTradingInterfaceExperiment } from "./HeroTradingInterfaceExperiment.jsx";

export function HeroIntroExperiment() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => el.classList.add("is-visible"));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero-intro hero-intro-experiment" id="hero-experiment" ref={ref}>
      <div className="hero-blob hero-blob-a" aria-hidden="true" />
      <div className="hero-blob hero-blob-b" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-copy">
            <h1>
              <span>{heroIntro.titleLead}</span>{" "}
              <strong className="profit-wordmark">
                <span className="profit-accent">{heroIntro.titleAccent}</span>
                {heroIntro.titleRest}
              </strong>
            </h1>
            <p>{heroIntro.subtitle}</p>
          </div>

          <ButtonRow actions={umbrelPro.actions} className="hero-actions" />
        </div>

        <div className="hero-platform-visual" aria-hidden="true">
          <HeroTradingInterfaceExperiment />
        </div>
      </div>
    </section>
  );
}
