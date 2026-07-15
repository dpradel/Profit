import { useEffect, useMemo, useState } from "react";
import { superpowerCards } from "../data/siteData.jsx";

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

function useViewportWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

function getCardGap(width) {
  if (width <= 560) return Math.min(270, width * 0.72);
  if (width <= 900) return Math.min(330, width * 0.64);
  return Math.min(430, width * 0.32);
}

function getSignedDistance(index, active, total) {
  let distance = index - active;
  const half = total / 2;

  if (distance > half) distance -= total;
  if (distance < -half) distance += total;

  return distance;
}

function getCardStyle(index, active, total, gap) {
  const distance = getSignedDistance(index, active, total);
  const direction = Math.sign(distance);
  const abs = Math.abs(distance);
  const clamped = Math.min(abs, 3);
  const rotate = abs === 0 ? 0 : direction * -24 - direction * Math.max(0, abs - 1) * 9;

  return {
    "--x": `${distance * gap}px`,
    "--z": `${abs === 0 ? 86 : -90 * clamped}px`,
    "--rot": `${rotate}deg`,
    "--scale": Math.max(0.72, 1 - abs * 0.1).toFixed(3),
    "--opacity": (abs > 2 ? 0.08 : Math.max(0.28, 1 - abs * 0.28)).toFixed(3),
    "--blur": `${abs > 2 ? 1.4 : 0}px`,
    zIndex: 20 - abs,
  };
}

export function SuperpowersCarousel() {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const width = useViewportWidth();
  const gap = useMemo(() => getCardGap(width), [width]);

  const goTo = (nextIndex) => {
    setActive((nextIndex + superpowerCards.length) % superpowerCards.length);
  };

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timerId = window.setInterval(() => {
      setActive((current) => (current + 1) % superpowerCards.length);
    }, 4200);

    return () => window.clearInterval(timerId);
  }, [paused, reducedMotion]);

  return (
    <section className="superpowers">
      <div className="section-heading">
        <p>What can I do with Profit?</p>
        <h2>
          The superpowers are <span>endlessssssssss</span>
        </h2>
      </div>

      <div
        className="power-carousel"
        aria-label="Profit use cases"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <button className="carousel-arrow carousel-prev" type="button" onClick={() => goTo(active - 1)} aria-label="Previous superpower">
          <span aria-hidden="true">‹</span>
        </button>

        <div className="power-track">
          {superpowerCards.map((card, index) => {
            const distance = Math.abs(getSignedDistance(index, active, superpowerCards.length));

            return (
              <article
                className={`power-card ${card.theme}`}
                key={card.title}
                style={getCardStyle(index, active, superpowerCards.length, gap)}
                aria-hidden={distance > 2}
              >
                <img className="power-icon" src={card.icon} alt="" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <img className="power-shot" src={card.image} alt="" />
              </article>
            );
          })}
        </div>

        <button className="carousel-arrow carousel-next" type="button" onClick={() => goTo(active + 1)} aria-label="Next superpower">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
