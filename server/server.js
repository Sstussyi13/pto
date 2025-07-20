import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import rateLimit from 'express-rate-limit';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import db from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(xssClean());
app.use(mongoSanitize());
app.use('/api/admin', authRoutes); 

app.use('/admin', adminRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов, попробуйте позже',
});
app.use('/api', limiter);
app.use('/api', routes);
app.get('/ping', (_, res) => res.send('pong'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.use(errorHandler);
app.listen(PORT, '0.0.0.0', () => {
  console.log(` Сервер запущен на порту ${PORT}`);
});
