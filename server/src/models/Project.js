import mongoose from 'mongoose';
import slugify from 'slugify';

const projectSchema = new mongoose.Schema({
  code: {
    type: String,
    trim: true,
    default: ''
  },
  codename: {
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String,
    trim: true,
    default: ''
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  rewardXp: {
    type: Number,
    min: 0,
    default: 0
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  shortDesc: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: 200
  },
  fullDesc: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  objectives: [{
    type: String
  }],
  intel: [{
    type: String
  }],
  challenges: [{
    type: String
  }],
  role: {
    type: String,
    default: 'Full Stack Developer'
  },
  outcome: {
    type: String,
    default: ''
  },
  screenshots: [{
    type: String
  }],
  thumbnailUrl: {
    type: String,
    default: ''
  },
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  }
}, {
  timestamps: true
});

// Auto-generate slug from title
projectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model('Project', projectSchema);
