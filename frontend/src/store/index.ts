import { create } from 'zustand';
import { Ticker, Alert } from '../api/types';

interface MarketState {
  tickers: Ticker[];
  alerts: Alert[];
  selectedSymbols: string[];
  isLoading: boolean;
  error: string | null;
  subscriberCount: number;

  setTickers: (tickers: Ticker[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  updateTicker: (ticker: Ticker) => void;
  addAlert: (alert: Alert) => void;
  removeAlert: (alertId: string) => void;
  toggleSymbol: (symbol: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSubscriberCount: (count: number) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  tickers: [],
  alerts: [],
  selectedSymbols: ['AAPL', 'GOOGL', 'MSFT'],
  isLoading: false,
  error: null,
  subscriberCount: 0,

  setTickers: (tickers) => set({ tickers }),
  setAlerts: (alerts) => set({ alerts }),

  updateTicker: (ticker) =>
    set((state) => ({
      tickers: state.tickers.map((t) =>
        t.symbol === ticker.symbol ? ticker : t
      ),
    })),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  removeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== alertId),
    })),

  toggleSymbol: (symbol) =>
    set((state) => ({
      selectedSymbols: state.selectedSymbols.includes(symbol)
        ? state.selectedSymbols.filter((s) => s !== symbol)
        : [...state.selectedSymbols, symbol],
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSubscriberCount: (count) => set({ subscriberCount: count }),
}));
