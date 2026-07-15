import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AppStoreSection } from "../components/AppStoreSection.jsx";
import { FaqSection } from "../components/FaqSection.jsx";
import { FilesLaunch } from "../components/FilesLaunch.jsx";
import { HeroIntro } from "../components/HeroIntro.jsx";
import { PlatformSection } from "../components/PlatformSection.jsx";
import { ProductHighlightCardsAnimated } from "../components/ProductHighlightCardsAnimated.jsx";
import { SiteFooter } from "../components/SiteFooter.jsx";
import { SiteHeader } from "../components/SiteHeader.jsx";
import { TestimonialsSection } from "../components/TestimonialsSection.jsx";

const ToolResourcesPowerExperiment = lazy(() =>
  import("../components/ToolResourcesPowerExperiment.jsx").then((m) => ({
    default: m.ToolResourcesPowerExperiment,
  }))
);

function ResourceSkeleton() {
  return (
    <div className="resource-skeleton" aria-hidden="true">
      <div className="rsk-inner">
        <div className="rsk-heading">
          <div className="rsk-bar rsk-bar--title" />
          <div className="rsk-bar rsk-bar--subtitle" />
        </div>
        <div className="rsk-tabs">
          {[1, 2, 3, 4].map((i) => <div key={i} className="rsk-tab" />)}
        </div>
        <div className="rsk-mockup" />
      </div>
    </div>
  );
}

function LazyToolResources() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); obs.disconnect(); } },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Suspense fallback={<ResourceSkeleton />}>
        {mounted && <ToolResourcesPowerExperiment />}
        {!mounted && <ResourceSkeleton />}
      </Suspense>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroIntro />
        <ProductHighlightCardsAnimated />
        <FilesLaunch />
        <LazyToolResources />
        <AppStoreSection />
        <PlatformSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
