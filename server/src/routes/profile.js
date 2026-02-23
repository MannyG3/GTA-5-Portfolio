import express from 'express';
import Profile from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, profileSchema } from '../middleware/validation.js';

const router = express.Router();

// GET /api/profile - Get profile (public)
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    // Create default profile if none exists
    if (!profile) {
      profile = await Profile.create({
        name: 'Your Name',
        role: 'Full Stack Developer',
        location: 'Los Santos',
        bio: 'Welcome to my portfolio',
        tagline: 'Full Stack Developer | MERN | AI | Robotics',
        stats: [
          { label: 'Coding', value: 90 },
          { label: 'UI/UX', value: 75 },
          { label: 'Backend', value: 88 },
          { label: 'Problem Solving', value: 85 }
        ],
        socials: {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: '',
          email: ''
        }
      });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/profile - Update profile (admin only)
router.put('/', authMiddleware, validate(profileSchema), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
