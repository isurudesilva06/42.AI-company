export interface ServiceInquiry {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormResponse {
  success: boolean;
  message: string;
}

class FormsService {
  constructor() {
    console.log('🔒 Forms service initialized - Frontend only (Demo mode)');
  }

  async submitServiceInquiry(inquiry: ServiceInquiry): Promise<FormResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For testing purposes, we'll just log the data and return success
        console.log('📧 Service Inquiry Submitted (Demo mode):', inquiry);
        
        // You can replace this with actual email service integration like EmailJS
        alert(`Thank you ${inquiry.name}! Your inquiry for ${inquiry.serviceType} has been received. This is a demo - in production, an email would be sent.`);
        
        resolve({
          success: true,
          message: 'Inquiry submitted successfully'
        });
      }, 1000);
    });
  }

  async submitContactForm(contact: ContactForm): Promise<FormResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For testing purposes, we'll just log the data and return success
        console.log('📧 Contact Form Submitted (Demo mode):', contact);
        
        // You can replace this with actual email service integration like EmailJS
        alert(`Thank you ${contact.name}! Your message about "${contact.subject}" has been received. This is a demo - in production, an email would be sent.`);
        
        resolve({
          success: true,
          message: 'Contact form submitted successfully'
        });
      }, 1000);
    });
  }

  // Health check equivalent for frontend
  getHealthStatus(): { success: boolean; message: string; timestamp: string } {
    return {
      success: true,
      message: 'Frontend services are running',
      timestamp: new Date().toISOString()
    };
  }
}

export default new FormsService(); 