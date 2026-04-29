import React from 'react';
import { Ticker } from '../api/types';

interface PriceChartProps {
  tickers: Ticker[];
}

const PriceChart: React.FC<PriceChartProps> = ({ tickers }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-8">
      <h2 className="text-xl font-bold mb-4">Price Chart</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {tickers.map((ticker) => (
          <div key={ticker.symbol} className="bg-gray-700 p-4 rounded">
            <div className="text-lg font-bold">{ticker.symbol}</div>
            <div className="text-2xl text-blue-400 mt-2">
              ${ticker.price.toFixed(2)}
            </div>
            <div className={ticker.priceChange! >= 0 ? 'text-green-500' : 'text-red-500'}>
              {ticker.percentChange?.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PriceChart);
