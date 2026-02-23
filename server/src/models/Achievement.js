import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['Certificate', 'Award', 'Badge', 'License', 'Other'],
    default: 'Certificate'
  },
  credentialUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Achievement', achievementSchema);
