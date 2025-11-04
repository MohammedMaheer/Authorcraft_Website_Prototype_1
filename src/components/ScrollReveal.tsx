import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  once?: boolean;
}

/**
 * ScrollReveal Component
 * Animates elements when they come into view
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const initialPosition = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 50 },
    right: { opacity: 0, x: -50 },
  };

  const animatePosition = {
    opacity: 1,
    y: direction === 'up' || direction === 'down' ? 0 : undefined,
    x: direction === 'left' || direction === 'right' ? 0 : undefined,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [once]);

  return (
    <motion.div
      ref={ref}
      initial={initialPosition[direction]}
      animate={isVisible ? animatePosition : initialPosition[direction]}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
