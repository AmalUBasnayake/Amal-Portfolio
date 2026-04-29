import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import "./index.css";

// Pages & Components
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Portfolio from "./Pages/Portfolio";
import Skills from "./components/Skills";
import Services from "./Pages/Services";
import ContactPage from "./Pages/Contact";
import ThankYouPage from "./Pages/ThankYouPage";
import ProjectDetails from "./components/ProjectDetail";
import NotFoundPage from "./Pages/404";
import HireMe from "./components/HireMe";
import LoadingScreen from "./components/LoadingScreen";

import { AnimatePresence, motion } from "framer-motion";

const SIEMLogs = lazy(() => import("./components/SIEMLogs"));
const CyberDashboard = lazy(() => import("./components/CyberDashboard"));
const AttackTimeline = lazy(() => import("./components/AttackTimeline"));
const CommandCenter = lazy(() => import("./components/CommandCenter"));
const ZeroTrustToggle = lazy(() => import("./components/ZeroTrustToggle"));
const AttackMap = lazy(() => import("./components/AttackMap"));
const CyberAI = lazy(() => import("./components/CyberAI"));

const LandingPage = ({ showWelcome, setShowWelcome, labMode, setLabMode }) => {
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showWelcome, setShowWelcome]);

  if (showWelcome) {
    return (
      <AnimatePresence>
        <LoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />

      {labMode && (
        <Suspense fallback={null}>
          <div className="hidden lg:block fixed inset-0 z-40 pointer-events-none">
            <div className="pointer-events-auto"><SIEMLogs /></div>
            <div className="pointer-events-auto"><CyberDashboard /></div>
            <div className="pointer-events-auto"><AttackTimeline /></div>
            <div className="pointer-events-auto"><CommandCenter /></div>
            <div className="pointer-events-auto"><ZeroTrustToggle /></div>
            <div className="pointer-events-auto"><AttackMap /></div>
            <div className="pointer-events-auto"><CyberAI /></div>
          </div>
        </Suspense>
      )}

      <Home labMode={labMode} setLabMode={setLabMode} />
      <About />
      <Skills />
      <Portfolio />
      <HireMe />
      <Services />
      <ContactPage />

      <footer className="text-center py-6 text-gray-500 text-sm border-t border-white/5">
        © 2026{" "}
        <span className="text-emerald-500 font-bold">Amal Cyber Lab™</span>. All
        Rights Reserved.
      </footer>
    </motion.div>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [labMode, setLabMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              showWelcome={showWelcome}
              setShowWelcome={setShowWelcome}
              labMode={labMode}
              setLabMode={setLabMode}
            />
          }
        />

        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {showScrollTop && !showWelcome && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-6 z-50 h-12 w-12 rounded-full bg-emerald-500 text-black font-bold shadow-lg hover:scale-110 transition flex items-center justify-center"
        >
          ↑
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;