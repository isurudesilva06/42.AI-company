import Spline from '@splinetool/react-spline';
import { ArrowRight, Code } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState({ r: 15, g: 23, b: 42 }); // slate-900 base
  const [particles, setParticles] = useState([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Initialize particles
    const initParticles = [];
    for (let i = 0; i < 8; i++) {
      initParticles.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight / 2,
        size: Math.random() * 2 + 3,
      });
    }
    setParticles(initParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Smooth background color changes
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const r = Math.floor(15 + x * 30);
      const g = Math.floor(23 + y * 40);
      const b = Math.floor(42 + (x + y) * 25);
      
      setBgColor({ r, g, b });

      // Update particle targets - closer to mouse for better following
      setParticles(prev => prev.map((particle, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const distance = 30 + i * 15; // Reduced distance for closer following
        const targetX = e.clientX + Math.cos(angle) * distance;
        const targetY = e.clientY + Math.sin(angle) * distance;
        
        return {
          ...particle,
          targetX,
          targetY,
        };
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth animation using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + (particle.targetX - particle.x) * 0.25, // Faster interpolation
        y: particle.y + (particle.targetY - particle.y) * 0.25,
      })));
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background with smooth color transitions */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgb(${bgColor.r + 20}, ${bgColor.g + 30}, ${bgColor.b + 40}) 0%, 
            rgb(${bgColor.r + 10}, ${bgColor.g + 15}, ${bgColor.b + 25}) 25%, 
            rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b}) 50%, 
            rgb(${Math.max(bgColor.r - 5, 10)}, ${Math.max(bgColor.g - 10, 15)}, ${Math.max(bgColor.b - 15, 30)}) 100%)`
        }}
      />

      {/* Smooth Mouse Interactive Layer */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Primary mouse glow */}
        <div 
          className="absolute w-60 h-60 rounded-full transition-all duration-150 ease-out"
          style={{
            left: mousePosition.x - 120,
            top: mousePosition.y - 120,
            background: `radial-gradient(circle, 
              rgba(59, 130, 246, 0.2) 0%, 
              rgba(147, 51, 234, 0.15) 40%, 
              transparent 70%)`,
            filter: 'blur(25px)',
            transform: 'translateZ(0)',
          }}
        />

        {/* Interactive following particles */}
        {particles.map((particle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - mousePosition.x, 2) + 
            Math.pow(particle.y - mousePosition.y, 2)
          );
          const maxDistance = 100;
          const influence = Math.max(0, 1 - distance / maxDistance);
          
          return (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.x - particle.size / 2,
                top: particle.y - particle.size / 2,
                width: particle.size + influence * 6,
                height: particle.size + influence * 6,
                background: `rgba(59, 130, 246, ${0.7 + influence * 0.3})`,
                boxShadow: `0 0 ${10 + influence * 20}px rgba(59, 130, 246, ${0.6 + influence * 0.4})`,
                transform: `translateZ(0) scale(${1 + influence * 0.8})`,
                transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
              }}
            />
          );
        })}

        {/* Central cursor point */}
        <div 
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
            background: 'rgba(59, 130, 246, 1)',
            boxShadow: '0 0 12px rgba(59, 130, 246, 0.9)',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Content Overlay - Original centered position */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center bg-black/30 px-4 py-2 rounded-full mb-8 border border-white/20">
            <Code size={16} className="mr-2 text-blue-400" />
            <span className="text-sm font-medium text-white">✨ Building Software That Builds Businesses</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Custom Software.</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Built Right.</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Delivered Fast.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            From startup MVPs to enterprise solutions - we craft custom web and mobile applications 
            that drive real business growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2">
              Book Free Consultation
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/20 border border-white/30 px-8 py-4 rounded-lg font-semibold text-white hover:bg-white/30 transition-all duration-300">
              See Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-black/30 border border-white/20 rounded-lg p-6 hover:bg-black/40 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80">Projects Delivered</div>
            </div>
            <div className="bg-black/30 border border-white/20 rounded-lg p-6 hover:bg-black/40 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-white/80">Client Satisfaction</div>
            </div>
            <div className="bg-black/30 border border-white/20 rounded-lg p-6 hover:bg-black/40 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Development Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Object positioned to the right of centered content - Extra large (1200px) */}
      <div 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[1200px] h-[1200px] z-5"
        style={{
          position: 'absolute',
          right: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '1200px',
          height: '1200px',
          overflow: 'hidden'
        }}
      >
        <Spline scene="https://prod.spline.design/3t9YQABaxGM88EUN/scene.splinecode" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


