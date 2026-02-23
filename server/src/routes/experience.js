import express from 'express';
import Experience from '../models/Experience.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, experienceSchema } from '../middleware/validation.js';

const router = express.Router();

// GET /api/experience - Get all experiences (public)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = {};
    
    if (type) query.type = type;
    
    const experiences = await Experience.find(query).sort({ startDate: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/experience - Create experience (admin)
router.post('/', authMiddleware, validate(experienceSchema), async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/experience/:id - Update experience (admin)
router.put('/:id', authMiddleware, validate(experienceSchema), async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/experience/:id - Delete experience (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
