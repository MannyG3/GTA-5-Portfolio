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
        name: 'Mayur Mahadev Gund',
        role: 'Full Stack Developer & Training & Placement Officer',
        location: 'Pune (The "Los Santos" of Tech)',
        bio: `The Specialist

Operating out of the AIML Department, Mayur isn't just managing the lab; he's the "Mastermind" behind the infrastructure. As a Training and Placement Officer, he's the one who scouts the talent and sets up the "heists"—connecting high-potential developers with top-tier industry players.

When he isn't optimizing Full Stack architectures or securing the network, he's deep into Ethical Hacking and Cyber Security. Much like a high-level character in Los Santos, he lives by the Atomic Habits code: constant improvement, tactical precision, and a relentless focus on the next big "mission".

Special Ability: "Tactical Scaling" — The ability to move from high-level management to deep-code execution instantly.`,
        tagline: 'Available for High-Stakes Projects',
        stats: [
          { label: 'Full Stack Development Expert', value: 100 },
          { label: 'Placement & Strategy Mastermind', value: 95 },
          { label: 'Cyber Security Ghost Mode', value: 93 },
          { label: 'AIML Operations Commander', value: 96 },
          { label: 'Tactical Scaling', value: 98 }
        ],
        socials: {
          github: 'https://github.com/MannyG3',
          linkedin: 'https://www.linkedin.com/in/mayurgund99/',
          twitter: '',
          instagram: '',
          email: 'mayurgund3333@gmail.com'
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
