import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  variant?: 'light' | 'dark' | 'primary';
}

/**
 * Glassmorphism Card Component
 * Creates modern frosted glass effect cards with backdrop blur
 */
export const GlassmorphCard: React.FC<GlassmorphCardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
  variant = 'light',
}) => {
  const variantStyles = {
    light: 'bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10',
    dark: 'bg-black/10 dark:bg-black/20 border-black/20 dark:border-black/30',
    primary: 'bg-primary/10 dark:bg-primary/5 border-primary/30 dark:border-primary/20',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        relative rounded-2xl border backdrop-blur-xl overflow-hidden
        ${variantStyles[variant]}
        ${hover ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassmorphCard;
