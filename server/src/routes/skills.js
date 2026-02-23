import express from 'express';
import Skill from '../models/Skill.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, skillSchema } from '../middleware/validation.js';

const router = express.Router();

// GET /api/skills - Get all skills (public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/skills - Create skill (admin)
router.post('/', authMiddleware, validate(skillSchema), async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/skills/:id - Update skill (admin)
router.put('/:id', authMiddleware, validate(skillSchema), async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/skills/:id - Delete skill (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
