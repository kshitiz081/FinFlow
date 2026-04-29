import React, { useState } from 'react';
import { useMarketStore } from '../store';
import { useRealTimeData } from '../hooks/useRealTimeData';
import PriceTable from './PriceTable';
import PriceChart from './PriceChart';
import Header from './Header';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('table');
  const { tickers, isLoading, error } = useMarketStore();

  useRealTimeData();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="flex gap-4 p-4 border-b border-gray-700">
        {(['table', 'chart'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-4">
        {isLoading && <div className="text-center py-8">Loading...</div>}

        {activeTab === 'table' && <PriceTable tickers={tickers} />}
        {activeTab === 'chart' && <PriceChart tickers={tickers} />}
      </div>
    </div>
  );
};

export default Dashboard;
