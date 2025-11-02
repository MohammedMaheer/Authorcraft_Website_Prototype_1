import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
  color: string;
}

interface ParticleSystemProps {
  density?: number;
  interactive?: boolean;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  density = 50, 
  interactive = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#DC2626',  // Primary red
      '#FCD34D',  // Secondary yellow
      '#F97316',  // Accent orange
    ];

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        life: 1,
        maxLife: Math.random() * 2 + 1,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Mouse tracking
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseRef.current = { x: mouseX, y: mouseY };
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Create particle burst on click
      for (let i = 0; i < 15; i++) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleMouseClick);
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Clear canvas with slight transparency for trail
      ctx.fillStyle = 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles
      if (frameCount % 3 === 0 && particlesRef.current.length < density) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 100;
        particlesRef.current.push(
          createParticle(
            canvas.width / 2 + Math.cos(angle) * distance,
            canvas.height / 2 + Math.sin(angle) * distance
          )
        );
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy -= 0.1; // Gravity
        particle.life -= 1 / 60; // Decrease life

        if (particle.life <= 0) return false;

        const opacity = particle.life / particle.maxLife;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity * 0.8;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        ctx.strokeStyle = particle.color;
        ctx.globalAlpha = opacity * 0.4;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 1;

        return true;
      });

      // Interactive mouse interaction
      if (interactive && frameCount % 5 === 0) {
        const dx = mouseRef.current.x - (canvas.width / 2);
        const dy = mouseRef.current.y - (canvas.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          for (let i = 0; i < 2; i++) {
            particlesRef.current.push(createParticle(mouseRef.current.x, mouseRef.current.y));
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleMouseClick);
      }
      cancelAnimationFrame(animationId);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-20 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleSystem;
