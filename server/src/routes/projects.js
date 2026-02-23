import express from 'express';
import Project from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, projectSchema } from '../middleware/validation.js';

const router = express.Router();

// GET /api/projects - Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const { featured, status, limit } = req.query;
    const query = {};
    
    if (featured === 'true') query.featured = true;
    if (status) query.status = status;
    
    let projectsQuery = Project.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      projectsQuery = projectsQuery.limit(parseInt(limit));
    }
    
    const projects = await projectsQuery;
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects/:slug - Get single project by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    
    if (!project) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/projects - Create project (admin)
router.post('/', authMiddleware, validate(projectSchema), async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'A project with this title already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/projects/:id - Update project (admin)
router.put('/:id', authMiddleware, validate(projectSchema), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/projects/:id - Delete project (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Mission terminated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
