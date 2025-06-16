import React, { useState } from 'react';
import { Globe, Smartphone, Database, Cloud, TestTube, Palette, CheckCircle, Star, Users, Zap, Send, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import apiService from '../lib/apiService';

const Services = () => {
  const { toast } = useToast();
  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks and optimized for performance.',
      features: ['React & Next.js', 'Full-Stack Solutions', 'Progressive Web Apps'],
      detailedDescription: 'Transform your business with cutting-edge web applications that deliver exceptional user experiences and drive growth.',
      serviceHighlights: [
        'Responsive design that works seamlessly across all devices',
        'SEO optimization for maximum online visibility',
        'Fast loading times with performance optimization',
        'Modern frameworks like React, Next.js, and Vue.js',
        'Progressive Web App capabilities for mobile-like experiences',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      deliverables: [
        'Custom web application development',
        'Responsive UI/UX design implementation',
        'API integration and backend connectivity',
        'Performance optimization and SEO',
        'Testing and quality assurance',
        'Deployment and maintenance support',
      ],
      timeline: '4-12 weeks',
      startingPrice: '$2,500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps that deliver exceptional user experiences.',
      features: ['iOS & Android', 'React Native', 'Flutter Apps'],
      detailedDescription: 'Reach your customers wherever they are with powerful mobile applications that engage users and drive business growth.',
      serviceHighlights: [
        'Cross-platform development for iOS and Android',
        'Native performance with smooth animations',
        'Offline functionality and data synchronization',
        'Push notifications and real-time updates',
        'App store optimization and deployment',
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
      deliverables: [
        'Native or cross-platform mobile app',
        'User interface and experience design',
        'Backend API development and integration',
        'Real-time features and push notifications',
        'App store submission and optimization',
        'Post-launch support and updates',
      ],
      timeline: '6-16 weeks',
      startingPrice: '$3,500',
    },
    {
      icon: Database,
      title: 'Backend & APIs',
      description: 'Robust backend systems and APIs that scale with your business needs.',
      features: ['RESTful APIs', 'GraphQL', 'Microservices'],
      detailedDescription: 'Build the foundation of your digital ecosystem with scalable backend solutions that power your applications.',
      serviceHighlights: [
        'Scalable architecture that grows with your business',
        'Secure authentication and authorization systems',
        'High-performance database optimization',
        'Real-time data processing and analytics',
        'Comprehensive API documentation and testing',
      ],
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
      deliverables: [
        'RESTful or GraphQL API development',
        'Database design and optimization',
        'Authentication and security implementation',
        'Third-party service integrations',
        'API documentation and testing',
        'Performance monitoring and scaling',
      ],
      timeline: '3-10 weeks',
      startingPrice: '$2,000',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Cloud infrastructure and CI/CD pipelines for reliable, scalable deployments.',
      features: ['AWS & Azure', 'Docker & Kubernetes', 'Automated Deployment'],
      detailedDescription: 'Streamline your development process and ensure reliable deployments with modern DevOps practices and cloud solutions.',
      serviceHighlights: [
        'Automated CI/CD pipelines for faster deployments',
        'Containerized applications with Docker and Kubernetes',
        'Cloud infrastructure setup and management',
        'Monitoring and alerting systems',
        'Cost optimization and security best practices',
      ],
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      deliverables: [
        'Cloud infrastructure setup and configuration',
        'CI/CD pipeline development and automation',
        'Containerization and orchestration',
        'Monitoring and logging implementation',
        'Security and compliance setup',
        'Documentation and team training',
      ],
      timeline: '2-8 weeks',
      startingPrice: '$1,800',
    },
    {
      icon: TestTube,
      title: 'QA & Testing',
      description: 'Comprehensive testing strategies to ensure your software works flawlessly.',
      features: ['Automated Testing', 'Quality Assurance', 'Performance Testing'],
      detailedDescription: 'Ensure your applications meet the highest quality standards with comprehensive testing strategies and quality assurance.',
      serviceHighlights: [
        'Automated test suite development and maintenance',
        'Manual testing for user experience validation',
        'Performance and load testing for scalability',
        'Security testing and vulnerability assessment',
        'Cross-browser and device compatibility testing',
      ],
      technologies: ['Jest', 'Cypress', 'Selenium', 'JMeter', 'Postman', 'SonarQube'],
      deliverables: [
        'Test strategy and planning documentation',
        'Automated test suite development',
        'Manual testing and bug reporting',
        'Performance and security testing',
        'Cross-platform compatibility testing',
        'Quality assurance reports and recommendations',
      ],
      timeline: '2-6 weeks',
      startingPrice: '$1,200',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design that combines beautiful interfaces with intuitive experiences.',
      features: ['User Research', 'Prototyping', 'Design Systems'],
      detailedDescription: 'Create exceptional user experiences with research-driven design that converts visitors into customers and delights users.',
      serviceHighlights: [
        'User research and persona development',
        'Wireframing and interactive prototyping',
        'Visual design and brand consistency',
        'Usability testing and optimization',
        'Design system creation and documentation',
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision', 'Framer'],
      deliverables: [
        'User research and analysis report',
        'Wireframes and user flow diagrams',
        'High-fidelity design mockups',
        'Interactive prototypes',
        'Design system and style guide',
        'Usability testing and optimization',
      ],
      timeline: '3-8 weeks',
      startingPrice: '$1,500',
    },
  ];

  const [selectedService, setSelectedService] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceInquiry = async (formData) => {
    setIsSubmitting(true);
    try {
      const response = await apiService.submitServiceInquiry({
        ...formData,
        serviceType: selectedService.title,
      });

      if (response.success) {
        toast({
          title: "Inquiry Sent Successfully!",
          description: "We'll get back to you within 24 hours. (Demo mode - no actual email sent)",
        });
        setShowInquiryForm(false);
        setSelectedService(null);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ServiceInquiryForm = ({ service, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      budget: '',
      timeline: '',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      onSubmit(formData);
    };

    const handleInputChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget Range</label>
            <select
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select budget range</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000 - $25,000">$10,000 - $25,000</option>
              <option value="$25,000+">$25,000+</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Timeline</label>
          <select
            value={formData.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
            className="w-full px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select timeline</option>
            <option value="ASAP (Rush job)">ASAP (Rush job)</option>
            <option value="1-2 months">1-2 months</option>
            <option value="2-3 months">2-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Details *</label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full px-3 py-2 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            placeholder="Tell us about your project requirements, goals, and any specific features you need..."
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => setShowInquiryForm(false)}
            className="flex-1 px-6 py-3 glass rounded-lg hover:bg-gray-600/20 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 glow-blue disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-magnetic"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Inquiry
              </>
            )}
          </button>
        </div>
      </form>
    );
  };

  const ServiceDetailModal = ({ service, isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark max-w-4xl max-h-[90vh] overflow-y-auto">
        {!showInquiryForm ? (
          <>
            <DialogHeader>
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-6">
                  <service.icon size={32} className="text-white" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-bold gradient-text mb-2">
                    {service.title}
                  </DialogTitle>
                  <p className="text-foreground/80 text-lg">
                    {service.detailedDescription}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Service Highlights */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Star className="mr-2 text-yellow-400" size={20} />
                    Service Highlights
                  </h3>
                  <ul className="space-y-3">
                    {service.serviceHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-3 text-green-400 flex-shrink-0 mt-1" size={16} />
                        <span className="text-foreground/80 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Zap className="mr-2 text-blue-400" size={20} />
                    Technologies We Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverables and Timeline */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Users className="mr-2 text-purple-400" size={20} />
                    What You'll Get
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-3 text-green-400 flex-shrink-0 mt-1" size={16} />
                        <span className="text-foreground/80 text-sm">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold gradient-text">{service.timeline}</p>
                      <p className="text-sm text-foreground/60">Timeline</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold gradient-text">{service.startingPrice}+</p>
                      <p className="text-sm text-foreground/60">Starting Price</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 glow-blue cursor-magnetic"
                  >
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4">
                  <service.icon size={24} className="text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold gradient-text">
                  Get Started with {service.title}
                </DialogTitle>
              </div>
              <p className="text-foreground/80">
                Tell us about your project and we'll provide you with a detailed proposal.
              </p>
            </DialogHeader>

            <ServiceInquiryForm 
              service={service}
              onSubmit={handleServiceInquiry}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            End-to-end software development services designed to bring your ideas to life 
            and scale your business to new heights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group glass-dark rounded-xl p-8 hover:glow-purple transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold gradient-text">{service.title}</h3>
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-foreground/70">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setSelectedService(service)}
                className="w-full glass px-4 py-2 rounded-lg hover:glow-blue transition-all duration-300 text-sm font-medium group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-600/20 cursor-magnetic"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Service Detail Modal */}
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => {
              setSelectedService(null);
              setShowInquiryForm(false);
            }}
          />
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Let's discuss your project requirements and create a custom solution 
              that drives your business forward.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 glow-blue cursor-magnetic">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
