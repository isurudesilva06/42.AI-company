export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  timeline: string;
  startingPrice: string;
}

class ServicesService {
  private services: Record<string, Service> = {
    'web-development': {
      id: 'web-development',
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks',
      fullDescription: 'Transform your business with cutting-edge web applications that deliver exceptional user experiences and drive growth.',
      features: [
        'Responsive design that works seamlessly across all devices',
        'SEO optimization for maximum online visibility',
        'Fast loading times with performance optimization',
        'Modern frameworks like React, Next.js, and Vue.js'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      timeline: '4-12 weeks',
      startingPrice: '$2,500'
    },
    'mobile-development': {
      id: 'mobile-development',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps',
      fullDescription: 'Reach your customers wherever they are with powerful mobile applications that engage users and drive business growth.',
      features: [
        'Cross-platform development for iOS and Android',
        'Native performance with smooth animations',
        'Offline functionality and data synchronization',
        'Push notifications and real-time updates'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
      timeline: '6-16 weeks',
      startingPrice: '$3,500'
    },
    'backend-apis': {
      id: 'backend-apis',
      title: 'Backend & APIs',
      description: 'Robust backend systems and APIs',
      fullDescription: 'Build the foundation of your digital ecosystem with scalable backend solutions that power your applications.',
      features: [
        'Scalable architecture that grows with your business',
        'Secure authentication and authorization systems',
        'High-performance database optimization',
        'Real-time data processing and analytics'
      ],
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
      timeline: '3-10 weeks',
      startingPrice: '$2,000'
    },
    'cloud-devops': {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      description: 'Cloud infrastructure and CI/CD pipelines',
      fullDescription: 'Streamline your development process and ensure reliable deployments with modern DevOps practices.',
      features: [
        'Automated CI/CD pipelines for faster deployments',
        'Containerized applications with Docker and Kubernetes',
        'Cloud infrastructure setup and management',
        'Cost optimization and security best practices'
      ],
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      timeline: '2-8 weeks',
      startingPrice: '$1,800'
    },
    'qa-testing': {
      id: 'qa-testing',
      title: 'QA & Testing',
      description: 'Comprehensive testing strategies',
      fullDescription: 'Ensure your applications meet the highest quality standards with comprehensive testing strategies.',
      features: [
        'Automated test suite development and maintenance',
        'Manual testing for user experience validation',
        'Performance and load testing for scalability',
        'Security testing and vulnerability assessment'
      ],
      technologies: ['Jest', 'Cypress', 'Selenium', 'JMeter', 'Postman', 'SonarQube'],
      timeline: '2-6 weeks',
      startingPrice: '$1,200'
    },
    'ui-ux-design': {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design solutions',
      fullDescription: 'Create exceptional user experiences with research-driven design that converts visitors into customers.',
      features: [
        'User research and persona development',
        'Wireframing and interactive prototyping',
        'Visual design and brand consistency',
        'Usability testing and optimization'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision', 'Framer'],
      timeline: '3-8 weeks',
      startingPrice: '$1,500'
    }
  };

  constructor() {
    console.log('🔒 Services service initialized with STATIC LOCAL DATA ONLY - Frontend only');
  }

  async getAllServices(): Promise<Service[]> {
    // Simulate async behavior for consistency with previous API calls
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('🔒 Returning ONLY local services data - Frontend service');
        resolve(Object.values(this.services));
      }, 100);
    });
  }

  async getServiceById(id: string): Promise<Service | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const service = this.services[id] || null;
        console.log(`🔒 Returning service by ID: ${id} - Frontend service`);
        resolve(service);
      }, 100);
    });
  }
}

export default new ServicesService(); 