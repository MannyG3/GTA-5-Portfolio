import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    default: 'Your Name'
  },
  role: {
    type: String,
    default: 'Full Stack Developer'
  },
  location: {
    type: String,
    default: 'Los Santos'
  },
  bio: {
    type: String,
    default: 'Welcome to my portfolio. I build things that work.'
  },
  tagline: {
    type: String,
    default: 'Full Stack Developer | MERN | AI | Robotics'
  },
  stats: [{
    label: { type: String, required: true },
    value: { type: Number, min: 0, max: 100, required: true }
  }],
  socials: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    email: { type: String, default: '' },
    resume: { type: String, default: '' }
  },
  profileImageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);
