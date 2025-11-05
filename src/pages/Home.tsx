import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Where Words Come Alive';
  const [featherX, setFeatherX] = useState(0);

  // Typing animation effect with feather position tracking
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setFeatherX(currentIndex * 30);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Ink particle animation following feather path
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    interface InkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }

    const particles: InkParticle[] = [];

    const addInkParticles = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 0.8 + 0.2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          maxLife: Math.random() * 0.7 + 0.4,
          size: Math.random() * 1 + 0.5,
        });
      }
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Add particles near feather position as it writes
      const featherScreenX = (canvas.width / 2 - 100) + featherX;
      const featherScreenY = canvas.height / 2.8;

      if (Math.random() > 0.75) {
        addInkParticles(featherScreenX, featherScreenY, 1);
      }

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.016;
        p.vy += 0.03;

        const opacity = (p.life / p.maxLife) * 0.3;
        ctx.fillStyle = `rgba(45, 36, 23, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          particles.splice(idx, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [featherX]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="relative bg-amber-50 dark:bg-slate-950">
      {/* Ink Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none opacity-30 dark:opacity-25 -z-5"
        aria-hidden="true"
      />

      {/* Subtle decorative line pattern */}
      <div className="fixed inset-0 opacity-5 dark:opacity-5 pointer-events-none -z-10" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          #2d241f,
          #2d241f 1px,
          transparent 1px,
          transparent 40px
        )`
      }} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 perspective relative overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-sm border border-amber-900/30 bg-amber-100/40 dark:bg-amber-950/30 dark:border-amber-700/40 smooth-transition">
              <span className="text-xs font-poppins font-semibold text-amber-900 dark:text-amber-200 tracking-widest uppercase">
                ✎ Welcome to Authorcraft
              </span>
            </div>
          </motion.div>

          {/* Main Heading with Quill Writing Effect */}
          <motion.div variants={itemVariants} style={{ perspective: '1200px' }} className="relative mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-8xl font-grotesk font-bold leading-tight text-amber-950 dark:text-amber-50 relative">
              <span className="text-amber-950 dark:text-amber-50">
                {displayText}
              </span>

              {/* Animated Quill writing */}
              {displayText.length < fullText.length && (
                <motion.div
                  className="absolute text-4xl md:text-5xl"
                  style={{
                    left: `${(displayText.length * 3.5)}%`,
                    top: '-8px',
                  }}
                  animate={{
                    y: [-3, 3, -3],
                    rotate: [20, -20, 20],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  ✒️
                </motion.div>
              )}

              {/* Animated cursor when typing */}
              {displayText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="text-amber-900 dark:text-amber-200 ml-1"
                >
                  |
                </motion.span>
              )}

              {/* Quill resting after typing complete */}
              {displayText.length === fullText.length && (
                <motion.div
                  className="absolute text-3xl md:text-4xl"
                  style={{ right: '-40px', top: '15px' }}
                  animate={{
                    opacity: [0.7, 0.4, 0.7],
                    y: [0, 4, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ✒️
                </motion.div>
              )}
            </h1>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-amber-900 to-transparent dark:via-amber-200 mx-auto mb-8"
          />

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-amber-900/80 dark:text-amber-100/80 mb-12 font-poppins max-w-2xl mx-auto leading-relaxed font-light">
              The official literary club of NMAMIT. A community where poets, storytellers, and creators unite to celebrate the power of words. From open mics to published works, we're where your voice finds its platform.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/works">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 15px 30px rgba(180, 83, 9, 0.15)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-sm bg-amber-900 text-amber-50 font-poppins font-medium flex items-center gap-2 justify-center smooth-transition transform-gpu border border-amber-900/20 hover:bg-amber-800"
              >
                Explore Works
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </Link>
            <Link to="/submit">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(180, 83, 9, 0.05)',
                  borderColor: 'rgba(180, 83, 9, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-sm border border-amber-900/30 text-amber-900 dark:text-amber-100 font-poppins font-medium flex items-center gap-2 justify-center smooth-transition hover:bg-amber-50 dark:hover:bg-amber-950/50 transform-gpu"
              >
                Submit Your Work
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex justify-center"
          >
            <motion.div
              className="text-sm font-poppins text-amber-900/60 dark:text-amber-200/60"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Scroll to explore ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-28 px-4 max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-6 h-px w-16 bg-amber-900 dark:bg-amber-200" />
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-8 leading-tight text-amber-950 dark:text-amber-50">
              About{' '}
              <span className="text-amber-800 dark:text-amber-100">Authorcraft</span>
            </h2>
            <div className="space-y-6 text-amber-900/70 dark:text-amber-100/70 font-poppins text-base leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Authorcraft is the official literary club of NMAMIT, operating under Abhyuday. We celebrate creativity in all its forms—poetry, stories, scripts, essays, and open mics.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Every month, we organize <strong className="text-amber-900 dark:text-amber-100">"Steal the Spotlight"</strong> (our flagship open mic event) and work on our annual magazine <strong className="text-amber-900 dark:text-amber-100">"Nirvana"</strong>—a showcase of the best creative minds at NMAMIT.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                If you're an artist, writer, filmmaker, or someone with something to say, Authorcraft is your platform. Let's create something meaningful.
              </motion.p>
            </div>
          </motion.div>

         {/* Right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ perspective: '1200px' }}
            whileHover={{ rotateX: 6, rotateY: 6, scale: 1.02 }}
            className="relative h-96 rounded-sm overflow-hidden bg-gradient-to-br from-amber-100 dark:from-amber-950 to-amber-50 dark:to-slate-900 flex items-center justify-center border border-amber-900/20 dark:border-amber-700/30 shadow-lg hover:shadow-xl smooth-transition transform-gpu"
          >
            <motion.img
              src="/images/image.png"
              alt="Authorcraft Literary Club"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-28 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="h-px w-16 bg-amber-900 dark:bg-amber-200 mx-auto mb-6" />
          <h3 className="text-4xl font-grotesk font-bold text-amber-950 dark:text-amber-50">
            Our Impact
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '500+', label: 'Community Members' },
            { number: '50+', label: 'Events Annually' },
            { number: '∞', label: 'Stories & Poems' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="p-10 rounded-sm bg-amber-100/50 dark:bg-amber-950/30 border border-amber-900/20 dark:border-amber-700/30 smooth-transition hover:shadow-lg text-center"
            >
              <div className="text-5xl font-grotesk font-bold text-amber-900 dark:text-amber-100 mb-3">
                {stat.number}
              </div>
              <p className="text-amber-900/70 dark:text-amber-100/70 font-poppins font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-28 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="h-px w-16 bg-amber-900 dark:bg-amber-200 mx-auto mb-6" />
          <h3 className="text-4xl font-grotesk font-bold text-amber-950 dark:text-amber-50">
            Our Initiatives
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Steal the Spotlight', desc: 'Monthly open mic nights where creators share their work live', icon: '🎤' },
            { title: 'Nirvana Magazine', desc: 'Annual publication featuring the best works from our community', icon: '📖' },
            { title: 'Writing Workshops', desc: 'Skill-building sessions with experienced writers and editors', icon: '✒️' },
            { title: 'Prompt of the Week', desc: 'Weekly writing prompts to inspire and challenge our members', icon: '✍️' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, borderColor: 'rgba(180, 83, 9, 0.3)' }}
              className="p-10 rounded-sm bg-amber-50/80 dark:bg-slate-900/50 border border-amber-900/15 dark:border-amber-700/20 smooth-transition"
            >
              <div className="text-4xl mb-5">{item.icon}</div>
              <h4 className="text-2xl font-grotesk font-bold text-amber-950 dark:text-amber-50 mb-3">
                {item.title}
              </h4>
              <p className="text-amber-900/70 dark:text-amber-100/70 font-poppins text-base leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-16 rounded-sm bg-amber-100/60 dark:bg-amber-950/40 border border-amber-900/20 dark:border-amber-700/30 smooth-transition"
        >
          <div className="h-px w-16 bg-amber-900 dark:bg-amber-200 mx-auto mb-8" />
          <h2 className="text-4xl font-grotesk font-bold mb-6 text-amber-950 dark:text-amber-50">
            Ready to Share Your Story?
          </h2>
          <p className="text-amber-900/70 dark:text-amber-100/70 text-lg font-poppins mb-12 max-w-2xl mx-auto font-light">
            Join a vibrant community of writers and creators. Submit your work, attend our events, or simply be part of a movement that celebrates the written word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-sm bg-amber-900 text-amber-50 font-poppins font-medium smooth-transition border border-amber-900/20 hover:bg-amber-800"
              >
                Browse Events
              </motion.button>
            </Link>
            <Link to="/team">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-sm border border-amber-900/30 text-amber-900 dark:text-amber-100 font-poppins font-medium smooth-transition hover:bg-amber-50 dark:hover:bg-amber-950/50"
              >
                Meet Our Team
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 text-center border-t border-amber-900/20 dark:border-amber-700/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-amber-900/60 dark:text-amber-100/60 font-poppins mb-8 font-light">
            Follow us for the latest updates, submissions, and community highlights
          </p>
          <motion.a
            href="https://www.instagram.com/authorcraft_nmamit/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 rounded-sm bg-amber-900 text-amber-50 font-poppins font-medium smooth-transition hover:shadow-lg hover:shadow-amber-900/20 border border-amber-900/20"
          >
            Follow @authorcraft_nmamit
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
