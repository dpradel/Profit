import { useState, useEffect, lazy, Suspense } from "react";
import { HomePage } from "./pages/HomePage.jsx";
import { UmbrelHomePage } from "./pages/UmbrelHomePage.jsx";
import { UmbrelProPage } from "./pages/UmbrelProPage.jsx";
import { ProfitWebPage } from "./pages/ProfitWebPage.jsx";
import { ProfitWebScrollTestPage } from "./pages/ProfitWebScrollTest.jsx";
import { ProfitUltraPage } from "./pages/ProfitUltraPage.jsx";

const PlanosPage = lazy(() => import("./pages/PlanosPage.jsx").then((m) => ({ default: m.PlanosPage })));
const RecursosPage = lazy(() => import("./pages/RecursosPage.jsx").then((m) => ({ default: m.RecursosPage })));
const CorretorasPage = lazy(() => import("./pages/CorretorasPage.jsx").then((m) => ({ default: m.CorretorasPage })));
const BaixarPage = lazy(() => import("./pages/BaixarPage.jsx").then((m) => ({ default: m.BaixarPage })));
const QuemSomosPage = lazy(() => import("./pages/QuemSomosPage.jsx").then((m) => ({ default: m.QuemSomosPage })));
const ContatoPage = lazy(() => import("./pages/ContatoPage.jsx").then((m) => ({ default: m.ContatoPage })));

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const path = hash.replace(/^#/, "").replace(/\/$/, "") || "/";

  const lazyRoutes = {
    "/planos": PlanosPage,
    "/recursos": RecursosPage,
    "/corretoras": CorretorasPage,
    "/baixar": BaixarPage,
    "/quem-somos": QuemSomosPage,
    "/contato": ContatoPage,
  };

  const LazyPage = lazyRoutes[path];
  if (LazyPage) {
    return (
      <Suspense fallback={null}>
        <LazyPage />
      </Suspense>
    );
  }

  if (path === "/profit-web") {
    return <ProfitWebPage />;
  }

  const testMatch = path.match(/^\/pw-test-([1-5])$/);
  if (testMatch) {
    return <ProfitWebScrollTestPage variant={Number(testMatch[1])} />;
  }

  if (path === "/profit-ultra") {
    return <ProfitUltraPage />;
  }

  if (path === "/umbrel-pro") {
    return <UmbrelProPage />;
  }

  if (path === "/umbrel-home") {
    return <UmbrelHomePage />;
  }

  return <HomePage />;
}
