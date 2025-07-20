import express from 'express';
import contentRoutes from './contentRoutes.js';
import requestRoutes from './requestRoutes.js';
import authRoutes from './authRoutes.js';
import applyRoutes from './applyRoutes.js';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/requests', requestRoutes);
router.use('/apply', applyRoutes); 

export default router;
