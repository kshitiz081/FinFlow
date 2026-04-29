import { MarketTicker, Alert, StreamData } from '../models/types';

export class ProcessingService {
  private priceHistory: Map<string, number[]> = new Map();

  processStreamData(tickers: MarketTicker[], alerts: Alert[]): StreamData {
    const enrichedTickers = tickers.map((ticker) =>
      this.enrichWithMetrics(ticker)
    );

    const triggeredAlerts = alerts.filter((alert) =>
      this.evaluateAlert(alert, enrichedTickers)
    );

    return {
      tickers: enrichedTickers,
      alerts: triggeredAlerts,
      timestamp: new Date(),
      batchId: this.generateBatchId(),
    };
  }

  private enrichWithMetrics(ticker: MarketTicker): MarketTicker {
    const history = this.priceHistory.get(ticker.symbol) || [];
    history.push(ticker.price);

    if (history.length > 100) {
      history.shift();
    }

    this.priceHistory.set(ticker.symbol, history);

    return {
      ...ticker,
      averagePrice: this.calculateAverage(history),
      priceChange:
        history.length > 1 ? ticker.price - history[history.length - 2] : 0,
      percentChange:
        history.length > 1
          ? ((ticker.price - history[0]) / history[0]) * 100
          : 0,
    };
  }

  private evaluateAlert(alert: Alert, tickers: MarketTicker[]): boolean {
    const ticker = tickers.find((t) => t.symbol === alert.symbol);
    if (!ticker) return false;

    switch (alert.condition) {
      case 'above':
        return ticker.price > alert.targetPrice;
      case 'below':
        return ticker.price < alert.targetPrice;
      case 'crosses':
        return Math.abs(ticker.price - alert.targetPrice) < 0.5;
      default:
        return false;
    }
  }

  private calculateAverage(prices: number[]): number {
    return prices.reduce((a, b) => a + b, 0) / prices.length;
  }

  private generateBatchId(): string {
    return `batch-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
