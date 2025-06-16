import projectsService, { Project } from './projectsService';
import servicesService, { Service } from './servicesService';
import formsService, { ServiceInquiry, ContactForm, FormResponse } from './formsService';

// Response wrapper to match backend API format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiService {
  constructor() {
    console.log('🚀 Frontend API Service initialized - No backend server needed!');
  }

  // Projects API
  async getProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const projects = await projectsService.getAllProjects();
      return {
        success: true,
        data: projects
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        success: false,
        message: 'Failed to fetch projects'
      };
    }
  }

  async getFeaturedProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const projects = await projectsService.getFeaturedProjects();
      return {
        success: true,
        data: projects
      };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return {
        success: false,
        message: 'Failed to fetch featured projects'
      };
    }
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    try {
      const project = await projectsService.getProjectById(id);
      if (!project) {
        return {
          success: false,
          message: 'Project not found'
        };
      }
      return {
        success: true,
        data: project
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      return {
        success: false,
        message: 'Failed to fetch project'
      };
    }
  }

  // Services API
  async getServices(): Promise<ApiResponse<Service[]>> {
    try {
      const services = await servicesService.getAllServices();
      return {
        success: true,
        data: services
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      return {
        success: false,
        message: 'Failed to fetch services'
      };
    }
  }

  async getServiceById(id: string): Promise<ApiResponse<Service>> {
    try {
      const service = await servicesService.getServiceById(id);
      if (!service) {
        return {
          success: false,
          message: 'Service not found'
        };
      }
      return {
        success: true,
        data: service
      };
    } catch (error) {
      console.error('Error fetching service:', error);
      return {
        success: false,
        message: 'Failed to fetch service'
      };
    }
  }

  // Forms API
  async submitServiceInquiry(inquiry: ServiceInquiry): Promise<ApiResponse<null>> {
    try {
      const response = await formsService.submitServiceInquiry(inquiry);
      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      console.error('Error submitting service inquiry:', error);
      return {
        success: false,
        message: 'Failed to submit inquiry'
      };
    }
  }

  async submitContactForm(contact: ContactForm): Promise<ApiResponse<null>> {
    try {
      const response = await formsService.submitContactForm(contact);
      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: 'Failed to submit contact form'
      };
    }
  }

  // Health check
  getHealthStatus(): ApiResponse<{ message: string; timestamp: string }> {
    const health = formsService.getHealthStatus();
    return {
      success: health.success,
      data: {
        message: health.message,
        timestamp: health.timestamp
      }
    };
  }
}

export default new ApiService(); 