import React, { useState, useEffect } from 'react';
import apiService from '../lib/apiService';
import { Project } from '../lib/projectsService';
import { Service } from '../lib/servicesService';

const DemoUsage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load projects
      const projectsResponse = await apiService.getProjects();
      if (projectsResponse.success && projectsResponse.data) {
        setProjects(projectsResponse.data);
      }

      // Load services
      const servicesResponse = await apiService.getServices();
      if (servicesResponse.success && servicesResponse.data) {
        setServices(servicesResponse.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const handleServiceInquiry = async () => {
    const inquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      serviceType: 'Web Development',
      message: 'I need a website for my business',
      budget: '$5000',
      timeline: '2 months'
    };

    const response = await apiService.submitServiceInquiry(inquiry);
    console.log('Service inquiry response:', response);
  };

  const handleContactForm = async () => {
    const contact = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your services'
    };

    const response = await apiService.submitContactForm(contact);
    console.log('Contact form response:', response);
  };

  if (loading) {
    return <div className="p-4">Loading data from frontend services...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Frontend Services Demo</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects ({projects.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 6).map((project) => (
            <div key={project.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{project.shortDescription}</p>
              <p className="text-xs text-gray-500">Client: {project.clientName}</p>
              <div className="mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Services ({services.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.slice(0, 4).map((service) => (
            <div key={service.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
              <p className="text-sm font-medium text-green-600">{service.startingPrice}</p>
              <p className="text-xs text-gray-500">Timeline: {service.timeline}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Form Testing</h2>
        <div className="space-x-4">
          <button
            onClick={handleServiceInquiry}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Service Inquiry
          </button>
          <button
            onClick={handleContactForm}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Contact Form
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          These buttons will show demo alerts instead of sending actual emails.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">✅ Migration Complete!</h3>
        <p className="text-green-700">
          All backend functionality has been successfully moved to the frontend. 
          Your app now runs entirely client-side without needing a separate server.
        </p>
        <ul className="mt-2 text-sm text-green-600 space-y-1">
          <li>• Projects data: ✅ Available frontend-only</li>
          <li>• Services data: ✅ Available frontend-only</li>
          <li>• Form handling: ✅ Demo mode (alerts instead of emails)</li>
          <li>• No backend server required: ✅</li>
        </ul>
      </div>
    </div>
  );
};

export default DemoUsage; 