import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, Calendar, X, Trash2, Book } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // New note form state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [category, setCategory] = useState('Daily Coding Notes');

    const categories = ['Daily Coding Notes', 'Trading Journal', 'Life Memories', 'Photo Gallery'];

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {

           // const res = await axios.get('https://portfolio-1-fpcy.onrender.com/api/notes');

            const res = await axios.get(`${API}/api/notes`);

            if (res.data.success) {
                setNotes(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch notes:", err);
            // Fallback to local storage if API is down
            const saved = localStorage.getItem('portfolio-notes');
            if (saved) setNotes(JSON.parse(saved));
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!title || !content) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('date', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {

            //const res = await axios.post('https://portfolio-1-fpcy.onrender.com/api/notes', formData, {

            const res = await axios.post(`${API}/api/notes`, formData, {

                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                setNotes([res.data.data, ...notes]);
                // Reset form
                setIsAdding(false);
                setTitle('');
                setContent('');
                setImageFile(null);
                setImagePreview('');
                setCategory('Daily Coding Notes');
            }
        } catch (err) {
            console.error("Failed to add note:", err);
        }
    };

    const deleteNote = async (id) => {
        try {

           

            const res = await axios.delete(`${API}/api/notes/${id}`);

            if (res.data.success) {
                setNotes(notes.filter(note => note._id !== id && note.id !== id));
            }
        } catch (err) {
            console.error("Failed to delete node:", err);
        }
    };

    return (
        <div className="py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Notes & <span className="text-gradient">Memories</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-teal-500 rounded-full mx-auto md:mx-0"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        My personal space for coding journey, trading log, and memories.
                    </p>
                </div>

                <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center px-5 py-3 bg-teal-500 text-white rounded-xl font-medium shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-colors"
                >
                    <Plus size={20} className="mr-2" />
                    Add New Note
                </button>
            </div>

            {/* Add Note Modal Modal Overlay */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Create New Entry</h3>
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-700 p-2 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddNote} className="p-6">
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Entry title..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Content</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Write your note here..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Image (Optional)</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors overflow-hidden relative">
                                                {imagePreview ? (
                                                    <div className="absolute inset-0 w-full h-full p-2">
                                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                            <p className="text-white font-medium flex items-center"><ImageIcon size={16} className="mr-2" /> Change Image</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <ImageIcon size={32} className="text-slate-400 mb-2" />
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">Click to upload image</p>
                                                    </div>
                                                )}
                                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg transition-colors"
                                    >
                                        Save Entry
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notes Masonry Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                </div>
            ) : notes.length === 0 ? (
                <div className="glass-card p-12 text-center rounded-2xl flex flex-col items-center border-dashed border-2 border-slate-300 dark:border-slate-700">
                    <Book className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-xl font-medium text-slate-600 dark:text-slate-400">No entries yet</h3>
                    <p className="text-slate-500 dark:text-slate-500 mt-2 max-w-sm mx-auto">
                        Your notes and memories will appear here. Click the "Add New Note" button to create your first entry.
                    </p>
                </div>
            ) : (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {notes.map((note) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={note._id || note.id}
                            className="glass-card overflow-hidden break-inside-avoid shadow-md hover:shadow-xl transition-all"
                        >
                            {(note.imagePath || note.image) && (
                                <div className="w-full max-h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img

                                       

                                       src={note.imagePath ? `${API}/uploads/${note.imagePath}` : note.image}

                                        alt="Note Media"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-semibold px-2 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-md">
                                        {note.category}
                                    </span>

                                    <button
                                        onClick={() => deleteNote(note._id || note.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                                    {note.title}
                                </h3>

                                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4">
                                    <Calendar size={14} className="mr-1" />
                                    {note.date || new Date(note.createdAt).toLocaleDateString()}
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
                                    {note.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notes;
