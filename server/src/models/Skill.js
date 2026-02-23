import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other']
  },
  items: [{
    name: { type: String, required: true },
    level: { type: Number, min: 0, max: 100, required: true },
    icon: { type: String, default: '' }
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Skill', skillSchema);
