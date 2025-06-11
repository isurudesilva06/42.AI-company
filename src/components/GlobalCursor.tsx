import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

const GlobalCursor = () => {
  const activeSection = useActiveSection();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'link' | 'input' | 'text'>('default');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const smoothPositionRef = useRef({ x: 0, y: 0 });

  // Enhanced easing functions
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  // Get enhanced colors with better glow
  const getColors = useCallback(() => {
    const colors = {
      default: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#60a5fa',
        glow: '#3b82f6'
      },
      button: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#34d399',
        glow: '#10b981'
      },
      link: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        accent: '#a78bfa',
        glow: '#8b5cf6'
      },
      input: {
        primary: '#f59e0b',
        secondary: '#d97706',
        accent: '#fbbf24',
        glow: '#f59e0b'
      },
      text: {
        primary: '#06b6d4',
        secondary: '#0891b2',
        accent: '#22d3ee',
        glow: '#06b6d4'
      }
    };
    return colors[cursorVariant];
  }, [cursorVariant]);

  // Smooth position interpolation (only for background glows)
  const updateSmoothPosition = useCallback(() => {
    const factor = 0.18; // Faster interpolation for less delay
    smoothPositionRef.current.x += (position.x - smoothPositionRef.current.x) * factor;
    smoothPositionRef.current.y += (position.y - smoothPositionRef.current.y) * factor;
    
    setSmoothPosition({
      x: smoothPositionRef.current.x,
      y: smoothPositionRef.current.y
    });
  }, [position]);

  // Enhanced particle creation
  const createParticle = useCallback((x: number, y: number, burst: boolean = false) => {
    const colors = getColors();
    
    return {
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * (burst ? 40 : 20),
      y: y + (Math.random() - 0.5) * (burst ? 40 : 20),
      vx: (Math.random() - 0.5) * (burst ? 6 : 3),
      vy: (Math.random() - 0.5) * (burst ? 6 : 3),
      life: burst ? 80 : 50,
      maxLife: burst ? 80 : 50,
      size: Math.random() * (burst ? 4 : 2.5) + 1,
      opacity: 1
    };
  }, [getColors]);

  // Enhanced particle updates
  const updateParticles = useCallback(() => {
    setParticles(prev => prev.map(particle => {
      const newLife = particle.life - 1;
      const progress = 1 - (newLife / particle.maxLife);
      const easeProgress = easeInOutQuart(progress);
      
      return {
        ...particle,
        x: particle.x + particle.vx * (1 - easeProgress * 0.4),
        y: particle.y + particle.vy * (1 - easeProgress * 0.4),
        life: newLife,
        vx: particle.vx * 0.99,
        vy: particle.vy * 0.99,
        opacity: Math.max(0, 1 - easeOutCubic(progress))
      };
    }).filter(particle => particle.life > 0));
  }, []);

  // Enhanced animation loop with 60fps target
  useEffect(() => {
    const animate = () => {
      updateSmoothPosition();
      updateParticles();
      
      // Update trail points with longer duration
      setTrailPoints(prev => {
        const now = Date.now();
        return prev.filter(point => now - point.timestamp < 400);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateSmoothPosition, updateParticles]);

  // Enhanced mouse events
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const now = Date.now();
      const deltaTime = now - lastTime.current;
      
      // Calculate enhanced velocity
      const newVelocity = {
        x: (e.clientX - lastPosition.current.x) / Math.max(deltaTime, 1),
        y: (e.clientY - lastPosition.current.y) / Math.max(deltaTime, 1)
      };
      
      setPosition({ x: e.clientX, y: e.clientY });
      setVelocity(newVelocity);
      setIsVisible(true);
      
      // Add more frequent trail points
      setTrailPoints(prev => [...prev, { 
        x: e.clientX, 
        y: e.clientY, 
        timestamp: now
      }]);
      
      // Enhanced particle generation
      const speed = Math.sqrt(newVelocity.x * newVelocity.x + newVelocity.y * newVelocity.y);
      if (speed > 0.5 && isHovering && Math.random() > 0.75) {
        setParticles(prev => [...prev, createParticle(e.clientX, e.clientY)]);
      }
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
    };

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-pointer')) {
        setCursorVariant('button');
      } else if (target.tagName === 'A' || target.closest('a')) {
        setCursorVariant('link');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        setCursorVariant('input');
      } else if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN') {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Enhanced burst particles
      for (let i = 0; i < 10; i++) {
        setParticles(prev => [...prev, createParticle(e.clientX, e.clientY, true)]);
      }
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);

    // Add event listeners
    const addInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, select, [role="button"], .cursor-pointer, p, h1, h2, h3, h4, h5, h6, span, div'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);
    
    const cleanup = addInteractiveListeners();

    const observer = new MutationObserver(() => {
      cleanup();
      addInteractiveListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      cleanup();
      observer.disconnect();
    };
  }, [createParticle, isHovering]);

  // Manage cursor visibility
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice || activeSection === 'home') {
      document.body.classList.remove('custom-cursor-active');
    } else {
      document.body.classList.add('custom-cursor-active');
    }
    
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [activeSection]);

  // Don't render on touch devices or in hero section
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice || activeSection === 'home') return null;

  const colors = getColors();
  const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  const glowIntensity = Math.min(1, 0.5 + speed * 0.5);

  if (!isVisible) return null;

  return (
    <>
      {/* Enhanced Background Glow - Layer 1 (Largest) - Uses smooth position for trailing effect */}
      <div
        className="fixed pointer-events-none z-[9988] transition-all duration-150 ease-out"
        style={{
          left: smoothPosition.x - 400,
          top: smoothPosition.y - 400,
          width: 800,
          height: 800,
          background: `radial-gradient(circle at center, ${colors.glow}${Math.floor(0.08 * glowIntensity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
          filter: 'blur(80px)',
          transform: `scale(${0.8 + speed * 0.15})`,
          opacity: isHovering ? 1 : 0.7,
        }}
      />

      {/* Enhanced Background Glow - Layer 2 (Medium) - Uses smooth position */}
      <div
        className="fixed pointer-events-none z-[9989] transition-all duration-100 ease-out"
        style={{
          left: smoothPosition.x - 250,
          top: smoothPosition.y - 250,
          width: 500,
          height: 500,
          background: `radial-gradient(circle at center, ${colors.primary}${Math.floor(0.2 * glowIntensity * 255).toString(16).padStart(2, '0')}, ${colors.secondary}${Math.floor(0.12 * glowIntensity * 255).toString(16).padStart(2, '0')}, transparent 60%)`,
          filter: 'blur(50px)',
          transform: `scale(${0.9 + speed * 0.2})`,
          opacity: isHovering ? 1.2 : 0.8,
        }}
      />

      {/* Enhanced Background Glow - Layer 3 (Focused) - Uses immediate position for responsiveness */}
      <div
        className="fixed pointer-events-none z-[9990] transition-all duration-50 ease-out"
        style={{
          left: position.x - 150,
          top: position.y - 150,
          width: 300,
          height: 300,
          background: `radial-gradient(circle at center, ${colors.accent}${Math.floor(0.25 * glowIntensity * 255).toString(16).padStart(2, '0')}, transparent 50%)`,
          filter: 'blur(30px)',
          transform: `scale(${1 + speed * 0.3})`,
          opacity: isHovering ? 1.5 : 1,
        }}
      />

      {/* Intense Click Glow - Enhanced - Uses immediate position */}
      {isClicking && (
        <>
          <div
            className="fixed pointer-events-none z-[9992] animate-ping"
            style={{
              left: position.x - 200,
              top: position.y - 200,
              width: 400,
              height: 400,
              background: `radial-gradient(circle, ${colors.primary}${Math.floor(0.4 * 255).toString(16).padStart(2, '0')}, transparent 50%)`,
              filter: 'blur(40px)',
              animationDuration: '0.6s',
            }}
          />
          <div
            className="fixed pointer-events-none z-[9993] animate-ping"
            style={{
              left: position.x - 100,
              top: position.y - 100,
              width: 200,
              height: 200,
              background: `radial-gradient(circle, ${colors.accent}${Math.floor(0.6 * 255).toString(16).padStart(2, '0')}, transparent 40%)`,
              filter: 'blur(20px)',
              animationDuration: '0.8s',
              animationDelay: '0.1s',
            }}
          />
        </>
      )}

      {/* Enhanced Trail Effect - Uses immediate position */}
      {trailPoints.map((point, index) => {
        const age = (Date.now() - point.timestamp) / 400;
        const opacity = Math.max(0, 1 - easeOutCubic(age));
        const size = Math.max(3, 8 * (1 - age));
        
        return (
          <div
            key={`trail-${point.timestamp}-${index}`}
            className="fixed pointer-events-none z-[9996] rounded-full"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              background: `radial-gradient(circle, ${colors.primary}${Math.floor(opacity * 0.4 * 255).toString(16).padStart(2, '0')}, transparent)`,
              boxShadow: `0 0 ${size * 2}px ${colors.primary}${Math.floor(opacity * 0.2 * 255).toString(16).padStart(2, '0')}`,
              transform: 'translateZ(0)',
            }}
          />
        );
      })}

      {/* Enhanced Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            background: colors.primary,
            opacity: particle.opacity * 0.9,
            boxShadow: `0 0 ${particle.size * 4}px ${colors.primary}, 0 0 ${particle.size * 8}px ${colors.accent}`,
            transform: 'translateZ(0)',
            filter: `blur(${Math.max(0, (1 - particle.opacity) * 1)}px)`,
          }}
        />
      ))}

      {/* Enhanced Main Cursor - Uses immediate position for responsiveness */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          left: position.x - 15,
          top: position.y - 15,
          transform: `scale(${isClicking ? 0.7 : isHovering ? 1.4 : 1})`,
        }}
      >
        {/* Enhanced Outer Ring */}
        <div
          className="w-8 h-8 rounded-full border-2 transition-all duration-150 ease-out"
          style={{
            borderColor: colors.primary,
            background: isHovering ? `${colors.primary}20` : 'transparent',
            boxShadow: isHovering ? 
              `0 0 25px ${colors.primary}80, 0 0 50px ${colors.primary}40, inset 0 0 20px ${colors.primary}20` : 
              `0 0 15px ${colors.primary}60`,
          }}
        />
        
        {/* Enhanced Inner Dot */}
        <div
          className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
          style={{
            background: `radial-gradient(circle, ${colors.primary}, ${colors.accent})`,
            boxShadow: `0 0 15px ${colors.primary}, 0 0 30px ${colors.accent}`,
          }}
        />
      </div>

      {/* Enhanced Hover Effect for Buttons - Uses immediate position */}
      {cursorVariant === 'button' && (
        <div
          className="fixed pointer-events-none z-[9998] rounded-full transition-all duration-150"
          style={{
            left: position.x - 25,
            top: position.y - 25,
            width: 50,
            height: 50,
            border: `3px solid ${colors.primary}40`,
            background: `radial-gradient(circle, transparent, ${colors.primary}15)`,
            boxShadow: `0 0 40px ${colors.primary}60`,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}

      {/* Enhanced Click Ripple Effect - Uses immediate position */}
      {isClicking && (
        <>
          <div
            className="fixed pointer-events-none z-[9997] rounded-full border-3 animate-ping"
            style={{
              left: position.x - 20,
              top: position.y - 20,
              width: 40,
              height: 40,
              borderColor: colors.primary,
              boxShadow: `0 0 30px ${colors.primary}`,
              animationDuration: '0.5s',
            }}
          />
          <div
            className="fixed pointer-events-none z-[9997] rounded-full border-2 animate-ping"
            style={{
              left: position.x - 35,
              top: position.y - 35,
              width: 70,
              height: 70,
              borderColor: `${colors.accent}80`,
              boxShadow: `0 0 40px ${colors.accent}`,
              animationDuration: '0.7s',
              animationDelay: '0.1s',
            }}
          />
          <div
            className="fixed pointer-events-none z-[9997] rounded-full border-2 animate-ping"
            style={{
              left: position.x - 50,
              top: position.y - 50,
              width: 100,
              height: 100,
              borderColor: `${colors.secondary}60`,
              boxShadow: `0 0 50px ${colors.secondary}`,
              animationDuration: '0.9s',
              animationDelay: '0.2s',
            }}
          />
        </>
      )}

      {/* Enhanced Hover Glow Effect - Uses immediate position */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9995] rounded-full transition-all duration-200"
          style={{
            left: position.x - 40,
            top: position.y - 40,
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${colors.primary}12, transparent)`,
            filter: 'blur(20px)',
            boxShadow: `0 0 60px ${colors.primary}40`,
          }}
        />
      )}
    </>
  );
};

export default GlobalCursor; 