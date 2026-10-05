import React from 'react'
import {
  Search,
  Calendar,
  Plus,
  Trash2,
  Settings,
  Database,
  Check,
} from 'lucide-react'
import { FilterState } from '../types'

interface FilterControlsProps {
  filter: FilterState
  onFilterChange: (filter: FilterState) => void
  onAddEntry: () => void
  onClearAll: () => void
  onSetStartingBalance: () => void
  onConnectMasterJson: () => void
  isConnected?: boolean
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  onFilterChange,
  onAddEntry,
  onClearAll,
  onSetStartingBalance,
  onConnectMasterJson,
  isConnected,
}) => {
  return (
    <div className='bg-white rounded-xl shadow-panel border border-cream-200 p-5 sm:p-6 mb-6 print:hidden space-y-5'>
      {/* Search and Date Filters */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-ink-500/60 w-4 h-4 pointer-events-none' />
          <input
            type='text'
            inputMode='search'
            enterKeyHint='search'
            placeholder='Search items or signatures...'
            value={filter.searchTerm}
            onChange={(e) =>
              onFilterChange({ ...filter, searchTerm: e.target.value })
            }
            className='pl-10 pr-4 w-full py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-ink-900 placeholder:text-ink-500/60 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
          />
        </div>

        <div className='relative'>
          <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 text-ink-500/60 w-4 h-4 pointer-events-none' />
          <input
            type='date'
            value={filter.startDate}
            onChange={(e) =>
              onFilterChange({ ...filter, startDate: e.target.value })
            }
            className='pl-10 pr-4 w-full py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-ink-900 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
            aria-label='Start date'
          />
        </div>

        <div className='relative'>
          <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 text-ink-500/60 w-4 h-4 pointer-events-none' />
          <input
            type='date'
            value={filter.endDate}
            onChange={(e) =>
              onFilterChange({ ...filter, endDate: e.target.value })
            }
            className='pl-10 pr-4 w-full py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-ink-900 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
            aria-label='End date'
          />
        </div>
      </div>

      {/* Action Buttons (desktop/tablet — mobile uses the bottom action bar) */}
      <div className='hidden sm:flex flex-wrap gap-2.5 items-center'>
        <button
          data-tour-id='add-row'
          onClick={onAddEntry}
          className='flex items-center gap-2 bg-brand-700 text-white px-4 py-2.5 rounded-lg hover:bg-brand-800 transition duration-150 ease-out active:scale-[0.97] font-medium text-sm shadow-sm'
        >
          <Plus className='w-4 h-4' />
          Add Row
        </button>

        <button
          data-tour-id='set-balance'
          onClick={onSetStartingBalance}
          className='flex items-center gap-2 bg-white text-ink-700 border border-cream-200 px-4 py-2.5 rounded-lg hover:bg-cream-50 transition duration-150 ease-out active:scale-[0.97] font-medium text-sm'
        >
          <Settings className='w-4 h-4' />
          Set Balance
        </button>

        <button
          data-tour-id='connect-server'
          onClick={onConnectMasterJson}
          disabled={!!isConnected}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition duration-150 ease-out font-medium text-sm ${
            isConnected
              ? 'bg-emerald-50 text-emerald-700 cursor-default'
              : 'bg-white text-ink-700 border border-cream-200 hover:bg-cream-50 active:scale-[0.97]'
          }`}
        >
          {isConnected ? <Check className='w-4 h-4' /> : <Database className='w-4 h-4' />}
          {isConnected ? 'Connected' : 'Connect to Server'}
        </button>

        <button
          data-tour-id='clear-all'
          onClick={onClearAll}
          className='flex items-center gap-2 text-rose-700 px-4 py-2.5 rounded-lg hover:bg-rose-50 transition duration-150 ease-out active:scale-[0.97] font-medium text-sm ml-auto'
        >
          <Trash2 className='w-4 h-4' />
          Clear All
        </button>
      </div>

      {/* Connection status */}
      <div
        className={`text-sm px-4 py-3 rounded-lg border flex items-center gap-2.5 ${
          isConnected
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
            : 'bg-cream-50 border-cream-200 text-ink-500'
        }`}
      >
        <span className='relative flex w-2 h-2 flex-shrink-0'>
          {isConnected && (
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
          )}
          <span
            className={`relative inline-flex w-2 h-2 rounded-full ${
              isConnected ? 'bg-emerald-500' : 'bg-ink-500/40'
            }`}
          />
        </span>
        <span>
          {isConnected
            ? 'Auto-save is enabled · Server is connected'
            : 'Not connected · entries are saved to this browser only'}
        </span>
      </div>
    </div>
  )
}
