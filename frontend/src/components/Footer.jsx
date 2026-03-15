import { Github, Linkedin, Instagram, Code } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto glass border-t-0 border-slate-200 dark:border-slate-800 py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                        &copy; {currentYear} Abhinandh KR. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-6 mb-4 md:mb-0">
                    <a href="https://github.com/Abhikr2001" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        <span className="sr-only">GitHub</span>
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/abhinandhkr/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin size={20} />
                    </a>
                    <a href="https://www.instagram.com/_abhinandhkr/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        <span className="sr-only">Instagram</span>
                        <Instagram size={20} />
                    </a>
                    <a href="https://fyers.in/web/markets/home" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                        <span className="sr-only">Fyers</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                        >
                            <path d="M3 3v18h18" />
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                        </svg>
                    </a>
                </div>

                <div className="flex items-center text-slate-500 dark:text-slate-500 text-sm">
                    <span>Built with</span>
                    <Code size={14} className="mx-1.5 text-teal-500" />
                    <span>React & Tailwind</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
