import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';

const AdminPanel = () => {
  const [statusMessage, setStatusMessage] = useState('');

  // Form states matching new schema
  const [projectData, setProjectData] = useState({ title: '', description: '', techUsed: '', liveDemoLink: '', githubRepo: '' });
  const [projectImage, setProjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectImage) {
      handleMessage('Please select a project image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('techUsed', projectData.techUsed);
    formData.append('liveDemoLink', projectData.liveDemoLink);
    formData.append('githubRepo', projectData.githubRepo);
    formData.append('projectImage', projectImage);

    try {
      const res = await axios.post('http://localhost:5000/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        handleMessage('Project added successfully!');
        setProjectData({ title: '', description: '', techUsed: '', liveDemoLink: '', githubRepo: '' });
        setProjectImage(null);
        setImagePreview('');
      }
    } catch (error) {
      handleMessage('Error adding project.');
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Project <span className="text-gradient">Management</span>
        </h2>
        <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
      </div>

      {statusMessage && (
        <div className="mb-6 p-4 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-xl text-center font-medium">
          {statusMessage}
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <div className="p-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Add New Project</h3>
          <motion.form 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleProjectSubmit} className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Name</label>
              <input type="text" required value={projectData.title} onChange={e => setProjectData({...projectData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea required rows={4} value={projectData.description} onChange={e => setProjectData({...projectData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Technologies Used (comma separated)</label>
              <input type="text" required value={projectData.techUsed} onChange={e => setProjectData({...projectData, techUsed: e.target.value})} placeholder="React, Node.js, MongoDB" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Live Demo Link</label>
                <input type="text" value={projectData.liveDemoLink} onChange={e => setProjectData({...projectData, liveDemoLink: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">GitHub Repository Link</label>
                <input type="text" value={projectData.githubRepo} onChange={e => setProjectData({...projectData, githubRepo: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Project Screenshot</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors overflow-hidden relative">
                  {imagePreview ? (
                    <div className="absolute inset-0 w-full h-full p-2">
                       <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                         <p className="text-white font-medium flex items-center"><ImageIcon size={16} className="mr-2"/> Change Image</p>
                       </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload size={32} className="text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">Click to upload screenshot</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" required className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <button type="submit" className="w-full py-3 mt-4 bg-teal-500 text-white rounded-xl font-medium shadow-lg hover:bg-teal-600 transition-colors">Add Project</button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
