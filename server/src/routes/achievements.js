import express from 'express';
import Achievement from '../models/Achievement.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, achievementSchema } from '../middleware/validation.js';

const router = express.Router();

// GET /api/achievements - Get all achievements (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = {};
    
    if (category) query.category = category;
    
    const achievements = await Achievement.find(query).sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/achievements - Create achievement (admin)
router.post('/', authMiddleware, validate(achievementSchema), async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/achievements/:id - Update achievement (admin)
router.put('/:id', authMiddleware, validate(achievementSchema), async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/achievements/:id - Delete achievement (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
