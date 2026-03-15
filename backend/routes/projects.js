import express from 'express';
import Project from '../models/Project.js';
import upload from '../config/multerConfig.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST a new project
router.post('/', upload.single('projectImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a project image' });
    }

    // Determine technologies - can be a comma-separated string or an array
    let techArray = req.body.techUsed;
    if (typeof techArray === 'string') {
      techArray = techArray.split(',').map(tech => tech.trim());
    }

    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      techUsed: techArray,
      liveDemoLink: req.body.liveDemoLink || '',
      githubRepo: req.body.githubRepo || '',
      imageUrl: `projects/${req.file.filename}`
    });

    const savedProject = await newProject.save();
    res.status(201).json({ success: true, message: 'Project added successfully', data: savedProject });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating project', error: error.message });
  }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    // Delete file from filesystem
    if (project.imageUrl) {
      const filePath = path.join(process.cwd(), 'uploads', project.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await project.deleteOne();
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

export default router;
