import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { upload, cloudinary } from '../config/cloudinary.js';

const router = express.Router();

// POST /api/upload - Upload single image (admin)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    res.json({
      message: 'Image uploaded successfully',
      url: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/upload/multiple - Upload multiple images (admin)
router.post('/multiple', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }
    
    const urls = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));
    
    res.json({
      message: `${req.files.length} images uploaded successfully`,
      images: urls
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/upload/:publicId - Delete image (admin)
router.delete('/:publicId', authMiddleware, async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);
    
    if (result.result !== 'ok') {
      return res.status(400).json({ error: 'Failed to delete image' });
    }
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
