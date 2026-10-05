import React from 'react';
import { SummaryStats } from '../types';
import { TrendingUp, TrendingDown, Scale, Hash } from 'lucide-react';

interface SummaryProps {
  stats: SummaryStats;
}

export const Summary: React.FC<SummaryProps> = ({ stats }) => {
  const items = [
    {
      label: 'Total in',
      value: stats.totalIn,
      icon: TrendingUp,
      tone: 'text-emerald-700',
      chip: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Total out',
      value: stats.totalOut,
      icon: TrendingDown,
      tone: 'text-rose-700',
      chip: 'bg-rose-50 text-rose-600',
    },
    {
      label: 'Current balance',
      value: stats.currentBalance,
      icon: Scale,
      tone: stats.currentBalance >= 0 ? 'text-brand-700' : 'text-rose-700',
      chip: 'bg-brand-50 text-brand-700',
    },
    {
      label: 'Total entries',
      value: stats.entryCount,
      icon: Hash,
      tone: 'text-ink-900',
      chip: 'bg-gold-50 text-gold-700',
      integer: true,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-panel border border-cream-200 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-cream-200 mb-6 overflow-hidden">
      {items.map(({ label, value, icon: Icon, tone, chip, integer }) => (
        <div key={label} className="p-4 sm:p-5 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${chip}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-ink-500 uppercase tracking-wide leading-tight">{label}</p>
            <p className={`text-xl sm:text-2xl font-semibold tabular-nums ${tone}`}>
              {integer ? value : value.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
