
class ProjectsService {
  constructor() {
    console.log('🔒 Projects service initialized with STATIC LOCAL DATA ONLY - No Airtable or external APIs');
  }

  async getAllProjects() {
    // ONLY return local static projects - NO external API calls
    const localProjects = this.getStaticProjects();
    console.log('🔒 Returning ONLY local manual projects - NO Airtable data');
    return localProjects;
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
        id: 'project1',
        title: 'Recip Genie',
        description: 'Recipe Genie is an AI-powered mobile app that helps users generate personalized recipes based on ingredients, cuisine, dietary preferences, and mood. With a simple and intuitive interface, it makes cooking easier, smarter, and more enjoyable for everyone—from beginners to seasoned chefs.',
        shortDescription: 'AI-powered recipe generator',
        technologies: ['React Native', 'Node.js', 'MongoDB'], // Add your actual technologies
        category: 'Mobile Development',
        status: 'Completed',
        clientName: 'Isuru',
        projectUrl: 'https://your-project-url.com',
        githubUrl: 'https://github.com/yourusername/repo',
        imageUrl: '/images/projects/project1.png',
        images: [
          { url: '/images/projects/project1.png', filename: 'main' },
        ],
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        featured: true,
        tags: ['Full-Stack', 'Responsive', 'API'], // Add relevant tags
        createdTime: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'project2',
        title: 'E-Commerce Website for a local business',
        description: 'Full-stack e-commerce platform with payment integration and admin dashboard.',
        shortDescription: 'Modern e-commerce platform with Stripe integration.',
        technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
        category: 'Web Development',
        status: 'Completed',
        clientName: 'Local Business',
        projectUrl: 'https://mybusiness.com',
        githubUrl: 'https://github.com/myusername/ecommerce',
        imageUrl: '/images/projects/project3.png',
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
      {
        id: 'project3',
        title: 'Savora',
        description: 'Savora’s web application offers a smooth and stylish way to explore our menu, book a table, and enjoy our traditional cuisine with modern convenience. From viewing delicious dishes to connecting with our chefs, everything you need is just a click away.',
        shortDescription: 'Explore our menu, reserve tables, and enjoy a seamless dining experience — all online with Savora.',
        technologies: ['HTML5', 'CSS3', 'JavaScriptB'], // Add your actual technologies
        category: 'Web Development',
        status: 'Completed',
        clientName: 'Ashan',
        imageUrl: '/images/projects/project2.png',
        images: [
          { url: '/images/projects/project2.png', filename: 'main' },
        ],
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        featured: true,
        tags: ['Full-Stack', 'Responsive', 'API'], // Add relevant tags
        createdTime: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'project4',
        title: 'Budget Buddy',
        description: 'Savora’s web application offers a smooth and stylish way to explore our menu, book a table, and enjoy our traditional cuisine with modern convenience. From viewing delicious dishes to connecting with our chefs, everything you need is just a click away.',
        shortDescription: 'Explore our menu, reserve tables, and enjoy a seamless dining experience — all online with Savora.',
        technologies: ['HTML5', 'CSS3', 'JavaScriptB'], // Add your actual technologies
        category: 'Mobile Development',
        status: 'Completed',
        clientName: 'Isuru',
        imageUrl: '/images/projects/project4.png',
        images: [
          { url: '/images/projects/project4.png', filename: 'main' },
        ],
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        featured: true,
        tags: ['Full-Stack', 'Responsive', 'API'], // Add relevant tags
        createdTime: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'project5',
        title: 'Dashboard for a clothing company',
        description: 'Savora’s web application offers a smooth and stylish way to explore our menu, book a table, and enjoy our traditional cuisine with modern convenience. From viewing delicious dishes to connecting with our chefs, everything you need is just a click away.',
        shortDescription: 'Explore our menu, reserve tables, and enjoy a seamless dining experience — all online with Savora.',
        technologies: ['HTML5', 'CSS3', 'JavaScriptB'], // Add your actual technologies
        category: 'Web Development',
        status: 'Completed',
        clientName: 'Ashan',
        imageUrl: '/images/projects/project5.png',
        images: [
          { url: '/images/projects/project5.png', filename: 'main' },
        ],
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        featured: true,
        tags: ['Full-Stack', 'Responsive', 'API'], // Add relevant tags
        createdTime: '2024-01-15T10:00:00.000Z'
      },
      
      {
        id: 'project6',
        title: 'DriveMe',
        description: 'Drive Me is a comprehensive fine management platform designed to streamline the process of issuing, managing, and paying vehicle fines in Sri Lanka. It includes a user app for payments and license oversight, a police app for recording violations and retrieving vehicle details, and a web-based admin portal for oversight and report generation — all powered by a modern stack featuring React Native, Node.js, Express, and MongoDB.',
        shortDescription: 'It lets users pay fines and check license details,Police can issue fines and view vehicle information,Admins can manage payments, users, and reports.',
        technologies: ['React Native','React,Node.js','MongoDB','Machine learning algorithm' ,'JWT'], // Add your actual technologies
        category: 'Web Development',
        status: 'Completed',
        clientName: 'Ashan',
        imageUrl: '/images/projects/project6.png',
        images: [
          { url: '/images/projects/project6.png', filename: 'main' },
        ],
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        featured: true,
        tags: ['Full-Stack', 'Responsive', 'API'], // Add relevant tags
        createdTime: '2024-01-15T10:00:00.000Z'
      }
    ]; // <- closing array here
  }
}

export default new ProjectsService();
