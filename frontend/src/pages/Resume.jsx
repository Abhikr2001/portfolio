import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, Upload, Plus, X, Trash2 } from 'lucide-react';

const Resume = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [roleTitle, setRoleTitle] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/resumes');
            if (res.data.success) {
                setResumes(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch resumes:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!resumeFile || !roleTitle) return;

        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('roleTitle', roleTitle);

        try {
            const res = await axios.post('http://localhost:5000/api/resumes', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                setResumes([res.data.data, ...resumes]);
                setIsAdding(false);
                setRoleTitle('');
                setResumeFile(null);
            }
        } catch (error) {
            console.error("Error uploading resume", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/resumes/${id}`);
            if (res.data.success) {
                setResumes(resumes.filter(r => r._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete resume", error);
        }
    };

    return (
        <div className="py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Resume <span className="text-gradient">Management</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-teal-500 rounded-full mx-auto md:mx-0"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        View and manage my role-specific resumes.
                    </p>
                </div>

                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center px-5 py-3 bg-teal-500 text-white rounded-xl font-medium shadow-lg hover:bg-teal-600 transition-colors"
                >
                    <Plus size={20} className="mr-2" />
                    Add Resume
                </button>
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Upload New Resume</h3>
                                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-700 p-2 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleUpload} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role Title</label>
                                    <input
                                        type="text" required value={roleTitle} onChange={e => setRoleTitle(e.target.value)}
                                        placeholder="e.g., Frontend Developer Resume"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload size={32} className="text-slate-400 mb-3" />
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {resumeFile ? resumeFile.name : "Click to upload PDF"}
                                            </p>
                                        </div>
                                        <input type="file" accept="application/pdf" className="hidden" onChange={e => setResumeFile(e.target.files[0])} required />
                                    </label>
                                </div>

                                <button type="submit" className="w-full py-3 bg-teal-500 text-white rounded-xl font-medium shadow-lg hover:bg-teal-600 transition-colors mt-6">
                                    Save Resume
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Resumes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="col-span-full text-center py-12 glass-card border-dashed">
                        <p className="text-slate-500 dark:text-slate-400">No resumes uploaded yet.</p>
                    </div>
                ) : (
                    resumes.map((resume, idx) => (
                        <motion.div
                            key={resume._id}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-4 border-2 border-white dark:border-slate-800 shadow-sm">
                                <FileText size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{resume.roleTitle}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}</p>

                            <div className="flex flex-wrap justify-center gap-3 w-full mt-auto">
                                <a
                                    href={`http://localhost:5000/uploads/${resume.path}`} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[120px] flex items-center justify-center px-4 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white text-sm rounded-lg font-medium transition-colors"
                                >
                                    <Eye size={16} className="mr-2" /> View
                                </a>
                                <a
                                    href={`http://localhost:5000/uploads/${resume.path}`} download={resume.fileName}
                                    className="flex-1 min-w-[120px] flex items-center justify-center px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-lg font-medium transition-colors"
                                >
                                    <Download size={16} className="mr-2" /> Download
                                </a>
                                <button
                                    onClick={() => handleDelete(resume._id)}
                                    className="w-full mt-1 flex items-center justify-center px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-sm rounded-lg font-medium transition-colors border border-red-200 dark:border-red-800/50"
                                >
                                    <Trash2 size={16} className="mr-2" /> Delete Resume
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Resume;
