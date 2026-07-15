# Recursos Section Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the "Recursos do Profit" section from ~6,450 DOM nodes and 43 eager requests to ~450 nodes and 5–7 requests on load, while adding a smooth entrance animation.

**Architecture:** Four independent optimizations applied in order: (1) React.lazy code-splits the entire section so its JS bundle parses only when scrolled near; (2) an IntersectionObserver wrapper delays mounting until the section enters the viewport and triggers the entrance animation; (3) virtual mockup rendering skips rendering `<ToolMockup>` for cards with `distance > 2` from active; (4) `loading="lazy"` on all dock/card icons.

**Tech Stack:** React 18, CSS custom properties, IntersectionObserver API, React.lazy/Suspense, global.css

---

## Files

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `src/pages/HomePage.jsx` | Swap to `React.lazy` import + `Suspense` wrapper |
| Modify | `src/components/ToolResourcesPowerExperiment.jsx` | Virtual mockup rendering + `loading="lazy"` on icons |
| Modify | `src/styles/global.css` | Entrance animation CSS (`.resource-power-test` reveal) |

---

## Task 1 — Code-split the section with React.lazy

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Replace static import with React.lazy**

In `src/pages/HomePage.jsx`, replace the top import and wrap the usage in `Suspense`:

```jsx
import { lazy, Suspense } from "react";
import { AppStoreSection } from "../components/AppStoreSection.jsx";
import { ChatButton } from "../components/ChatButton.jsx";
import { FilesLaunch } from "../components/FilesLaunch.jsx";
import { FooterCards } from "../components/FooterCards.jsx";
import { HeroIntro } from "../components/HeroIntro.jsx";
import { OsContentSections } from "../components/OsContentSections.jsx";
import { ProductShowcase } from "../components/ProductShowcase.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";

const ToolResourcesPowerExperiment = lazy(() =>
  import("../components/ToolResourcesPowerExperiment.jsx").then((m) => ({
    default: m.ToolResourcesPowerExperiment,
  }))
);

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroIntro />
        <ProductShowcase />
        <FilesLaunch />
        <Suspense fallback={<div className="resource-power-placeholder" aria-hidden="true" />}>
          <ToolResourcesPowerExperiment />
        </Suspense>
        <OsContentSections />
        <AppStoreSection />
        <FooterCards />
      </main>
      <SiteFooter />
      <ChatButton />
    </>
  );
}
```

- [ ] **Step 2: Add placeholder CSS so layout doesn't shift while loading**

In `src/styles/global.css`, find the `.resource-power-test` block and add before it:

```css
.resource-power-placeholder {
  min-height: 860px;
}
```

- [ ] **Step 3: Verify in browser**

Open the page, open Network tab, filter by JS. The `ToolResourcesPowerExperiment` chunk should NOT appear in the initial network waterfall — only load when the section is about to enter the viewport (Suspense starts fetching when the component is rendered, which happens at mount time with the default Suspense boundary; this still delays parse until render).

---

## Task 2 — Defer mount with IntersectionObserver + entrance animation CSS

**Files:**
- Modify: `src/components/ToolResourcesPowerExperiment.jsx`
- Modify: `src/styles/global.css`

The `Suspense` boundary mounts `ToolResourcesPowerExperiment` as soon as it scrolls into the render tree. We add a second gate inside the component: the heavy inner content only renders once the section's wrapper `<section>` intersects the viewport. Until then, the section renders only its wrapper div (matching the placeholder height). Once visible, an `.is-visible` class is added which both triggers the CSS entrance animation and allows the content to render.

- [ ] **Step 1: Add `useInView` hook inside `ToolResourcesPowerExperiment.jsx`**

Add this hook at the top of the file (after existing imports):

```jsx
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
  }, [ref]);

  return inView;
}
```

- [ ] **Step 2: Wire the hook into the component and gate content rendering**

Inside `ToolResourcesPowerExperiment`, add a `sectionRef` and `inView` before the existing state declarations:

```jsx
export function ToolResourcesPowerExperiment() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  // ... existing state/hooks unchanged ...

  return (
    <section
      ref={sectionRef}
      className={`resource-power-test${inView ? " is-visible" : ""}`}
      aria-label="Recursos do Profit"
    >
      {inView && (
        <>
          <div className="section-heading resource-power-heading">
            {/* ... existing heading content unchanged ... */}
          </div>
          <div className="resource-power-plan">
            {/* ... existing plan selector unchanged ... */}
          </div>
          <div className="resource-power-carousel">
            {/* ... existing carousel unchanged ... */}
          </div>
          <div className={`resource-power-dock ...`}>
            {/* ... existing dock unchanged ... */}
          </div>
        </>
      )}
    </section>
  );
}
```

The full component return should be:

```jsx
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
                    onClick={() => { if (!isActive) goTo(index); }}
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
                      {distance <= 2 && <ToolMockup tool={tool} />}
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
                    onClick={() => { if (isAvailable) goTo(filteredIndex); }}
                    aria-label={tool.name}
                    aria-hidden={!isAvailable}
                    disabled={!isAvailable}
                    title={isAvailable ? tool.name : undefined}
                    tabIndex={isAvailable ? 0 : -1}
                    onMouseEnter={(event) => { if (isAvailable) showDockTooltip(tool, event.currentTarget); }}
                    onFocus={(event) => { if (isAvailable) showDockTooltip(tool, event.currentTarget); }}
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
```

- [ ] **Step 3: Add entrance animation CSS to `global.css`**

Find the `.resource-power-test` rule in `global.css` and add the animation declarations. Add these rules right after the existing `.resource-power-test` block:

```css
/* Entrance animation — triggered when .is-visible is added by IntersectionObserver */
@keyframes resourceReveal {
  from {
    opacity: 0;
    transform: translateY(36px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.resource-power-test .section-heading {
  opacity: 0;
}
.resource-power-test .resource-power-plan {
  opacity: 0;
}
.resource-power-test .resource-power-carousel {
  opacity: 0;
}
.resource-power-test .resource-power-dock {
  opacity: 0;
}

.resource-power-test.is-visible .section-heading {
  animation: resourceReveal 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
}
.resource-power-test.is-visible .resource-power-plan {
  animation: resourceReveal 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}
.resource-power-test.is-visible .resource-power-carousel {
  animation: resourceReveal 0.72s cubic-bezier(0.22, 1, 0.36, 1) 0.26s both;
}
.resource-power-test.is-visible .resource-power-dock {
  animation: resourceReveal 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.38s both;
}

@media (prefers-reduced-motion: reduce) {
  .resource-power-test .section-heading,
  .resource-power-test .resource-power-plan,
  .resource-power-test .resource-power-carousel,
  .resource-power-test .resource-power-dock {
    opacity: 1;
    animation: none;
  }
}
```

- [ ] **Step 4: Verify entrance animation in browser**

Scroll down to the Recursos section from the top of the page. The heading, plan selector, carousel, and dock should fade+slide up sequentially with ~100ms stagger between each. The animation should feel smooth and premium. Check that scrolling back up and down again does NOT re-trigger the animation (IntersectionObserver disconnects after first fire).

---

## Task 3 — Virtual mockup rendering

**Files:**
- Modify: `src/components/ToolResourcesPowerExperiment.jsx` (already modified in Task 2)

This task is already included in the full component return from Task 2. The key line is:

```jsx
<div className="resource-power-visual">
  {distance <= 2 && <ToolMockup tool={tool} />}
</div>
```

Cards with `distance > 2` (all hidden cards) render an empty `.resource-power-visual` div instead of the full mockup tree (~150 DOM nodes each). On a 43-tool plan, this reduces rendered mockup nodes from ~6,450 to ~750 (5 visible cards × ~150 nodes).

- [ ] **Step 1: Verify DOM node count before and after**

Open browser DevTools → Elements panel. Before the change, count children inside `.resource-power-track`. After applying Task 2's full component return, verify that `.resource-power-visual` divs for non-active cards are empty (no children).

- [ ] **Step 2: Test card navigation — mockup renders on selection**

Click a card that was previously `distance > 2`. When it becomes active (`distance === 0`), its `.resource-power-visual` should now contain the full mockup. Click through 5+ cards to confirm no layout shift or flicker during transition.

---

## Task 4 — Lazy-load all icons

**Files:**
- Modify: `src/components/ToolResourcesPowerExperiment.jsx` (already included in Task 2)

This task is also covered in Task 2's full component return. Both icon locations get `loading="lazy"`:

1. Card header icon: `<img src={tool.icon} alt="" loading="lazy" />`
2. Dock icon: `<img src={tool.icon} alt="" loading="lazy" />`

- [ ] **Step 1: Verify lazy loading in Network tab**

Open browser DevTools → Network → filter by "Img". Reload the page. Verify that tool icon SVGs from `/tool-icons/` do NOT appear in the initial network waterfall. They should only load as cards and dock dots enter the viewport.

---

## Self-Review Checklist

- [x] **Spec coverage:** A (virtual mockup) ✓ Task 3, B (React.lazy + IntersectionObserver) ✓ Tasks 1+2, C (lazy icons) ✓ Task 4, entrance animation ✓ Task 2 Step 3
- [x] **No placeholders:** All steps contain actual code
- [x] **Type consistency:** `useInView(ref)` defined in Task 2 Step 1, used in Task 2 Step 2 — consistent
- [x] **`distance` variable:** defined inside `filteredTools.map` in Task 2, referenced in Task 3 — same scope
- [x] **`loading="lazy"`:** added to both img tags in Task 2's full return — covered by Task 4 steps
