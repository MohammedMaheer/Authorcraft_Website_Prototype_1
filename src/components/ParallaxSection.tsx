import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0.5 = half speed, 1 = normal, 1.5 = faster
  bgImage?: string;
  minHeight?: string;
}

/**
 * ParallaxSection Component
 * Parallax scrolling background effect
 */
export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  bgImage,
  minHeight = 'min-h-screen',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const elementTop = scrollTop + rect.top;

      const parallaxOffset = (scrollTop - elementTop + window.innerHeight) * speed;
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${minHeight} ${className}`}
    >
      {/* Parallax background */}
      {bgImage && (
        <motion.div
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: offset,
          }}
          className="absolute inset-0 will-change-transform"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
