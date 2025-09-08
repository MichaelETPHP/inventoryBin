import React from 'react';
import { SummaryStats } from '../types';
import { TrendingUp, TrendingDown, Scale, Hash } from 'lucide-react';

interface SummaryProps {
  stats: SummaryStats;
}

export const Summary: React.FC<SummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
        <div className="flex items-center">
          <TrendingUp className="w-8 h-8 text-green-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total In</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalIn}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <div className="flex items-center">
          <TrendingDown className="w-8 h-8 text-red-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Out</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOut}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
        <div className="flex items-center">
          <Scale className="w-8 h-8 text-blue-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold text-gray-900">{stats.currentBalance}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
        <div className="flex items-center">
          <Hash className="w-8 h-8 text-purple-500" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Entries</p>
            <p className="text-2xl font-bold text-gray-900">{stats.entryCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};