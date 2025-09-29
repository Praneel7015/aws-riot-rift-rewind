import { useEffect } from 'react';

const defaultOptions = {
  particleCount: 50,
  connectionDistance: 100,
  velocity: 0.5,
  color: '255, 50, 50',
};

function createParticle(canvas, velocity) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * velocity,
    vy: (Math.random() - 0.5) * velocity,
    radius: Math.random() * 2 + 1,
  };
}

export function useParticleNetwork(canvasRef, options = {}) {
  const {
    particleCount,
    connectionDistance,
    velocity,
    color,
  } = { ...defaultOptions, ...options };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: particleCount }, () =>
        createParticle(canvas, velocity),
      );
    };

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        for (let i = index + 1; i < particles.length; i += 1) {
          const other = particles[i];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(${color}, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${color}, 0.8)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(step);
    };

    resizeCanvas();
    step();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, particleCount, connectionDistance, velocity, color]);
}
