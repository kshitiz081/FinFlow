export interface Ticker {
  symbol: string;
  price: number;
  volume: number;
  highPrice: number;
  lowPrice: number;
  averagePrice?: number;
  priceChange?: number;
  percentChange?: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  symbol: string;
  condition: 'above' | 'below' | 'crosses';
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}

export interface StreamMessage {
  tickers: Ticker[];
  alerts: Alert[];
  timestamp: string;
  batchId: string;
}
