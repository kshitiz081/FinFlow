import React from 'react';
import { useMarketStore } from '../store';

const Header: React.FC = () => {
  const { subscriberCount } = useMarketStore();

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">FinFlow</h1>
        <div className="flex gap-4">
          <div className="text-sm">
            <span className="text-gray-400">Status:</span>
            <span className="text-green-500 ml-2">● Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
