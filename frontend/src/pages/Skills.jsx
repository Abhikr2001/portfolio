import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

const SkillCategory = ({ title, skills, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card p-6"
        >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                {title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, idx) => (
                    <div
                        key={idx}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700/50"
                    >
                        <span className="text-xl">{skill.logo}</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{skill.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <div className="py-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Technical <span className="text-gradient">Skills</span>
                </h2>
                <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg hover:text-teal-600 transition-colors">
                    A comprehensive overview of my technical expertise, merging development, testing methodologies, and essential modern tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkillCategory title="Frontend Development" skills={skillsData.frontend} index={0} />
                <SkillCategory title="Programming Languages" skills={skillsData.programming} index={1} />
                <SkillCategory title="Testing Concepts" skills={skillsData.testing} index={2} />
                <SkillCategory title="Essential Tools" skills={skillsData.tools} index={3} />
                <SkillCategory title="Learning / Exploring" skills={skillsData.learning} index={4} />
            </div>
        </div>
    );
};

export default Skills;
