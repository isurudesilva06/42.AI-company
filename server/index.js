const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Mock database for services (in a real app, this would be a proper database)
const servicesData = {
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

// Routes

// Get all services
app.get('/api/services', (req, res) => {
  try {
    const services = Object.values(servicesData);
    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services'
    });
  }
});

// Get specific service by ID
app.get('/api/services/:id', (req, res) => {
  try {
    const service = servicesData[req.params.id];
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service'
    });
  }
});

// Handle service inquiry
app.post('/api/service-inquiry', async (req, res) => {
  try {
    const { name, email, phone, serviceType, message, budget, timeline } = req.body;

    // Validate required fields
    if (!name || !email || !serviceType || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.INQUIRY_EMAIL || process.env.EMAIL_USER,
      subject: `New Service Inquiry: ${serviceType}`,
      html: `
        <h2>New Service Inquiry</h2>
        <p><strong>Service:</strong> ${serviceType}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to client
    const confirmationOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your inquiry - Forty Two AI Horizon',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>We've received your inquiry about our <strong>${serviceType}</strong> service. Our team will review your requirements and get back to you within 24 hours.</p>
        <p>Here's a summary of your inquiry:</p>
        <ul>
          <li><strong>Service:</strong> ${serviceType}</li>
          <li><strong>Budget:</strong> ${budget || 'To be discussed'}</li>
          <li><strong>Timeline:</strong> ${timeline || 'To be discussed'}</li>
        </ul>
        <p>In the meantime, feel free to browse our other services or contact us directly if you have any urgent questions.</p>
        <p>Best regards,<br>The Forty Two AI Horizon Team</p>
      `
    };

    await transporter.sendMail(confirmationOptions);

    res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully'
    });

  } catch (error) {
    console.error('Error sending inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry'
    });
  }
});

// Handle general contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Error sending contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 