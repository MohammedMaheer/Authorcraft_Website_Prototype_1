import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RippleEffectProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  rippleColor?: string;
}

interface Ripple {
  id: string;
  x: number;
  y: number;
}

/**
 * RippleEffect Component
 * Material Design ripple effect on click
 */
export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  onClick,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.6)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = `${x}-${y}-${Date.now()}`;

    const newRipple: Ripple = { id, x, y };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((r) => r.filter((ripple) => ripple.id !== id));
    }, 600);

    onClick?.(e);
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 20,
            height: 20,
            left: ripple.x - 10,
            top: ripple.y - 10,
            backgroundColor: rippleColor,
          }}
        />
      ))}
    </div>
  );
};

export default RippleEffect;
