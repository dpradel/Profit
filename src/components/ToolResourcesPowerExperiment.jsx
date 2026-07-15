import { useEffect, useMemo, useRef, useState } from "react";
import { planOptions, toolResources } from "../data/toolResourcesData.jsx";
import { PlanSelector, ToolMockup } from "./ToolResourcesShowcase.jsx";

const foregroundAnimationToolIds = new Set([
  "bm-c-news",
  "calculadora-ir",
  "connect-chat",
  "copy-invest",
  "copilot",
  "estrategias-automatizadas",
  "gerenciador-alarmes",
  "gerenciador-ativos",
  "grade-cotacoes",
  "indicadores",
  "inside-track",
  "iv-rank",
  "livro-ofertas",
  "lista-ordens",
  "mapa-fluxo",
  "matriz-correlacao",
  "medidores-pressao",
  "monitor-mercado",
  "motion-tracker",
  "noticias",
  "otimizacao-estrategias",
  "plano-trade",
  "relatorio-performance",
  "posicao",
  "replay-multi",
  "superdom",
  "ticker-cotacoes",
  "times-trades",
  "visao-mercado",
  "volume-at-market",
  "volume-at-price",
]);

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
  if (width <= 560) return Math.min(230, width * 0.62);
  if (width <= 900) return Math.min(334, width * 0.56);
  return Math.min(444, width * 0.27);
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
  const rotate = abs === 0 ? 0 : direction * -16 - direction * Math.max(0, abs - 1) * 5;

  return {
    "--x": `${distance * gap}px`,
    "--z": `${abs === 0 ? 0 : -96 * clamped}px`,
    "--rot": `${rotate}deg`,
    "--scale": Math.max(0.78, 1 - abs * 0.065).toFixed(3),
    "--opacity": "1",
    "--blur": "0px",
    zIndex: 30 - abs,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutSine(value) {
  return -(Math.cos(Math.PI * value) - 1) / 2;
}

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.05, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return inView;
}

export function ToolResourcesPowerExperiment() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [selectedPlan, setSelectedPlan] = useState("ultra");
  const [activeIndex, setActiveIndex] = useState(0);
  const [dockEdges, setDockEdges] = useState({ left: false, right: false, overflow: false });
  const [dockTooltip, setDockTooltip] = useState(null);
  const reducedMotion = usePrefersReducedMotion();
  const width = useViewportWidth();
  const dockRef = useRef(null);
  const dotRefs = useRef({});
  const dockScrollAnimationRef = useRef(null);
  const dockEdgeUpdateTimerRef = useRef(null);
  const gap = useMemo(() => getCardGap(width), [width]);
  const selectedPlanOption = useMemo(() => getPlanOption(selectedPlan), [selectedPlan]);

  const filteredTools = useMemo(() => {
    return toolResources.filter((tool) => tool.plans.includes(selectedPlanOption.fullLabel));
  }, [selectedPlanOption.fullLabel]);

  const filteredToolIndexById = useMemo(() => {
    return new Map(filteredTools.map((tool, index) => [tool.id, index]));
  }, [filteredTools]);

  const dockTargetWidth = useMemo(() => {
    return Math.min(1320, filteredTools.length * 55 + 26);
  }, [filteredTools.length]);

  const goTo = (index) => {
    if (!filteredTools.length) return;
    setActiveIndex((index + filteredTools.length) % filteredTools.length);
  };

  const updateDockEdges = () => {
    const dock = dockRef.current;
    if (!dock) return;

    const maxScroll = dock.scrollWidth - dock.clientWidth;
    setDockEdges({
      left: dock.scrollLeft > 2,
      right: dock.scrollLeft < maxScroll - 2,
      overflow: maxScroll > 2,
    });
  };

  const scheduleDockEdgesUpdate = (delay = 120) => {
    if (dockEdgeUpdateTimerRef.current) {
      window.clearTimeout(dockEdgeUpdateTimerRef.current);
    }

    dockEdgeUpdateTimerRef.current = window.setTimeout(() => {
      dockEdgeUpdateTimerRef.current = null;
      updateDockEdges();
    }, delay);
  };

  const stopDockScrollAnimation = () => {
    if (!dockScrollAnimationRef.current) return;
    window.cancelAnimationFrame(dockScrollAnimationRef.current);
    dockScrollAnimationRef.current = null;
  };

  const animateDockScroll = (targetLeft, behavior = "smooth") => {
    const dock = dockRef.current;
    if (!dock) return;

    stopDockScrollAnimation();

    if (behavior === "auto" || reducedMotion) {
      dock.scrollLeft = targetLeft;
      updateDockEdges();
      return;
    }

    const startLeft = dock.scrollLeft;
    const distance = targetLeft - startLeft;
    const duration = clamp(Math.abs(distance) * 5.2, 420, 1180);
    const startedAt = window.performance.now();

    const step = (timestamp) => {
      const progress = clamp((timestamp - startedAt) / duration, 0, 1);
      dock.scrollLeft = startLeft + distance * easeInOutSine(progress);

      if (progress < 1) {
        dockScrollAnimationRef.current = window.requestAnimationFrame(step);
      } else {
        dockScrollAnimationRef.current = null;
        updateDockEdges();
      }
    };

    updateDockEdges();
    dockScrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  const scrollDockToIndex = (index, behavior = "smooth") => {
    const dock = dockRef.current;
    const activeTool = filteredTools[index];
    const activeDot = activeTool ? dotRefs.current[activeTool.id] : null;

    if (!dock || !activeDot) return;

    const maxScroll = dock.scrollWidth - dock.clientWidth;
    if (maxScroll <= 2) {
      animateDockScroll(0, "auto");
      return;
    }

    const targetLeft = clamp(activeDot.offsetLeft - (dock.clientWidth - activeDot.offsetWidth) / 2, 0, maxScroll);
    animateDockScroll(targetLeft, behavior);
  };

  const showDockTooltip = (tool, node) => {
    const dock = dockRef.current;
    if (!dock || !node) return;

    const nodeRect = node.getBoundingClientRect();
    const dockRect = dock.getBoundingClientRect();
    setDockTooltip({
      name: tool.name,
      left: nodeRect.left + nodeRect.width / 2 - dockRect.left,
    });
  };

  const handleDockWheel = (event) => {
    const dock = dockRef.current;
    if (!dock || dock.scrollWidth <= dock.clientWidth) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    event.preventDefault();
    stopDockScrollAnimation();
    setDockTooltip(null);
    dock.scrollLeft += event.deltaY * 0.62;
    scheduleDockEdgesUpdate(90);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedPlan]);

  useEffect(() => {
    setDockTooltip(null);
    const edgeUpdateTimers = [140, 520, 860, 1180].map((delay) => window.setTimeout(updateDockEdges, delay));
    return () => edgeUpdateTimers.forEach((timerId) => window.clearTimeout(timerId));
  }, [selectedPlanOption.fullLabel, inView]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return undefined;

    const onScroll = () => {
      if (dockScrollAnimationRef.current) return;
      scheduleDockEdgesUpdate(90);
    };
    const onResize = () => updateDockEdges();

    updateDockEdges();
    dock.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      dock.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [filteredTools.length, inView]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      scrollDockToIndex(activeIndex, reducedMotion ? "auto" : "smooth");
    });

    return () => cancelAnimationFrame(frameId);
  }, [activeIndex, filteredTools.length, reducedMotion, inView]);

  useEffect(() => {
    return () => {
      stopDockScrollAnimation();
      if (dockEdgeUpdateTimerRef.current) {
        window.clearTimeout(dockEdgeUpdateTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`resource-power-test${inView ? " is-visible" : ""}`}
      aria-label="Teste de layout para recursos"
    >
      {inView && (
        <>
          <div className="section-heading resource-power-heading">
            <p>Recursos do Profit</p>
            <h2>
              Um arsenal completo para cada <span>forma de operar.</span>
            </h2>
            <strong>
              Explore ferramentas de análise, fluxo, automação, gestão e acompanhamento de mercado, com disponibilidade por
              plano.
            </strong>
          </div>

          <div className="resource-power-plan">
            <PlanSelector selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
          </div>

          <div className="resource-power-carousel">
            <div className="resource-power-track">
              {filteredTools.map((tool, index) => {
                const signedDistance = getSignedDistance(index, activeIndex, filteredTools.length);
                const distance = Math.abs(signedDistance);
                const isActive = distance === 0;
                const isUltraOnly = tool.plans.length === 1 && tool.plans[0] === "Profit Ultra";
                const hasForegroundAnimation = foregroundAnimationToolIds.has(tool.id);

                return (
                  <article
                    className={`resource-power-card${isActive ? " is-active" : ""}${
                      distance > 0 && distance <= 2 ? " is-side" : ""
                    }${signedDistance < 0 ? " is-prev" : ""}${signedDistance > 0 ? " is-next" : ""}${
                      hasForegroundAnimation ? " has-foreground-animation" : ""
                    }`}
                    key={tool.id}
                    style={{
                      "--tool-tone-a": tool.theme[0],
                      "--tool-tone-b": tool.theme[1],
                      "--tool-accent": tool.theme[2],
                      ...getCardStyle(index, activeIndex, filteredTools.length, gap),
                    }}
                    aria-hidden={distance > 2}
                    aria-label={`Abrir ${tool.name}`}
                    data-card-position={signedDistance < 0 ? "prev" : signedDistance > 0 ? "next" : "active"}
                    onClick={() => {
                      if (!isActive) goTo(index);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        goTo(index);
                      }
                    }}
                    role="button"
                    tabIndex={distance <= 2 ? 0 : -1}
                  >
                    <div className="resource-power-card-header">
                      <div className="resource-power-title-lockup">
                        <span className="resource-power-icon">
                          <img src={tool.icon} alt="" loading="lazy" />
                        </span>
                        <h3>{tool.name}</h3>
                      </div>
                      {isUltraOnly && <span className="resource-power-premium">EXCLUSIVO ULTRA</span>}
                    </div>
                    <p>{tool.description}</p>
                    <div className="resource-power-visual">
                      <ToolMockup tool={tool} />
                    </div>
                  </article>
                );
              })}
            </div>
            {filteredTools.length > 1 && (
              <>
                <button
                  className="resource-power-card-hit resource-power-card-hit-prev"
                  type="button"
                  aria-label="Recurso anterior"
                  onClick={() => goTo(activeIndex - 1)}
                />
                <button
                  className="resource-power-card-hit resource-power-card-hit-next"
                  type="button"
                  aria-label="Próximo recurso"
                  onClick={() => goTo(activeIndex + 1)}
                />
              </>
            )}
          </div>

          <div
            className={`resource-power-dock${dockEdges.overflow ? " is-overflowing" : ""}${dockEdges.left ? " has-left" : ""}${
              dockEdges.right ? " has-right" : ""
            }`}
            style={{ "--dock-target-width": `${dockTargetWidth}px` }}
          >
            <div ref={dockRef} className="resource-power-map" aria-label="Todos os recursos filtrados" onWheel={handleDockWheel}>
              {toolResources.map((tool) => {
                const filteredIndex = filteredToolIndexById.get(tool.id);
                const isAvailable = filteredIndex !== undefined;
                const isActive = isAvailable && filteredIndex === activeIndex;

                return (
                  <button
                    key={tool.id}
                    ref={(node) => {
                      if (node) dotRefs.current[tool.id] = node;
                      else delete dotRefs.current[tool.id];
                    }}
                    type="button"
                    className={`resource-power-dot${isActive ? " is-active" : ""}${isAvailable ? " is-available" : " is-unavailable"}`}
                    style={{ "--tool-accent": tool.theme[2] }}
                    onClick={() => {
                      if (isAvailable) goTo(filteredIndex);
                    }}
                    aria-label={tool.name}
                    aria-hidden={!isAvailable}
                    disabled={!isAvailable}
                    title={isAvailable ? tool.name : undefined}
                    tabIndex={isAvailable ? 0 : -1}
                    onMouseEnter={(event) => {
                      if (isAvailable) showDockTooltip(tool, event.currentTarget);
                    }}
                    onFocus={(event) => {
                      if (isAvailable) showDockTooltip(tool, event.currentTarget);
                    }}
                    onMouseLeave={() => setDockTooltip(null)}
                    onBlur={() => setDockTooltip(null)}
                  >
                    <img src={tool.icon} alt="" loading="lazy" />
                  </button>
                );
              })}
            </div>
            {dockTooltip && (
              <span className="resource-power-dock-tooltip" style={{ "--tooltip-left": `${dockTooltip.left}px` }}>
                {dockTooltip.name}
              </span>
            )}
          </div>
        </>
      )}
    </section>
  );
}
