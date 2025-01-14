import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from './shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  } else if (error instanceof Error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    });
    return;
  }
});
export default app;
