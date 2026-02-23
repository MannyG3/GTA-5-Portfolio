import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  org: {
    type: String,
    required: [true, 'Organization is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: null // null means current/ongoing
  },
  description: {
    type: String,
    default: ''
  },
  highlights: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['Job', 'Internship', 'Freelance', 'Education', 'Club', 'Volunteer'],
    default: 'Job'
  },
  location: {
    type: String,
    default: ''
  },
  logoUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Experience', experienceSchema);
