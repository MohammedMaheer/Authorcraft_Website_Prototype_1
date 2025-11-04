import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

/**
 * MagneticButton Component
 * Button that follows cursor with magnetic attraction
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovering) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) * strength;
      const y = (e.clientY - centerY) * strength;

      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovering, strength]);

  return (
    <motion.div
      ref={ref}
      animate={position}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
