import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const BookIntro = ({ onComplete }) => {
  const [stage, setStage] = useState('closed');
  const [currentPage, setCurrentPage] = useState(0);
  const [flippedPages, setFlippedPages] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const audioContextRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 200 });

  const pages = [
    {
      title: "Welcome",
      content: "To a world where ink breathes life into dreams...",
      quote: "Every story begins with a single word"
    },
    {
      title: "Nirvana",
      content: "Where ancient quills meet modern voices",
      quote: "In the silence of pages, voices echo eternal"
    },
    {
      title: "NMAMIT",
      content: "The chronicle of creative souls",
      quote: "We are the keepers of untold tales"
    },
    {
      title: "Journey Begins",
      content: "Step into our literary realm",
      quote: "Where every word weaves magic"
    },
    {
      title: "Your Story",
      content: "Awaits to be written",
      quote: "Let your voice be heard"
    },
  ];

  // Sound effects
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playPageTurn = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  };

  const playAmbientRustle = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.02;
    }

    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);

    source.start(ctx.currentTime);
  };

  // Feather cursor trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      setCursorTrail(prev => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stage progression
  useEffect(() => {
    playAmbientRustle();
    const timer1 = setTimeout(() => {
      setStage('opening');
      playPageTurn();
    }, 1000);
    const timer2 = setTimeout(() => setStage('flipping'), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (stage === 'flipping') {
      // First page stays longer (3 seconds), rest stay 2.5 seconds each
      const flipPage = (pageIndex) => {
        if (pageIndex >= pages.length) {
          setTimeout(() => {
            setStage('complete');
            playPageTurn();
          }, 2000);
          return;
        }

        const delay = pageIndex === 0 ? 3000 : 2500; // First page: 3s, others: 2.5s

        setTimeout(() => {
          playPageTurn();
          setFlippedPages(f => [...f, pageIndex]);
          setCurrentPage(pageIndex + 1);
          flipPage(pageIndex + 1);
        }, delay);
      };

      flipPage(0);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'complete') {
      setTimeout(() => onComplete(), 800);
    }
  }, [stage, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
         style={{
           background: 'radial-gradient(ellipse at center, #2d1b0e 0%, #1a0f08 100%)',
         }}>

      {/* Sepia vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse at center, transparent 0%, rgba(20,10,5,0.9) 100%)',
             mixBlendMode: 'multiply'
           }} />

      {/* Paper noise texture overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
             backgroundSize: '200px 200px',
           }} />

      {/* Flickering candle light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.35, 0.55, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(255,180,100,0.3) 0%, transparent 50%)',
        }}
      />

      {/* Feather cursor trail */}
      {cursorTrail.map((point, i) => (
        <motion.div
          key={point.id}
          className="absolute pointer-events-none z-[105]"
          style={{
            left: point.x,
            top: point.y,
            width: 20 - i,
            height: 20 - i,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-amber-200/40 transform -rotate-45" style={{ fontSize: `${20 - i}px` }}>
            🪶
          </div>
        </motion.div>
      ))}

      {/* Feather cursor */}
      <motion.div
        className="fixed pointer-events-none z-[110] text-3xl transform -rotate-45"
        style={{
          left: cursorX,
          top: cursorY,
          x: -15,
          y: -15,
        }}
      >
        <motion.div
          animate={{
            rotate: [-45, -50, -45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🪶
        </motion.div>
      </motion.div>

      {/* Ambient floating dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Book container - CENTERED */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{ perspective: '2500px' }}
        initial={{ scale: 0.5, opacity: 0, rotateX: 15 }}
        animate={{
          scale: stage === 'complete' ? 1.3 : 1,
          opacity: stage === 'complete' ? 0 : 1,
          rotateX: 0,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Book glow */}
        <motion.div
          className="absolute inset-0 blur-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255,180,100,0.5) 0%, transparent 70%)',
            transform: 'scale(1.5)',
          }}
        />

        {/* Book */}
        <motion.div
          className="relative w-[450px] h-[600px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Spine and back cover with curve */}
          <div className="absolute inset-0 rounded-l-2xl overflow-hidden"
               style={{
                 transformStyle: 'preserve-3d',
                 transform: 'translateZ(-15px)',
               }}>
            <div className="absolute inset-0"
                 style={{
                   background: 'linear-gradient(to right, #3e2723 0%, #4a2c2a 10%, #5d3a2f 50%, #4a2c2a 90%, #3e2723 100%)',
                 }}>
              {/* Leather texture pattern */}
              <div className="absolute inset-0 opacity-30"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='leather' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23000' opacity='0.2'/%3E%3Ccircle cx='30' cy='25' r='1.5' fill='%23000' opacity='0.15'/%3E%3Cpath d='M0,20 Q10,15 20,20 T40,20' stroke='%23000' opacity='0.1' fill='none'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23leather)'/%3E%3C/svg%3E")`,
                   }} />
              {/* Spine ridges */}
              <div className="absolute left-2 top-12 bottom-12 w-3 flex flex-col justify-around">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-1 bg-amber-900/30 rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* Front cover with embossed gold border */}
          <motion.div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.8)',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              rotateY: stage === 'closed' ? 0 : -180,
            }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          >
            {/* Leather texture base */}
            <div className="absolute inset-0"
                 style={{
                   background: 'linear-gradient(135deg, #5d4037 0%, #3e2723 50%, #4e342e 100%)',
                 }}>
              <div className="absolute inset-0 opacity-40"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='texture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='200' height='200' filter='url(%23texture)' opacity='0.5'/%3E%3C/svg%3E")`,
                   }} />
            </div>

            {/* Gold embossed border */}
            <div className="absolute inset-4 border-4 rounded-lg"
                 style={{
                   borderImage: 'linear-gradient(135deg, #ffd700, #ffed4e, #ffd700, #b8860b) 1',
                   boxShadow: 'inset 0 2px 10px rgba(255,215,0,0.4), 0 2px 5px rgba(0,0,0,0.5)',
                 }}>
              {/* Corner ornaments */}
              <div className="absolute -top-1 -left-1 text-3xl text-amber-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>◆</div>
              <div className="absolute -top-1 -right-1 text-3xl text-amber-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>◆</div>
              <div className="absolute -bottom-1 -left-1 text-3xl text-amber-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>◆</div>
              <div className="absolute -bottom-1 -right-1 text-3xl text-amber-400" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>◆</div>
            </div>

            {/* Cover content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  filter: ['drop-shadow(0 0 10px rgba(255,215,0,0.5))', 'drop-shadow(0 0 20px rgba(255,215,0,0.8))', 'drop-shadow(0 0 10px rgba(255,215,0,0.5))']
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-8"
              >
                ✒️
              </motion.div>

              {/* Gold embossed title */}
              <h1 className="text-5xl font-bold text-center mb-4 relative"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    color: '#ffd700',
                    textShadow: '2px 2px 0px #b8860b, 4px 4px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.6)',
                    letterSpacing: '0.1em',
                  }}>
                AUTHORCRAFT
              </h1>

              <div className="h-1 w-48 mb-4"
                   style={{
                     background: 'linear-gradient(to right, transparent, #ffd700, transparent)',
                     boxShadow: '0 2px 10px rgba(255,215,0,0.5)',
                   }} />

              <p className="text-amber-300 text-lg tracking-widest"
                 style={{
                   fontFamily: '"Cinzel", serif',
                   textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                 }}>
                NMAMIT LITERARY CLUB
              </p>

              <div className="mt-8 text-amber-200/60 text-sm italic"
                   style={{
                     fontFamily: '"Dancing Script", cursive',
                     textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                   }}>
                Est. MMXXIII
              </div>
            </div>
          </motion.div>

          {/* Multiple pages stack */}
          {stage === 'flipping' && pages.map((page, idx) => {
            const isCurrentPage = idx === currentPage;
            const hasBeenFlipped = flippedPages.includes(idx);
            const shouldShow = idx <= currentPage;

            if (!shouldShow) return null;

            return (
              <motion.div
                key={idx}
                className="absolute inset-0 mx-6"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  zIndex: 100 + (pages.length - idx),
                }}
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: hasBeenFlipped ? -180 : 0
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                {/* Page front - parchment texture */}
                <div className="absolute inset-0 rounded-r-xl shadow-2xl flex items-center justify-center p-16 overflow-hidden"
                     style={{
                       backfaceVisibility: 'hidden',
                       background: 'linear-gradient(135deg, #f4e4c1 0%, #e8d5b5 50%, #f4e4c1 100%)',
                       boxShadow: '5px 5px 20px rgba(0,0,0,0.4), inset -2px 0 10px rgba(0,0,0,0.1)',
                     }}>

                  {/* Parchment texture overlay */}
                  <div className="absolute inset-0 opacity-30"
                       style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='parchment${idx}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' seed='${idx * 7}'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='300' height='300' filter='url(%23parchment${idx})' fill='%23d4c5a9'/%3E%3C/svg%3E")`,
                       }} />

                  {/* Coffee stain effect */}
                  <div className="absolute top-8 right-12 w-24 h-24 rounded-full bg-amber-900/10 blur-xl" />
                  <div className="absolute bottom-16 left-16 w-32 h-32 rounded-full bg-amber-900/5 blur-2xl" />

                  {/* Ruled lines */}
                  <div className="absolute inset-0 opacity-8"
                       style={{
                         backgroundImage: `repeating-linear-gradient(
                           0deg,
                           transparent,
                           transparent 35px,
                           #8b7355 35px,
                           #8b7355 36px
                         )`,
                       }} />

                  {/* Content */}
                  <div className="relative z-10 text-center w-full">
                    <motion.h2
                      className="text-6xl font-bold mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      style={{
                        fontFamily: '"Cinzel", serif',
                        color: '#5d4037',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.15)',
                      }}
                    >
                      {page.title}
                    </motion.h2>

                    <motion.p
                      className="text-2xl mb-12 px-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      style={{
                        fontFamily: '"Crimson Text", serif',
                        color: '#6d4c41',
                        lineHeight: '1.8',
                      }}
                    >
                      {page.content}
                    </motion.p>

                    {/* Handwritten quote */}
                    <motion.div
                      className="border-t-2 border-amber-900/30 pt-8 px-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      <p className="text-xl italic"
                         style={{
                           fontFamily: '"Dancing Script", cursive',
                           color: '#8d6e63',
                         }}>
                        "{page.quote}"
                      </p>
                    </motion.div>

                    {/* Page number */}
                    <div className="absolute bottom-8 right-12 text-sm"
                         style={{
                           fontFamily: '"Cinzel", serif',
                           color: '#a1887f',
                         }}>
                      {idx + 1}
                    </div>
                  </div>
                </div>

                {/* Page back - HIDDEN when flipped */}
                <div className="absolute inset-0 rounded-l-xl shadow-2xl"
                     style={{
                       backfaceVisibility: 'hidden',
                       transform: 'rotateY(180deg)',
                       background: 'linear-gradient(135deg, #e8d5b5 0%, #f4e4c1 50%, #e8d5b5 100%)',
                     }}>
                  <div className="absolute inset-0 opacity-20"
                       style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='parchmentback${idx}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' seed='${idx * 13 + 10}'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='300' height='300' filter='url(%23parchmentback${idx})' fill='%23d4c5a9'/%3E%3C/svg%3E")`,
                       }} />
                </div>
              </motion.div>
            );
          })}

          {/* Realistic shadow under book */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-16 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Loading text with handwritten font */}
      {stage !== 'complete' && (
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xl mb-4 text-amber-300/80"
             style={{
               fontFamily: '"Dancing Script", cursive',
               textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
             }}>
            Opening the chronicles...
          </p>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #ffd700, #b8860b)',
                  boxShadow: '0 2px 5px rgba(255,215,0,0.5)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Add fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Dancing+Script:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,700;1,400&display=swap');

        * {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
};

export default BookIntro;
