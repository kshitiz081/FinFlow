import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Redis from 'ioredis';
import { config } from './config/env';
import { logger } from './config/logger';
import { createMarketRoutes } from './routes/market.routes';
import { MarketController } from './controllers/MarketController';
import { DataIngestionService } from './services/DataIngestionService';
import { ProcessingService } from './services/ProcessingService';
import { CacheService } from './services/CacheService';
import { StreamingService } from './services/StreamingService';
import { setupErrorHandler } from './middleware/errorHandler';

async function bootstrap() {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Initialize services
  let redis: Redis;
  try {
    redis = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      password: config.REDIS_PASSWORD,
      retryStrategy: (times) => Math.min(times * 50, 2000),
      enableReadyCheck: false,
      enableOfflineQueue: true,
      lazyConnect: false,
    });
    
    // Suppress unhandled error events when Redis is unavailable
    redis.on('error', () => {
      // Silently handle Redis connection errors
    });
    
    redis.on('connect', () => {
      logger.info('Redis connected');
    });
  } catch (error) {
    logger.info('Running without Redis - using in-memory cache');
    // Create a minimal fallback Redis instance without auto-connect
    redis = new Redis({
      lazyConnect: true,
    });
    redis.on('error', () => {
      // Silently ignore errors
    });
  }

  const ingestionService = new DataIngestionService();
  const processingService = new ProcessingService();
  const cacheService = new CacheService(redis);
  const streamingService = new StreamingService();
  const marketController = new MarketController(
    ingestionService,
    processingService,
    cacheService,
    streamingService
  );

  // Routes
  app.use('/api', createMarketRoutes(marketController));

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({ message: 'FinFlow API - Real-time Financial Data Platform' });
  });

  // Error handling
  setupErrorHandler(app);

  // Start server
  const server = app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
    logger.info(`Environment: ${config.NODE_ENV}`);
  });

  // Broadcast market data every 2 seconds
  const broadcastInterval = setInterval(async () => {
    try {
      const tickers = await ingestionService.fetchBatch(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN']);
      const processed = processingService.processStreamData(tickers, []);
      streamingService.broadcast({
        tickers: processed.tickers || processed,
        alerts: processed.alerts || [],
        timestamp: new Date(),
        batchId: `batch-${Date.now()}`,
      });
    } catch (error) {
      logger.error({ error }, 'Failed to broadcast market data');
    }
  }, 2000);

  // Graceful shutdown
  const shutdown = () => {
    logger.info('Shutting down gracefully...');
    clearInterval(broadcastInterval);
    server.close(async () => {
      await redis.quit();
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((error) => {
  logger.error({ error }, 'Failed to bootstrap application');
  process.exit(1);
});
