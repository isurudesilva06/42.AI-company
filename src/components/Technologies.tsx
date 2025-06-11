
import React from 'react';

const Technologies = () => {
  const techCategories = [
    {
      title: 'Frontend Development',
      technologies: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    },
    {
      title: 'Backend Development',
      technologies: ['Node.js', 'Python', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    },
    {
      title: 'Mobile Development',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Expo'],
    },
    {
      title: 'Cloud & DevOps',
      technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    },
    {
      title: 'Tools & Testing',
      technologies: ['Jest', 'Cypress', 'Playwright', 'GitHub Actions', 'Jenkins', 'Sentry'],
    },
    {
      title: 'Design & Prototyping',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Framer', 'Principle', 'InVision'],
    },
  ];

  return (
    <section id="technologies" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Technology Stack</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            We use the latest and most reliable technologies to build robust, 
            scalable, and maintainable software solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {techCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-dark rounded-xl p-6 hover:glow-blue transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className="glass px-3 py-1 rounded-full text-sm text-foreground/80 hover:glow-purple transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Development Process */}
        <div className="glass rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-8 gradient-text">
            Our Development Process
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs' },
              { step: '02', title: 'Design', desc: 'Creating the blueprint' },
              { step: '03', title: 'Development', desc: 'Building your solution' },
              { step: '04', title: 'Deployment', desc: 'Going live & beyond' },
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col items-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 animate-pulse-glow">
                  {item.step}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-foreground/70 text-center max-w-32">{item.desc}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute left-full top-8 transform -translate-y-1/2">
                    <svg width="40" height="20" viewBox="0 0 40 20" className="text-blue-400">
                      <path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
