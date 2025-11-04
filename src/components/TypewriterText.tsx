import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

/**
 * TypewriterText Component
 * Animates text character by character like a typewriter
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  speed = 100,
  cursor = true,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText === text) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, text, speed, onComplete]);

  return (
    <div className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1 inline-block w-1 h-8 bg-primary"
        />
      )}
    </div>
  );
};

export default TypewriterText;
