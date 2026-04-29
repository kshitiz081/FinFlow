import { useEffect } from 'react';
import { useMarketStore } from '../store';
import { marketApi } from '../api/client';

export function useRealTimeData() {
  const { setTickers, setAlerts, setLoading, setError, setSubscriberCount } =
    useMarketStore();

  useEffect(() => {
    setLoading(true);

    const unsubscribe = marketApi.subscribeToStream((data) => {
      setTickers(data.tickers);
      setAlerts(data.alerts);
      setError(null);
    });

    marketApi
      .getMarketData(['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'])
      .then((data) => {
        setTickers(data.tickers || data);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch market data');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return unsubscribe;
  }, [setTickers, setAlerts, setLoading, setError, setSubscriberCount]);
}
