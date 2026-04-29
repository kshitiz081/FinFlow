export interface MarketTicker {
  symbol: string;
  price: number;
  timestamp: Date;
  volume: number;
  highPrice: number;
  lowPrice: number;
  averagePrice?: number;
  priceChange?: number;
  percentChange?: number;
}

export interface Alert {
  id: string;
  userId?: string;
  symbol: string;
  condition: 'above' | 'below' | 'crosses';
  targetPrice: number;
  isActive: boolean;
  createdAt: Date;
  triggeredAt?: Date;
}

export interface StreamData {
  tickers: MarketTicker[];
  alerts: Alert[];
  timestamp: Date;
  batchId: string;
}

export interface StreamMessage extends StreamData {}

export interface CacheOptions {
  ttl: number;
  key: string;
}
