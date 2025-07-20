import express from 'express';
import multer from 'multer';
import { sendEmail } from '../mailer.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post('/', upload.single('resume'), async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      resume: req.file, 
    };
    await sendEmail(data); 
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
