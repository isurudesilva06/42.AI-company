
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Ready to turn your idea into reality? Let's discuss your project 
            and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center glass-dark rounded-lg p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-foreground/70">silvaisuru90@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center glass-dark rounded-lg p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-foreground/70">+94 76 7711545</div>
                </div>
              </div>

              <div className="flex items-center glass-dark rounded-lg p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-foreground/70">San Francisco, CA</div>
                </div>
              </div>

              <div className="flex items-center glass-dark rounded-lg p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">Free Consultation</div>
                  <div className="text-foreground/70">Book a 30-min call</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4 gradient-text">Why Work With Us?</h4>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                  Experienced full-stack development team
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                  Agile development with regular updates
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                  Post-launch support and maintenance
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                  Transparent pricing and communication
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-dark rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  >
                    <option value="">Select project type</option>
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="mvp">MVP Development</option>
                    <option value="enterprise">Enterprise Solution</option>
                    <option value="consulting">Technical Consulting</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                >
                  <option value="">Select budget range</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-100k">$50k - $100k</option>
                  <option value="100k+">$100k+</option>
                  <option value="discuss">Let's discuss</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 glow-blue flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
