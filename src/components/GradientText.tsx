import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
  animate?: boolean;
  colors?: string[];
}

/**
 * GradientText Component
 * Text with animated gradient effect
 */
export const GradientText: React.FC<GradientTextProps> = ({
  text,
  className = '',
  animate = true,
  colors = ['#6366f1', '#ec4899', '#06b6d4', '#6366f1'],
}) => {
  const gradientStyle = `linear-gradient(90deg, ${colors.join(', ')})`;

  return (
    <motion.div
      animate={animate ? { backgroundPosition: ['0%', '100%', '0%'] } : undefined}
      transition={animate ? { duration: 3, repeat: Infinity, ease: 'linear' } : undefined}
      className={`
        bg-clip-text text-transparent font-bold
        ${animate ? 'bg-[length:200%_200%]' : ''}
        ${className}
      `}
      style={{
        backgroundImage: gradientStyle,
        backgroundPosition: animate ? '0% center' : undefined,
      }}
    >
      {text}
    </motion.div>
  );
};

export default GradientText;
