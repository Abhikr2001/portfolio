import { motion } from 'framer-motion';
import { User, BookOpen, Target, Code, CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="glass-card p-8 md:p-12">
                    <div className="flex items-start mb-8">
                        <div className="p-3 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-xl mr-5 shrink-0">
                            <User size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Who I Am</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                Hello, I'm Abhinandh KR, an aspiring software developer based in Palakkad, Kerala.
                                I have a strong interest in building modern web applications and continuously learning
                                new technologies in software development.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start mb-8">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl mr-5 shrink-0">
                            <Code size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">My Focus</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                My primary focus is frontend development using React and modern JavaScript frameworks,
                                where I enjoy creating responsive and user-friendly interfaces. I also have an interest
                                in software testing concepts and quality assurance practices to ensure reliable and
                                efficient applications.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-xl mr-5 shrink-0">
                            <Target size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">My Goals</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                I enjoy solving problems, learning new tools, and improving my technical skills through
                                practical projects. Currently, I am expanding my knowledge in web development, testing
                                methodologies, and development tools while building real-world applications.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <div className="glass-card p-6 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-4 border border-teal-200 dark:border-teal-800">
                            <CheckCircle size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quality Driven</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                            Combining development with QA methodologies to build robust solutions.
                        </p>
                    </div>
                    <div className="glass-card p-6 flex flex-col justify-center items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-800">
                            <BookOpen size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Continuous Learner</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                            Always expanding my toolkit with the latest modern web technologies.
                        </p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default About;
