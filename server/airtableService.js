import Airtable from 'airtable';

class AirtableService {
  constructor() {
    this.base = null;
    this.init();
  }

  init() {
    try {
      if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
        console.warn('Airtable credentials not found in environment variables');
        return;
      }

      Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: process.env.AIRTABLE_API_KEY
      });

      this.base = Airtable.base(process.env.AIRTABLE_BASE_ID);
      console.log('Airtable service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Airtable service:', error);
    }
  }

  async getAllProjects() {
    if (!this.base) {
      console.error('Airtable not initialized. Please configure AIRTABLE_API_KEY and AIRTABLE_BASE_ID in your .env file');
      console.log('Falling back to sample data for now...');
      return this.getSampleProjects();
    }

    try {
      const tableName = process.env.AIRTABLE_TABLE_NAME || 'Projects';
      const records = await this.base(tableName).select({
        // You can add filters, sorting, etc. here
        view: 'Grid view',
        sort: [{ field: 'Created', direction: 'desc' }]
      }).all();

      const projects = records.map(record => ({
        id: record.id,
        title: record.get('Title') || 'Untitled Project',
        description: record.get('Description') || '',
        shortDescription: record.get('Short Description') || record.get('Description')?.substring(0, 150) + '...' || '',
        technologies: this.parseTechnologies(record.get('Technologies') || record.get('Tech Stack')),
        category: record.get('Category') || 'Web Development',
        status: record.get('Status') || 'Completed',
        clientName: record.get('Client Name') || record.get('Client') || '',
        projectUrl: record.get('Project URL') || record.get('Link') || '',
        githubUrl: record.get('GitHub URL') || record.get('GitHub') || '',
        imageUrl: record.get('Image URL') || record.get('Image')?.[0]?.url || '',
        images: this.parseImages(record.get('Image') || record.get('Images')),
        startDate: record.get('Start Date') || null,
        endDate: record.get('End Date') || null,
        featured: record.get('Featured') || false,
        tags: this.parseTags(record.get('Tags')),
        createdTime: record.get('Created') || record._rawJson.createdTime
      }));

      return projects;
    } catch (error) {
      console.error('Error fetching projects from Airtable:', error);
      console.log('Falling back to sample data...');
      return this.getSampleProjects();
    }
  }

  async getFeaturedProjects() {
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.featured).slice(0, 6);
  }

  async getProjectById(id) {
    if (!this.base) {
      throw new Error('Airtable credentials not configured. Please check your .env file.');
    }

    try {
      const tableName = process.env.AIRTABLE_TABLE_NAME || 'Projects';
      const record = await this.base(tableName).find(id);
      
      return {
        id: record.id,
        title: record.get('Title') || 'Untitled Project',
        description: record.get('Description') || '',
        shortDescription: record.get('Short Description') || record.get('Description')?.substring(0, 150) + '...' || '',
        technologies: this.parseTechnologies(record.get('Technologies') || record.get('Tech Stack')),
        category: record.get('Category') || 'Web Development',
        status: record.get('Status') || 'Completed',
        clientName: record.get('Client Name') || record.get('Client') || '',
        projectUrl: record.get('Project URL') || record.get('Link') || '',
        githubUrl: record.get('GitHub URL') || record.get('GitHub') || '',
        imageUrl: record.get('Image URL') || record.get('Image')?.[0]?.url || '',
        images: this.parseImages(record.get('Image') || record.get('Images')),
        startDate: record.get('Start Date') || null,
        endDate: record.get('End Date') || null,
        featured: record.get('Featured') || false,
        tags: this.parseTags(record.get('Tags')),
        createdTime: record.get('Created') || record._rawJson.createdTime
      };
    } catch (error) {
      console.error('Error fetching project by ID from Airtable:', error);
      return null;
    }
  }

  parseTechnologies(technologies) {
    if (!technologies) return [];
    if (Array.isArray(technologies)) return technologies;
    if (typeof technologies === 'string') {
      return technologies.split(',').map(tech => tech.trim());
    }
    return [];
  }

  parseTags(tags) {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      return tags.split(',').map(tag => tag.trim());
    }
    return [];
  }

  parseImages(images) {
    if (!images) return [];
    if (Array.isArray(images)) {
      return images.map(img => ({
        url: img.url || img,
        filename: img.filename || 'image'
      }));
    }
    return [];
  }

  getSampleProjects() {
    return [
      {
        id: 'sample-1',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.',
        shortDescription: 'Modern e-commerce platform with advanced features and seamless user experience.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        category: 'Web Development',
        status: 'Completed',
        clientName: 'RetailCorp',
        projectUrl: 'https://example-ecommerce.com',
        githubUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        images: [
          { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800', filename: 'main' },
          { url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800', filename: 'dashboard' }
        ],
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        featured: true,
        tags: ['E-commerce', 'Full-Stack', 'Payment Gateway'],
        createdTime: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'sample-2',
        title: 'Task Management App',
        description: 'Cross-platform mobile application for task management with real-time collaboration features, built using React Native and Firebase.',
        shortDescription: 'Mobile task management app with real-time collaboration.',
        technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications'],
        category: 'Mobile Development',
        status: 'Completed',
        clientName: 'ProductiveTech',
        projectUrl: '',
        githubUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
        images: [
          { url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800', filename: 'app-preview' }
        ],
        startDate: '2024-02-01',
        endDate: '2024-04-01',
        featured: true,
        tags: ['Mobile', 'Productivity', 'Real-time'],
        createdTime: '2024-02-01T10:00:00.000Z'
      },
      {
        id: 'sample-3',
        title: 'AI Analytics Dashboard',
        description: 'Advanced analytics dashboard with AI-powered insights for business intelligence, featuring data visualization, predictive analytics, and automated reporting.',
        shortDescription: 'AI-powered analytics dashboard for business intelligence.',
        technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
        category: 'Web Development',
        status: 'In Progress',
        clientName: 'DataCorp',
        projectUrl: '',
        githubUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        images: [
          { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', filename: 'dashboard' }
        ],
        startDate: '2024-03-01',
        endDate: null,
        featured: false,
        tags: ['AI', 'Analytics', 'Dashboard'],
        createdTime: '2024-03-01T10:00:00.000Z'
      }
    ];
  }
}

export default new AirtableService(); 