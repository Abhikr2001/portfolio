import express from 'express';
import Note from '../models/Note.js';
import upload from '../config/multerConfig.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json({ success: true, count: notes.length, data: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

// POST a new note (with optional image upload)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            date: req.body.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            imagePath: req.file ? `images/${req.file.filename}` : null
        });

        const savedNote = await newNote.save();
        res.status(201).json({ success: true, message: 'Note added successfully', data: savedNote });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error adding note', error: error.message });
    }
});

// DELETE a note by ID
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        // Delete associated image if it exists
        if (note.imagePath) {
            const filePath = path.join(process.cwd(), 'uploads', note.imagePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await note.deleteOne();
        res.json({ success: true, message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});

export default router;
