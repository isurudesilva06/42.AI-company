import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import logo from '../../public/images/projects/logo1.png';

const Footer = () => {
  const footerLinks = {
    Services: ['Web Development', 'Mobile Apps', 'Backend APIs', 'UI/UX Design'],
    Technologies: ['React & Next.js', 'Node.js', 'React Native', 'Cloud Services'],
    Company: ['About Us', 'Careers', 'Blog', 'Contact'],
    Support: ['Documentation', 'Help Center', 'Project Portal'],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-t from-black/50 to-transparent pt-20 pb-10">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src={logo}
                alt="Company Logo"
                className="h-20 w-auto"
                
              />
            </div>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Building custom software solutions that drive business growth. 
              From startups to enterprises, we turn your ideas into powerful applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:glow-blue transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 gradient-text">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>



        {/* Bottom Bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground/60 text-sm mb-4 md:mb-0 flex items-center">
            © 2024 
            <img
              src={logo}
              alt="Company Logo"
              className="h-6 w-auto mx-2"
            />
            All rights reserved. Built with passion for innovation.
          </div>
          <div className="flex items-center space-x-6 text-sm text-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
