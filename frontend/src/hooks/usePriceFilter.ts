import { useMemo } from 'react';
import { Ticker } from '../api/types';

interface FilterOptions {
  searchSymbol?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'symbol' | 'price' | 'percentChange';
  sortOrder?: 'asc' | 'desc';
}

export function usePriceFilter(tickers: Ticker[], options: FilterOptions) {
  return useMemo(() => {
    let filtered = [...tickers];

    if (options.searchSymbol) {
      const search = options.searchSymbol.toUpperCase();
      filtered = filtered.filter((t) => t.symbol.includes(search));
    }

    if (options.minPrice !== undefined) {
      filtered = filtered.filter((t) => t.price >= options.minPrice!);
    }
    if (options.maxPrice !== undefined) {
      filtered = filtered.filter((t) => t.price <= options.maxPrice!);
    }

    if (options.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[options.sortBy as keyof Ticker];
        const bVal = b[options.sortBy as keyof Ticker];

        if (typeof aVal !== 'number' || typeof bVal !== 'number') return 0;

        return options.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return filtered;
  }, [tickers, options]);
}
