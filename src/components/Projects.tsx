import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Calendar, Tag, Filter, X, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  category: string;
  status: string;
  clientName: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  images: { url: string; filename: string }[];
  startDate?: string;
  endDate?: string;
  featured: boolean;
  tags: string[];
  createdTime: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Backend Development', 'DevOps'];
  const statuses = ['All', 'Completed', 'In Progress', 'Planning'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, selectedCategory, selectedStatus]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Only fetch from local backend - NO EXTERNAL DATA SOURCES
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error(`Backend not available: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        // Ensure we only use local project data
        setProjects(data.data);
        setError(null);
        console.log('✅ Projects loaded from LOCAL BACKEND ONLY - No Airtable');
      } else {
        throw new Error('Invalid data format from local backend');
      }
    } catch (err) {
      // NO FALLBACK TO EXTERNAL SOURCES - ONLY LOCAL DATA
      setError('❌ Local backend server is not running. Please run "npm run dev". NO EXTERNAL DATA SOURCES (including Airtable) will be used.');
      setProjects([]); // Clear any existing data
      console.error('❌ LOCAL BACKEND CONNECTION FAILED - NO AIRTABLE FALLBACK:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const ProjectModal = ({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="glass-dark rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-2">{project.title}</h2>
              <p className="text-foreground/60">{project.clientName}</p>
            </div>
            <button
              onClick={onClose}
              className="glass p-2 rounded-lg hover:glow-blue transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          {project.imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Project Details</h3>
                <p className="text-foreground/80 leading-relaxed">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.tags.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass rounded-full text-xs font-medium flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3">Project Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Category:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Status:</span>
                    <span className={`font-medium px-2 py-1 rounded text-xs ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  {project.startDate && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Started:</span>
                      <span className="font-medium">{formatDate(project.startDate)}</span>
                    </div>
                  )}
                  {project.endDate && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Completed:</span>
                      <span className="font-medium">{formatDate(project.endDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 glass px-4 py-3 rounded-lg font-semibold hover:glow-blue transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Explore our portfolio of successful projects and see how we've helped 
              businesses transform their ideas into reality.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" size={24} />
              <span className="text-lg">Loading projects...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Explore our portfolio of successful projects and see how we've helped 
              businesses transform their ideas into reality.
            </p>
          </div>
          <div className="text-center py-20">
            <div className="glass-dark rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4 text-red-400">Unable to load projects</h3>
              <p className="text-foreground/60 mb-4">{error}</p>
              <button
                onClick={fetchProjects}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped 
            businesses transform their ideas into reality.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-foreground/60" />
            <span className="text-sm text-foreground/60">Filter by:</span>
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="glass px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="glass px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass-dark rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">No projects found</h3>
              <p className="text-foreground/60">Try adjusting your filters to see more projects.</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group glass-dark rounded-xl overflow-hidden hover:glow-purple transition-all duration-500 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.imageUrl && (
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-xs font-bold text-black">
                        Featured
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold gradient-text group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 glass rounded text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {project.startDate ? formatDate(project.startDate) : 'TBD'}
                    </div>
                    <div className="text-xs bg-gradient-to-r from-blue-500/10 to-purple-600/10 px-2 py-1 rounded">
                      {project.category}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.projectUrl && (
                      <button className="flex-1 glass px-3 py-2 rounded text-xs font-medium hover:glow-blue transition-all duration-300 flex items-center justify-center gap-1">
                        <ExternalLink size={12} />
                        Live
                      </button>
                    )}
                    {project.githubUrl && (
                      <button className="flex-1 glass px-3 py-2 rounded text-xs font-medium hover:glow-blue transition-all duration-300 flex items-center justify-center gap-1">
                        <Github size={12} />
                        Code
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects; 