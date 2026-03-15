import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Database, Trash2, ShieldAlert } from 'lucide-react';
import { projectsData as fallbackData } from '../data/projects'; // Keep fallback for local/offline dev

const formatUrl = (url) => {
  if (!url) return '';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      if (res.data.success && res.data.data.length > 0) {
        setProjects(res.data.data);
      } else {
        setProjects([]);
      }
      setError(false);
    } catch (err) {
      console.error("Failed to fetch projects from DB:", err);
      setProjects(fallbackData); // Fallback if API fails
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/projects/${id}`);
      if (res.data.success) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          My <span className="text-gradient">Projects</span>
        </h2>
        <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
        <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          A showcase of my recent work focusing on modern web applications and practical development solutions.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
          <Database size={16} className="mr-2" /> 
          {error ? "Showing Static Fallback Data" : `Loaded ${projects.length} projects from database`}
        </div>
        <Link to="/admin" className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-100 transition-colors font-medium">
          Add New Project
        </Link>
      </div>

      {projects.length === 0 && !error ? (
        <div className="text-center py-20 glass-card rounded-2xl border-dashed">
          <p className="text-slate-500 dark:text-slate-400">No projects added yet.</p>
          <Link to="/admin" className="text-teal-500 hover:text-teal-600 font-medium mt-4 inline-block">
            Add your first project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project._id || project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card overflow-hidden flex flex-col h-full group shadow hover:shadow-xl transition-all relative border border-slate-200 dark:border-slate-700"
              >
                {/* Delete Button Container */}
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <button 
                     onClick={() => deleteProject(project._id || project.id)}
                     className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                     title="Delete Project"
                   >
                     <Trash2 size={16} />
                   </button>
                </div>

                {/* Project Image */}
<div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
  <img
    src={
      project.imageUrl
        ? `http://localhost:5000/uploads/${project.imageUrl}`
        : project.image
        ? project.image
        : "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    }
    alt={project.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <div className="flex space-x-3 w-full justify-end pointer-events-auto">
                      {project.githubRepo && (
                        <a href={formatUrl(project.githubRepo)} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-sm rounded-full transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a href={formatUrl(project.liveDemoLink)} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-sm rounded-full transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-teal-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.techUsed?.slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-md border border-teal-100 dark:border-teal-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techUsed?.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
                        +{project.techUsed.length - 3}
                      </span>
                    )}
                  </div>

                  {project.liveDemoLink && (
                    <a 
                      href={formatUrl(project.liveDemoLink)}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group/btn"
                    >
                      Live Demo
                      <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Projects;
