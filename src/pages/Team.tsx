import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '../data/content';

const Team: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
            Meet the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-poppins max-w-2xl mx-auto">
            The passionate creators and visionaries behind Authorcraft. Leading the literary revolution at NMAMIT.
          </p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="px-4 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 hover:border-primary/50 smooth-transition shadow-lg hover:shadow-2xl">
                {/* Profile Image Container */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 smooth-transition">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end justify-center pb-6">
                    <div className="text-4xl">{member.emoji}</div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  {/* Role Badge */}
                  <div className="inline-block mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-xs font-poppins font-semibold text-primary dark:text-secondary">
                      <span className="text-lg">{member.emoji}</span>
                      {member.role}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-grotesk font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {member.name}
                  </h3>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-300 font-poppins text-sm mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Quote Section */}
                  <div className="border-t border-primary/20 pt-4">
                    <p className="text-sm font-poppins italic text-gray-700 dark:text-gray-400">
                      &ldquo;{member.quote.split(' - ')[0].replace(/^"|"$/g, '')}&rdquo;
                    </p>
                  </div>

                  {/* Social Links Placeholder */}
                  <div className="mt-6 flex gap-3 justify-center">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white hover:shadow-lg smooth-transition"
                      aria-label="LinkedIn"
                    >
                      <span className="text-lg">💼</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white hover:shadow-lg smooth-transition"
                      aria-label="Instagram"
                    >
                      <span className="text-lg">📸</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center text-white hover:shadow-lg smooth-transition"
                      aria-label="Twitter"
                    >
                      <span className="text-lg">✍️</span>
                    </motion.a>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -top-1 -right-1 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl -z-10 group-hover:scale-150 smooth-transition" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 hover:border-primary/50 smooth-transition"
        >
          <h2 className="text-4xl font-grotesk font-bold mb-4">
            Want to Join Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Creative Community</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-poppins mb-8">
            We're always looking for passionate writers, designers, and creatives to join the Authorcraft family!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-poppins font-semibold smooth-transition hover:shadow-lg"
          >
            Get Involved
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Team;
