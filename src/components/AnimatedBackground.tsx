import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light via-light to-light dark:from-dark dark:via-dark dark:to-dark" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-accent/15 to-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #DC2626 1px, transparent 1px),
            linear-gradient(0deg, #DC2626 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'aurora-shift 15s ease infinite',
        }}
      />
    </div>
  );
};
