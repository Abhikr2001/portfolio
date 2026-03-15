import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { ArrowLeft, Github, ExternalLink, Calendar, Code2 } from 'lucide-react';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find project by ID
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Project not found</h2>
                <button
                    onClick={() => navigate('/projects')}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                    Back to Projects
                </button>
            </div>
        );
    }

    return (
        <div className="py-8 max-w-4xl mx-auto">
            <Link
                to="/projects"
                className="inline-flex items-center text-slate-500 hover:text-teal-500 transition-colors mb-8"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to Projects
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 glass-card border-none shadow-xl">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                            {project.title}
                        </h1>

                        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            <p>{project.details || project.description}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
                                Project Info
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center text-slate-500 mb-2">
                                        <Code2 size={16} className="mr-2" />
                                        <span className="text-sm font-medium uppercase tracking-wider">Technologies</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 text-sm font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-md"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col space-y-3">
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-teal-500/30"
                            >
                                <ExternalLink size={18} className="mr-2" />
                                Live Demo
                            </a>
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                            >
                                <Github size={18} className="mr-2" />
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectDetail;
