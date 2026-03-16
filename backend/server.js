import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import Routes
import projectRoutes from './routes/projects.js';
import resumeRoutes from './routes/resumes.js';
import noteRoutes from './routes/notes.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://portfolio-rust-iota-62.vercel.app"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.use(express.json());

// Main route
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Prefix API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/contact', contactRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log('MongoDB connection error:', error.message));
