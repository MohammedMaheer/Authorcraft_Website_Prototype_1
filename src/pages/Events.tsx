import React from 'react';
import { motion } from 'framer-motion';
import { events } from '../data/content';

const Events: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-grotesk font-bold mb-6">
            Events & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Experiences</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-poppins max-w-2xl mx-auto">
            Moments where words come alive and creativity reaches its peak. Legendary events and unforgettable experiences.
          </p>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative h-72 rounded-lg overflow-hidden bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 hover:border-primary/50 smooth-transition shadow-lg hover:shadow-xl p-8 flex flex-col justify-between">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 smooth-transition" />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl mb-4 w-fit"
                  >
                    {event.emoji}
                  </motion.div>
                  <h3 className="text-2xl font-grotesk font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-poppins mb-4">
                    {event.date}
                  </p>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="relative z-10 italic text-gray-700 dark:text-gray-300 font-poppins text-sm"
                >
                  &ldquo;{event.caption}&rdquo;
                </motion.p>

                {/* Decorative Corner */}
                <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl -z-10 group-hover:scale-150 smooth-transition" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 hover:border-primary/50 smooth-transition"
        >
          <h2 className="text-4xl font-grotesk font-bold mb-4">
            Want to Stay <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Updated</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-poppins mb-8">
            Follow us on Instagram for event announcements, behind-the-scenes content, and real-time updates from our literary adventures!
          </p>
          <motion.a
            href="https://www.instagram.com/authorcraft_nmamit/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-semibold smooth-transition hover:shadow-lg"
          >
            Follow @authorcraft_nmamit
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default Events;
