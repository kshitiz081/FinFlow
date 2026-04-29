import { Request, Response } from 'express';
import { DataIngestionService } from '../services/DataIngestionService';
import { ProcessingService } from '../services/ProcessingService';
import { CacheService } from '../services/CacheService';
import { StreamingService } from '../services/StreamingService';
import { logger } from '../config/logger';

export class MarketController {
  constructor(
    private ingestion: DataIngestionService,
    private processing: ProcessingService,
    private cache: CacheService,
    private streaming: StreamingService
  ) {}

  async getMarketData(req: Request, res: Response): Promise<void> {
    const { symbols } = req.query as { symbols: string };

    try {
      const cacheKey = `market:${symbols}`;

      const data = await this.cache.getOrCompute(
        cacheKey,
        async () => {
          const tickers = await this.ingestion.fetchBatch(symbols.split(','));
          return this.processing.processStreamData(tickers, []);
        },
        60 // 60 second TTL
      );

      res.json(data);
    } catch (error) {
      logger.error({ symbols, error }, 'Failed to get market data');
      res.status(500).json({ error: 'Failed to fetch market data' });
    }
  }

  subscribe(req: Request, res: Response): void {
    try {
      this.streaming.subscribe(res);
      logger.info(`SSE subscription established`);
    } catch (error) {
      logger.error({ error }, 'SSE subscription failed');
      res.status(500).json({ error: 'Failed to establish connection' });
    }
  }

  getHealth(req: Request, res: Response): void {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      subscribers: this.streaming.getSubscriberCount(),
    });
  }
}
