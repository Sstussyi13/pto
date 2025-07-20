import express from 'express';
import { submitRequest } from '../controllers/requestController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', submitRequest);
router.get('/', protect, adminOnly, (req, res) => {
  res.json({ message: 'Заявки для админа' });
});

export default router;
