import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { AnimatedBackground } from './components/AnimatedBackground';
import Home from './pages/Home';
import BestWorks from './pages/BestWorks';
import Events from './pages/Events';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Submit from './pages/Submit';

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
  const [direction, setDirection] = React.useState(0);

  React.useEffect(() => {
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
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<BestWorks />} />
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submit" element={<Submit />} />
          </Routes>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}

import React from 'react';

function App() {
  return (
    <ThemeProvider>
      <Router>
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
