import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MessageSquare } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null); // 'submitting', 'success', 'error'

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {

            

            const res = await axios.post(`${API}/api/contact`, formData);

            if (res.data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission failed", error);
            setStatus('error');
            setTimeout(() => setStatus(null), 5000);
        }
    };

   const phoneNumber = '917902204570';

const message = encodeURIComponent(
  "Hi Abhinandh, I saw your portfolio and would like to connect!"
);

const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div className="py-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Get in <span className="text-gradient">Touch</span>
                </h2>
                <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Have a question or want to work together? Feel free to reach out through the form below or connect via WhatsApp.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="glass-card p-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>

                        <div className="space-y-6">
                            <a href="mailto:abhinandh_b200759cs@nitc.ac.in" className="flex items-start group">
                                <div className="p-3 bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</h4>
                                    <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors break-all">
                                        abhinandh_b200759cs@nitc.ac.in
                                    </p>
                                </div>
                            </a>

                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-start group">
                                <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-xl mr-4 group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">WhatsApp</h4>
                                    <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-green-500 transition-colors">
                                        Chat on WhatsApp
                                    </p>
                                </div>
                            </a>
                        </div>

                        <div className="mt-12">
                            <div className="inline-flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl w-full border border-slate-100 dark:border-slate-700">
                                <MessageSquare className="text-teal-500 mr-3" size={24} />
                                <span className="font-medium text-slate-700 dark:text-slate-300">Available for freelance opportunities</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-3"
                >
                    <div className="glass-card p-8">
                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-xl font-medium flex items-center">
                                Message saved and email sent successfully!
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-xl font-medium flex items-center">
                                Failed to send message. Please try again.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-medium rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all"
                            >
                                {status === 'submitting' ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send size={20} className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Contact;
