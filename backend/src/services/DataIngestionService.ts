import axios from 'axios';
import { logger } from '../config/logger';
import { MarketTicker } from '../models/types';

// Mock data for demo
const MOCK_TICKERS: { [key: string]: MarketTicker } = {
  AAPL: {
    symbol: 'AAPL',
    price: 150.25,
    timestamp: new Date(),
    volume: 2500000,
    highPrice: 152.5,
    lowPrice: 149.0,
  },
  GOOGL: {
    symbol: 'GOOGL',
    price: 120.75,
    timestamp: new Date(),
    volume: 1800000,
    highPrice: 122.0,
    lowPrice: 119.5,
  },
  MSFT: {
    symbol: 'MSFT',
    price: 330.15,
    timestamp: new Date(),
    volume: 2100000,
    highPrice: 332.0,
    lowPrice: 328.5,
  },
  TSLA: {
    symbol: 'TSLA',
    price: 245.60,
    timestamp: new Date(),
    volume: 3200000,
    highPrice: 248.0,
    lowPrice: 243.0,
  },
  AMZN: {
    symbol: 'AMZN',
    price: 175.50,
    timestamp: new Date(),
    volume: 2800000,
    highPrice: 177.0,
    lowPrice: 174.0,
  },
};

export class DataIngestionService {
  async fetchMarketData(symbol: string): Promise<MarketTicker> {
    try {
      // For demo, return mock data with slight variations
      const mockData = MOCK_TICKERS[symbol];
      if (mockData) {
        const priceVariation = (Math.random() - 0.5) * 2;
        return {
          ...mockData,
          price: mockData.price + priceVariation,
          timestamp: new Date(),
        };
      }

      throw new Error(`No data for symbol ${symbol}`);
    } catch (error) {
      logger.error({ symbol, error }, 'Failed to fetch market data');
      throw new Error(`Data ingestion failed for ${symbol}`);
    }
  }

  async fetchBatch(symbols: string[]): Promise<MarketTicker[]> {
    const results = await Promise.allSettled(
      symbols.map((s) => this.fetchMarketData(s))
    );

    return results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => (r as PromiseFulfilledResult<MarketTicker>).value);
  }
}
