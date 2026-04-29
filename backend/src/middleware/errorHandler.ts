import { Express, Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export function setupErrorHandler(app: Express): void {
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(
      { error, url: req.url, method: req.method },
      'Unhandled error'
    );

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    res.status(statusCode).json({
      error: message,
      timestamp: new Date().toISOString(),
    });
  });
}
