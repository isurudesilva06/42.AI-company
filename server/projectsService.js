// Static projects data service
class ProjectsService {
  constructor() {
    console.log('Projects service initialized with static data');
  }

  async getAllProjects() {
    return this.getStaticProjects();
  }

  async getFeaturedProjects() {
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.featured).slice(0, 6);
  }

  async getProjectById(id) {
    const allProjects = await this.getAllProjects();
    return allProjects.find(project => project.id === id) || null;
  }

  getStaticProjects() {
    return [
      // 🔥 EXAMPLE WITH LOCAL IMAGES - Replace with your actual projects:
      {
        id: 'my-project-1',
        title: 'Recip Genie',
        description: 'Recipe Genie is an AI-powered mobile app that helps users generate personalized recipes based on ingredients, cuisine, dietary preferences, and mood. With a simple and intuitive interface, it makes cooking easier, smarter, and more enjoyable for everyone—from beginners to seasoned chefs.',
        shortDescription: 'AI-powered recipe generator',
        technologies: ['React Native', 'Node.js', 'MongoDB'], // Add your actual technologies
        category: 'Web Development', // Options: 'Web Development', 'Mobile Development', 'Backend Development', 'UI/UX Design', 'DevOps'
        status: 'Completed', // Options: 'Completed', 'In Progress', 'Planning'
        clientName: 'Isuru', // Can be empty string ''
        projectUrl: 'https://your-project-url.com', // Can be empty string ''
        githubUrl: 'https://github.com/yourusername/repo', // Can be empty string ''
        
        // 🖼️ LOCAL IMAGES - Using your uploaded project1.png
        imageUrl: '/images/projects/project1.png', // Your actual project screenshot
        images: [
          { url: '/images/projects/project1.png', filename: 'main' },
          // Add more screenshots if you have them
        ],
        
        startDate: '2024-01-15', // Format: YYYY-MM-DD
        endDate: '2024-03-15', // Format: YYYY-MM-DD or null if ongoing
        featured: true, // Set to true for your best projects
        tags: ['Full-Stack', 'Responsive', 'API'], // Add relevant tags
        createdTime: '2024-01-15T10:00:00.000Z'
      },
      
      // 📝 TEMPLATE FOR MORE PROJECTS:
      /*
      {
        id: 'my-ecommerce-project',
        title: 'E-Commerce Website',
        description: 'Full-stack e-commerce platform with payment integration and admin dashboard.',
        shortDescription: 'Modern e-commerce platform with Stripe integration.',
        technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
        category: 'Web Development',
        status: 'Completed',
        clientName: 'Local Business',
        projectUrl: 'https://mybusiness.com',
        githubUrl: 'https://github.com/myusername/ecommerce',
        
        // 🖼️ LOCAL IMAGES - Copy your screenshots to public/images/projects/
        imageUrl: '/images/projects/ecommerce-main.jpg',
        images: [
          { url: '/images/projects/ecommerce-main.jpg', filename: 'homepage' },
          { url: '/images/projects/ecommerce-cart.jpg', filename: 'shopping-cart' },
          { url: '/images/projects/ecommerce-admin.jpg', filename: 'admin-panel' }
        ],
        
        startDate: '2024-02-01',
        endDate: '2024-04-15',
        featured: true,
        tags: ['E-commerce', 'Payment', 'Admin Panel'],
        createdTime: '2024-02-01T10:00:00.000Z'
      },
      */
    ];
  }
}

export default new ProjectsService(); 