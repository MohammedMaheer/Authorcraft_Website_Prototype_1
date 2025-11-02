import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

const Canvas3DBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Particle system
    const particles: Particle[] = [];
    const particleCount = 50;
    const colors = [
      'rgba(220, 38, 38, 0.6)',    // Primary red
      'rgba(252, 211, 77, 0.5)',   // Secondary yellow
      'rgba(249, 115, 22, 0.5)',   // Accent orange
      'rgba(220, 38, 38, 0.3)',
      'rgba(252, 211, 77, 0.3)',
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 1,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(248, 250, 252, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Add subtle sine wave motion for visual interest
        const wave = Math.sin(time + index * 0.5) * 0.5;
        particle.y += wave;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 100;
        if (particle.z > 100) particle.z = 0;

        // Calculate perspective scale based on z depth
        const scale = (particle.z / 100) * 0.5 + 0.5;
        const scaledRadius = particle.radius * scale;
        const opacity = scale;

        // Draw particle with glow effect
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${opacity})`);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, scaledRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/g, `${opacity * 0.5})`);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, scaledRadius * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = `rgba(220, 38, 38, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-40"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}
    />
  );
};

export default Canvas3DBackground;
