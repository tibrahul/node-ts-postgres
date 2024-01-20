require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import cors from 'cors';
import { AppDataSource } from './utils/data-source';
import AppError from './utils/appError';
import userRouter from './routes/user.routes';
import addressRouter from './routes/address.routes';
import validateEnv from './utils/validateEnv';

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json({ limit: '2mb' }));

    // 2. Logger
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    // 3. Cors
    app.use(
      cors({
        origin: '*',
        credentials: true,
      })
    );

    // ROUTES
    app.use('/api/users', userRouter);
    app.use('/api/address', addressRouter);

    // HEALTH CHECK
    app.get('/api/health', async (_, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: "OK",
      });
    });

    // UNHANDLED ROUTE
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
      (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
          status: error.status,
          message: error.message,
        });
      }
    );

    const port = config.get<number>('port');
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
