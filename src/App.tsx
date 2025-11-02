import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { AnimatedBackground } from './components/AnimatedBackground';
import Canvas3DBackground from './components/Canvas3DBackground';
import ParticleEffects from './components/ParticleEffects';
import Home from './pages/Home';

// Lazy load pages for code splitting
const BestWorks = lazy(() => import('./pages/BestWorks'));
const Events = lazy(() => import('./pages/Events'));
const Team = lazy(() => import('./pages/Team'));
const Contact = lazy(() => import('./pages/Contact'));
const Submit = lazy(() => import('./pages/Submit'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
      <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full" />
    </motion.div>
  </div>
);

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 1000 : -1000,
    rotateY: direction > 0 ? 45 : -45,
  }),
  in: {
    opacity: 1,
    x: 0,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 1000 : -1000,
    rotateY: direction < 0 ? 45 : -45,
  }),
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const,
  duration: 0.6,
};

function AppRoutes() {
  const location = useLocation();
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setDirection(1);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={location.pathname}
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="exit"
        transition={pageTransition}
        style={{ perspective: '1000px' }}
      >
        <main className="pt-16 min-h-[calc(100vh-4rem)]">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/works" element={<BestWorks />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/submit" element={<Submit />} />
            </Routes>
          </Suspense>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Canvas3DBackground />
        <ParticleEffects density={40} interactive />
        <ParticleBackground />
        <AnimatedBackground />
        <div className="min-h-screen bg-light dark:bg-dark smooth-transition relative">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
