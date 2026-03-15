import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, MapPin, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import me from '../assets/me.png';
const Home = () => {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column - Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="order-2 lg:order-1"
                >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        <span>Available for new opportunities</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                        Hi, I'm <br />
                        <span className="text-gradient">Abhinandh KR</span>
                    </h1>

                    <h2 className="text-2xl sm:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-6">
                        Software Developer
                    </h2>

                    <div className="flex items-center text-slate-500 dark:text-slate-400 mb-6">
                        <MapPin size={20} className="mr-2 text-teal-500" />
                        <span>Palakkad, Kerala, India</span>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
                        Aspiring Software Developer focused on building modern web applications and exploring software testing practices.
                    </p>

                    <div className="flex flex-wrap gap-4 items-center">
                        <Link to="/resume" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            <Download size={20} className="mr-2" />
                            View Resume
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-xl text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1">
                            Contact Me
                            <ChevronRight size={20} className="ml-1" />
                        </Link>
                    </div>

                    <div className="mt-10 flex space-x-5">
                        <a href="https://github.com/Abhikr2001" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-transform hover:-translate-y-1">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/abhinandhkr/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-transform hover:-translate-y-1">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://www.instagram.com/_abhinandhkr/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-transform hover:-translate-y-1">
                            <Instagram size={24} />
                        </a>
                        <a href="https://fyers.in/web/markets/home" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-transform hover:-translate-y-1 flex items-center justify-center">
                            {/* Fyers custom tiny icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                <path d="M3 3v18h18" />
                                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                            </svg>
                        </a>
                    </div>
                </motion.div>

                {/* Right Column - Image/Graphic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="order-1 lg:order-2 flex justify-center lg:justify-end"
                >
                    <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-blue-500 rounded-full blur-3xl opacity-30 dark:opacity-20 animate-pulse"></div>
                        <div className="relative h-full w-full rounded-full border-2 border-white/50 dark:border-white/10 p-2 glass-card">
                            <div className="h-full w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                                {/* Fallback pattern if no image */}
                                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNjdXJyZW50Q29sb3IiLz48L3N2Zz4=')] pattern-dots"></div>
                                {/* Image Placeholder - User can replace with actual image later in public/ */}
                                <img
                                    src={me}
                                   // src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=600&auto=format&fit=crop"
                                    alt="Abhinandh KR"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -top-4 -left-4 glass px-4 py-2 rounded-xl flex items-center space-x-2"
                        >
                            <span className="text-2xl">⚡</span>
                            <span className="font-semibold text-slate-800 dark:text-white text-sm">React JS</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-xl flex items-center space-x-2"
                        >
                            <span className="text-2xl">🐞</span>
                            <span className="font-semibold text-slate-800 dark:text-white text-sm">QA Testing</span>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Home;
