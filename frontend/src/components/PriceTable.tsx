import React, { useState, useCallback } from 'react';
import { Ticker } from '../api/types';
import { usePriceFilter } from '../hooks/usePriceFilter';
import PriceRow from './PriceRow';

interface PriceTableProps {
  tickers: Ticker[];
}

const PriceTable: React.FC<PriceTableProps> = ({ tickers }) => {
  const [searchSymbol, setSearchSymbol] = useState('');
  const [sortBy, setSortBy] = useState<'symbol' | 'price'>('symbol');

  const filtered = usePriceFilter(tickers, {
    searchSymbol,
    sortBy,
    sortOrder: 'asc',
  });

  const handleSort = useCallback((field: 'symbol' | 'price') => {
    setSortBy(field);
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-900">
        <input
          type="text"
          placeholder="Search symbol..."
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-750 font-semibold text-sm border-b border-gray-700">
        <button
          onClick={() => handleSort('symbol')}
          className="text-left hover:text-blue-400"
        >
          Symbol
        </button>
        <button
          onClick={() => handleSort('price')}
          className="text-left hover:text-blue-400"
        >
          Price
        </button>
        <div>Change %</div>
        <div>Volume</div>
      </div>

      <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
        {filtered.map((ticker) => (
          <PriceRow key={ticker.symbol} ticker={ticker} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-gray-400">No tickers found</div>
      )}
    </div>
  );
};

export default React.memo(PriceTable);
