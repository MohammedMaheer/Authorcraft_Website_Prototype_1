import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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
    <div className="relative">
      {/* Hero Section with 3D effect */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 perspective">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge with 3D hover */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ rotateX: 10, rotateY: 5, scale: 1.05 }}
            style={{ perspective: '1000px' }}
          >
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 hover:border-primary/60 smooth-transition hover:shadow-lg hover:shadow-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-spin" />
              <span className="text-sm font-poppins font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to Authorcraft
              </span>
            </div>
          </motion.div>

          {/* Main Heading with advanced 3D */}
          <motion.div 
            variants={itemVariants}
            style={{ perspective: '1200px' }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-8xl font-grotesk font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              <motion.span 
                className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                whileHover={{ scale: 1.05, rotateZ: 2 }}
              >
                Where Words
              </motion.span>
              <br />
              <span className="relative inline-block">
                <motion.span
                  className="block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Come Alive
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl -z-10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </span>
              <motion.span 
                className="text-3xl md:text-5xl ml-2 inline-block"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.2 }}
              >
                ✨
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 font-poppins max-w-2xl mx-auto leading-relaxed">
              The official literary club of NMAMIT. A community where poets, storytellers, and creators unite to celebrate the power of words. From open mics to published works, we're where your voice finds its platform.
            </p>
          </motion.div>

          {/* CTA Buttons with 3D effects */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/works">
              <motion.button
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: '0 30px 60px rgba(220, 38, 38, 0.3)',
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.92 }}
                style={{ perspective: '1000px' }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-semibold flex items-center gap-2 justify-center smooth-transition transform-gpu"
              >
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Explore Works
                </motion.div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
            <Link to="/submit">
              <motion.button
                whileHover={{ 
                  scale: 1.08, 
                  borderColor: 'rgba(220, 38, 38, 0.8)',
                  rotateY: -5,
                }}
                whileTap={{ scale: 0.92 }}
                style={{ perspective: '1000px' }}
                className="px-8 py-4 rounded-lg border-2 border-primary dark:border-secondary text-primary dark:text-secondary font-poppins font-semibold flex items-center gap-2 justify-center smooth-transition hover:bg-primary/5 dark:hover:bg-secondary/5 transform-gpu"
              >
                Submit Your Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <motion.div 
              className="text-gray-400 text-sm font-poppins"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to explore ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section with 3D cards */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold mb-6">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Authorcraft</span>
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 font-poppins text-lg leading-relaxed">
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
                Every Year, we organize <strong>"Steal the Spotlight"</strong> (our flagship open mic event) and work on our annual magazine <strong>"Nirvana"</strong>—a showcase of the best creative minds at NMAMIT.
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
          <motion.div
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            animate={{ y: [0, 10, 0] }}
            style={{ perspective: '1200px' }}
            whileHover={{ rotateX: 10, rotateY: 10, scale: 1.05 }}
            className="relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/30 smooth-transition transform-gpu"
          >
            <div className="text-6xl">📚✍️🎤</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section with pop-in animations */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '300+', label: 'Community Members', emoji: '👥' },
            { number: '50+', label: 'Events Held', emoji: '🎉' },
            { number: '∞', label: 'Stories & Poems', emoji: '📖' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5, rotateZ: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              whileHover={{ y: -10, rotateX: 5 }}
              transition={{ 
                delay: idx * 0.15, 
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              viewport={{ once: true }}
              style={{ perspective: '1200px' }}
              className="text-center p-8 rounded-lg glass hover:border-primary/50 smooth-transition border border-primary/20 hover:shadow-xl hover:shadow-primary/20 transform-gpu cursor-pointer"
            >
              <motion.div 
                className="text-5xl mb-3"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {stat.emoji}
              </motion.div>
              <div className="text-4xl font-grotesk font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-poppins font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section with advanced 3D */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ perspective: '1200px' }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 40px 80px rgba(220, 38, 38, 0.2)',
          }}
          className="p-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 hover:border-primary/50 smooth-transition shadow-lg transform-gpu"
        >
          <motion.h2 
            className="text-4xl font-grotesk font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Join Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Creative Community</span>?
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-lg font-poppins mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Whether you're here to read, submit, or connect with fellow creatives—you're in the right place.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/events">
              <motion.button
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.92 }}
                style={{ perspective: '1000px' }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-semibold smooth-transition transform-gpu"
              >
                Explore Events
              </motion.button>
            </Link>
            <Link to="/team">
              <motion.button
                whileHover={{ 
                  scale: 1.08,
                  rotateY: -5,
                }}
                whileTap={{ scale: 0.92 }}
                style={{ perspective: '1000px' }}
                className="px-8 py-3 rounded-lg border-2 border-primary dark:border-secondary text-primary dark:text-secondary font-poppins font-semibold smooth-transition hover:bg-primary/5 transform-gpu"
              >
                Meet the Team
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
