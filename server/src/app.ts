import 'reflect-metadata';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/userRoutes'; 
import { errorHandler } from './middlwares/errorHandler'; 
import serviceRoutes from './routes/serviceRoutes'; 
import reviewRoutes from './routes/reviewRoutes';
import categoryRoutes from './routes/categoryRoutes';
import path from 'path';

const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://a9a7794dda685872fb15413536889606@o4509362786795520.ingest.de.sentry.io/4509362790465616",
  sendDefaultPii: true,
});

const app = express();

Sentry.setupExpressErrorHandler(app);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/images', express.static(path.join(__dirname, '../images')));

app.use('/api/users', userRoutes); 
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/reviews', reviewRoutes);

// /debug-sentry для тесту Sentry
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('Test Sentry error!');
});

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode >= 500) {
    Sentry.captureException(err);
  }
  next(err);
});

app.use(errorHandler);


export default app;
