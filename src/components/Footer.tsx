
import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Services: ['Web Development', 'Mobile Apps', 'Backend APIs', 'UI/UX Design'],
    Technologies: ['React & Next.js', 'Node.js', 'React Native', 'Cloud Services'],
    Company: ['About Us', 'Careers', 'Blog', 'Contact'],
    Support: ['Documentation', 'Help Center', 'Project Portal', 'Status'],
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
            <div className="text-3xl font-bold mb-4">
              <span className="gradient-text">42.ai</span>
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

        {/* Newsletter Signup */}
        <div className="glass rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 gradient-text">Stay Updated</h3>
              <p className="text-foreground/70">
                Get development insights, project updates, and exclusive content 
                delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 glow-blue">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground/60 text-sm mb-4 md:mb-0">
            © 2024 42.ai. All rights reserved. Built with passion for innovation.
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
