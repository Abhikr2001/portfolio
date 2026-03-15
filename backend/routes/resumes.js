import express from 'express';
import Resume from '../models/Resume.js';
import upload from '../config/multerConfig.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// GET all resumes
router.get('/', async (req, res) => {
    try {
        const resumes = await Resume.find().sort({ uploadedAt: -1 });
        res.json({ success: true, count: resumes.length, data: resumes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

// POST a new resume (PDF upload)
router.post('/', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        const newResume = new Resume({
            roleTitle: req.body.roleTitle,
            fileName: req.file.originalname,
            path: `resumes/${req.file.filename}`, // Include the subfolder in the path
        });

        const savedResume = await newResume.save();
        res.status(201).json({ success: true, message: 'Resume uploaded successfully', data: savedResume });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error uploading resume', error: error.message });
    }
});

// DELETE a resume by ID
router.delete('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        // Delete file from filesystem
        const filePath = path.join(process.cwd(), 'uploads', resume.path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await resume.deleteOne();
        res.json({ success: true, message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

export default router;
