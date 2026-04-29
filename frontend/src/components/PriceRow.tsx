import React from 'react';
import { Ticker } from '../api/types';
import { formatCurrency, formatPercentage, formatVolume } from '../utils/formatters';

interface PriceRowProps {
  ticker: Ticker;
}

const PriceRow: React.FC<PriceRowProps> = ({ ticker }) => {
  const isPositive = (ticker.percentChange ?? 0) >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-750 transition">
      <div className="font-semibold">{ticker.symbol}</div>
      <div>{formatCurrency(ticker.price)}</div>
      <div className={changeColor}>
        {formatPercentage(ticker.percentChange ?? 0)}
      </div>
      <div className="text-gray-400 text-sm">{formatVolume(ticker.volume)}</div>
    </div>
  );
};

export default React.memo(PriceRow);
