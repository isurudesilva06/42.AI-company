import Spline from '@splinetool/react-spline';
import { ArrowRight, Code, Calendar, Phone, Mail, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import logo from '../../public/images/projects/logo1.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bgColor, setBgColor] = useState({ r: 15, g: 23, b: 42 }); // slate-900 base
  const [particles, setParticles] = useState([]);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationFormData, setConsultationFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeframe: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual booking system integration
      console.log('Consultation booking:', consultationFormData);
      
      // Here you would integrate with:
      // - Calendly API
      // - Google Calendar API
      // - Your own booking system
      // - Email service like EmailJS
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      alert('Thank you! Your consultation request has been submitted. We\'ll contact you within 24 hours to schedule your free consultation.');
      
      // Reset form
      setConsultationFormData({
        name: '', email: '', phone: '', company: '', projectType: '',
        budget: '', timeframe: '', message: '', preferredDate: '', preferredTime: ''
      });
      setIsConsultationModalOpen(false);
    } catch (error) {
      alert('Sorry, there was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConsultationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setConsultationFormData({
      ...consultationFormData,
      [e.target.name]: e.target.value,
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="max-w-6xl mx-auto">
          {/* Company Logo */}
          <div className="mb-8">
            
          </div>

          {/* Hero Badge */}
          <div className="inline-flex items-center bg-black/30 px-6 py-3 rounded-full mb-10 border border-white/20">
            <Code size={20} className="mr-3 text-blue-400" />
            <span className="text-base font-medium text-white">✨ Building Software That Builds Businesses</span>
          </div>

<div style={{ position: 'fixed', left: '-20px', top: '-20px' }}>
  <img src={logo} alt="Logo" style={{ width: '600px' }} />
</div>


          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Custom Software.</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Built Right.</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Delivered Fast.</span>
          </h1>

          {/* Subheading */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-white mb-10 max-w-4xl mx-auto leading-relaxed">
            From startup MVPs to enterprise solutions - we craft custom web and mobile applications 
            that drive real business growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-20">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 sm:px-8 md:px-10 sm:py-5 rounded-lg font-semibold text-white text-base sm:text-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Calendar size={20} className="sm:hidden" />
                Book Free Consultation
                <ArrowRight size={20} className="sm:size-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <a 
              href="#projects"
              className="w-full sm:w-auto bg-white/20 border border-white/30 px-6 py-4 sm:px-8 md:px-10 sm:py-5 rounded-lg font-semibold text-white text-base sm:text-lg hover:bg-white/30 transition-all duration-300 inline-block cursor-pointer text-center"
            >
              See Our Work
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="bg-black/30 border border-white/20 rounded-lg p-8 hover:bg-black/40 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">15+</div>
              <div className="text-white/80 text-lg">Projects Delivered</div>
            </div>
            <div className="bg-black/30 border border-white/20 rounded-lg p-8 hover:bg-black/40 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">98%</div>
              <div className="text-white/80 text-lg">Client Satisfaction</div>
            </div>
            <div className="bg-black/30 border border-white/20 rounded-lg p-8 hover:bg-black/40 transition-all duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3">24/7</div>
              <div className="text-white/80 text-lg">Development Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Object positioned to the right of centered content - Extra large (1200px) */}
      <div 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[1200px] h-[1200px] z-5 pointer-events-none"
        style={{
          position: 'absolute',
          right: '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '1200px',
          height: '1200px',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <Spline 
          scene="https://prod.spline.design/3t9YQABaxGM88EUN/scene.splinecode"
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Consultation Booking Modal */}
      <Dialog open={isConsultationModalOpen} onOpenChange={setIsConsultationModalOpen}>
        <DialogContent className="glass-dark max-w-2xl max-h-[90vh] overflow-y-auto border-white/20">
          <DialogHeader>
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4">
                <Calendar size={24} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold gradient-text text-left">
                  Book Your Free Consultation
                </DialogTitle>
                <DialogDescription className="text-foreground/70 text-left">
                  Let's discuss your project and explore how we can help bring your vision to life.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleConsultationSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="consultName" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="consultName"
                  name="name"
                  value={consultationFormData.name}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="consultEmail" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="consultEmail"
                  name="email"
                  value={consultationFormData.email}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="consultPhone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="consultPhone"
                  name="phone"
                  value={consultationFormData.phone}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="consultCompany" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="consultCompany"
                  name="company"
                  value={consultationFormData.company}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  placeholder="Your Company"
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="consultProjectType" className="block text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="consultProjectType"
                  name="projectType"
                  value={consultationFormData.projectType}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  required
                >
                  <option value="">Select project type</option>
                  <option value="web-app">Web Application</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="mvp">MVP Development</option>
                  <option value="enterprise">Enterprise Solution</option>
                  <option value="ecommerce">E-commerce Platform</option>
                  <option value="consulting">Technical Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="consultBudget" className="block text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  id="consultBudget"
                  name="budget"
                  value={consultationFormData.budget}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                >
                  <option value="">Select budget range</option>
                  <option value="5k-15k">$5k - $15k</option>
                  <option value="15k-30k">$15k - $30k</option>
                  <option value="30k-50k">$30k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k+">$100k+</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="consultTimeframe" className="block text-sm font-medium mb-2">
                Project Timeframe
              </label>
              <select
                id="consultTimeframe"
                name="timeframe"
                value={consultationFormData.timeframe}
                onChange={handleConsultationFormChange}
                className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              >
                <option value="">Select timeframe</option>
                <option value="asap">ASAP</option>
                <option value="1-3months">1-3 months</option>
                <option value="3-6months">3-6 months</option>
                <option value="6-12months">6-12 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            {/* Preferred Consultation Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="consultDate" className="block text-sm font-medium mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="consultDate"
                  name="preferredDate"
                  value={consultationFormData.preferredDate}
                  onChange={handleConsultationFormChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="consultTime" className="block text-sm font-medium mb-2">
                  Preferred Time
                </label>
                <select
                  id="consultTime"
                  name="preferredTime"
                  value={consultationFormData.preferredTime}
                  onChange={handleConsultationFormChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                >
                  <option value="">Select time</option>
                  <option value="9-10am">9:00 AM - 10:00 AM</option>
                  <option value="10-11am">10:00 AM - 11:00 AM</option>
                  <option value="11-12pm">11:00 AM - 12:00 PM</option>
                  <option value="1-2pm">1:00 PM - 2:00 PM</option>
                  <option value="2-3pm">2:00 PM - 3:00 PM</option>
                  <option value="3-4pm">3:00 PM - 4:00 PM</option>
                  <option value="4-5pm">4:00 PM - 5:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="consultMessage" className="block text-sm font-medium mb-2">
                Tell us about your project
              </label>
              <textarea
                id="consultMessage"
                name="message"
                value={consultationFormData.message}
                onChange={handleConsultationFormChange}
                rows={4}
                className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none"
                placeholder="Describe your project, goals, and any specific requirements..."
              />
            </div>

            {/* Information Box */}
            <div className="glass rounded-lg p-4 border border-blue-400/20">
              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">What to Expect</h4>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• 30-minute consultation call</li>
                    <li>• Project scope and requirements discussion</li>
                    <li>• Technology recommendations</li>
                    <li>• Timeline and budget estimation</li>
                    <li>• No obligation - completely free</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking Consultation...
                  </>
                ) : (
                  <>
                    <Calendar size={16} className="mr-2" />
                    Book Free Consultation
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={scrollToContact}
                className="glass border-white/30 hover:bg-white/10 text-white"
              >
                <Mail size={16} className="mr-2" />
                Or Contact Us
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;


