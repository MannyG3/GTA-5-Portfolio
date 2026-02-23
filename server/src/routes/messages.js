import express from 'express';
import Message from '../models/Message.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate, messageSchema } from '../middleware/validation.js';

const router = express.Router();

// POST /api/messages - Send message (public)
router.post('/', validate(messageSchema), async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ 
      message: 'Message sent to HQ successfully!',
      id: message._id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/messages - Get all messages (admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, limit, page = 1 } = req.query;
    const query = {};
    
    if (status) query.status = status;
    
    const pageSize = parseInt(limit) || 20;
    const skip = (parseInt(page) - 1) * pageSize;
    
    const [messages, total] = await Promise.all([
      Message.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize),
      Message.countDocuments(query)
    ]);
    
    // Get unread count
    const unreadCount = await Message.countDocuments({ status: 'unread' });
    
    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / pageSize),
        total
      },
      unreadCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/messages/:id - Update message status (admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/messages/:id - Delete message (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
