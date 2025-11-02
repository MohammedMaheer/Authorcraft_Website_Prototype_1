import React, { useEffect, useRef } from 'react';

interface TextMorphProps {
  text: string;
  className?: string;
}

const TextMorph3D: React.FC<TextMorphProps> = ({ text, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textDiv = textRef.current;
    if (!canvas || !textDiv) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match text element
    const updateCanvasSize = () => {
      const rect = textDiv.getBoundingClientRect();
      canvas.width = rect.width || 1;
      canvas.height = rect.height || 1;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = window.getComputedStyle(textDiv).font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const x = canvas.width / 2;
      const y = canvas.height / 2;

      // Create 3D perspective transform
      const perspective = 500;
      const rotationY = Math.sin(time) * 0.3;
      const rotationX = Math.cos(time * 0.7) * 0.2;
      const scaleZ = Math.cos(time * 0.5) * 0.1 + 1;

      // Save context state
      ctx.save();

      // Apply transformations
      ctx.translate(x, y);
      ctx.scale(scaleZ, scaleZ);
      ctx.transform(1, rotationX, rotationY, 1, 0, 0);

      // Draw text with gradient
      const gradient = ctx.createLinearGradient(-canvas.width / 2, 0, canvas.width / 2, 0);
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.8)');
      gradient.addColorStop(0.5, 'rgba(252, 211, 77, 0.8)');
      gradient.addColorStop(1, 'rgba(220, 38, 38, 0.8)');

      ctx.fillStyle = gradient;
      ctx.fillText(text, 0, 0);

      // Draw outline
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeText(text, 0, 0);

      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [text]);

  return (
    <div className="relative inline-block">
      <canvas ref={canvasRef} className={`${className} filter drop-shadow-lg`} />
      <div ref={textRef} className={`${className} invisible`}>
        {text}
      </div>
    </div>
  );
};

export default TextMorph3D;
