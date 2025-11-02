import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bestWorks } from '../data/content';
import type { Work } from '../data/content';

type Category = 'All' | 'Poem' | 'Story' | 'Script' | 'Microfiction' | 'Essay';

const BestWorks: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const categories: Category[] = ['All', 'Poem', 'Story', 'Script', 'Microfiction', 'Essay'];

  const filteredWorks =
    selectedCategory === 'All'
      ? bestWorks
      : bestWorks.filter((work) => work.category === selectedCategory);

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
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Best Works</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-poppins max-w-2xl mx-auto">
            Curated masterpieces from Authorcraft's most talented creators. Get inspired. Get moved.
          </p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.1, rotateZ: 2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-full font-poppins font-black smooth-transition text-lg border-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#ff006e] via-[#b300ff] to-[#00d9ff] text-white shadow-xl border-white/50'
                  : 'bg-white/10 dark:bg-white/5 text-gray-800 dark:text-gray-200 hover:border-[#ff006e] border-transparent hover:bg-[#ff006e]/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Works Grid */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                variants={cardVariants}
                layout
                className="group cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-[#ff006e] hover:border-[#00d9ff] smooth-transition shadow-lg hover:shadow-2xl p-8 flex flex-col justify-between hover:scale-105 hover:-rotate-1"
                  style={{ boxShadow: '0 0 30px rgba(255, 0, 110, 0.3)' }}>
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-rainbow opacity-5 group-hover:opacity-15 smooth-transition -z-10" />

                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-3 mb-6 w-fit relative z-10">
                    <motion.span 
                      whileHover={{ scale: 1.15 }}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff006e] to-[#b300ff] border-2 border-white/30 text-xs font-poppins font-black text-white shadow-lg"
                    >
                      {work.category}
                    </motion.span>
                    <span className="text-xs font-bold bg-[#00d9ff]/20 text-[#00d9ff] px-3 py-2 rounded-full">📅 {work.date}</span>
                  </div>

                  {/* Title */}
                  <div className="mb-6 relative z-10">
                    <h3 className="text-2xl font-grotesk font-black mb-3 gradient-rainbow-text neon-glow line-clamp-2">
                      {work.title}
                    </h3>
                    <p className="text-sm font-poppins font-bold text-[#ff006e]">
                      ✍️ by <span className="font-black text-[#00d9ff]">{work.author}</span>
                    </p>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-700 dark:text-gray-200 font-poppins text-sm mb-8 line-clamp-4 flex-grow font-semibold relative z-10">
                    {work.excerpt}
                  </p>

                  {/* Read More Button */}
                  <motion.button
                    whileHover={{ x: 8, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white font-poppins font-black flex items-center gap-3 hover:gap-5 smooth-transition relative z-10 px-4 py-2 bg-gradient-to-r from-[#ff006e] to-[#b300ff] rounded-lg w-fit"
                  >
                    🔥 Read More 🔥
                  </motion.button>

                  {/* Decorative Corners */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#ff006e]/30 to-[#00d9ff]/30 rounded-full blur-3xl -z-10 group-hover:scale-150 smooth-transition" />
                  <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-br from-[#b300ff]/20 to-[#39ff14]/20 rounded-full blur-2xl -z-10" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-light dark:bg-dark rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#ff006e] shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(255, 0, 110, 0.5)' }}
            >
              <div className="sticky top-0 bg-gradient-to-r from-[#ff006e] to-[#b300ff] dark:from-[#ff006e]/80 dark:to-[#b300ff]/80 border-b-2 border-[#00d9ff] p-6 flex justify-between items-center">
                <h2 className="text-3xl font-grotesk font-black text-white drop-shadow-lg">
                  {selectedWork.title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedWork(null)}
                  className="p-3 hover:bg-white/20 rounded-full smooth-transition text-white font-black text-2xl"
                >
                  ✕
                </motion.button>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <p className="text-lg font-poppins font-black mb-4">
                    ✍️ by <span className="text-[#ff006e]">{selectedWork.author}</span>
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff006e] to-[#b300ff] border-2 border-white/30 text-xs font-poppins font-black text-white shadow-lg">
                      {selectedWork.category}
                    </span>
                    <span className="px-5 py-2 rounded-full bg-[#00d9ff]/20 text-[#00d9ff] font-poppins font-black border-2 border-[#00d9ff]">
                      📅 {selectedWork.date}
                    </span>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none bg-[#39ff14]/5 rounded-2xl p-6 border-2 border-[#39ff14]/30">
                  <p className="whitespace-pre-wrap font-poppins text-gray-800 dark:text-gray-100 leading-relaxed text-lg font-semibold">
                    {selectedWork.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      {filteredWorks.length === 0 && (
        <section className="py-20 px-4 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400 font-poppins">
            No works in this category yet. Check back soon! 📝
          </p>
        </section>
      )}
    </div>
  );
};

export default BestWorks;
