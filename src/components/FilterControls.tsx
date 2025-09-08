import React from 'react'
import {
  Search,
  Calendar,
  Plus,
  Trash2,
  Settings,
  Database,
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
    <div className='bg-white rounded-lg shadow-md p-6 mb-6 print:hidden space-y-4'>
      <div className='space-y-4'>
        {/* Search and Date Filters */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search items or signatures...'
              value={filter.searchTerm}
              onChange={(e) =>
                onFilterChange({ ...filter, searchTerm: e.target.value })
              }
              className='pl-10 pr-4 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
            />
          </div>

          <div className='relative'>
            <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='date'
              value={filter.startDate}
              onChange={(e) =>
                onFilterChange({ ...filter, startDate: e.target.value })
              }
              className='pl-10 pr-4 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
              placeholder='Start date'
            />
          </div>

          <div className='relative'>
            <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='date'
              value={filter.endDate}
              onChange={(e) =>
                onFilterChange({ ...filter, endDate: e.target.value })
              }
              className='pl-10 pr-4 w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
              placeholder='End date'
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-3 items-center justify-center sm:justify-start'>
          <button
            data-tour-id='add-row'
            onClick={onAddEntry}
            className='flex items-center gap-1 md:gap-2 bg-green-600 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md font-medium text-sm md:text-base'
          >
            <Plus className='w-4 h-4 md:w-4 md:h-4' />
            Add Row
          </button>

          <button
            data-tour-id='set-balance'
            onClick={onSetStartingBalance}
            className='flex items-center gap-1 md:gap-2 bg-amber-600 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-md font-medium text-sm md:text-base'
          >
            <Settings className='w-4 h-4 md:w-4 md:h-4' />
            Set Balance
          </button>

          <button
            data-tour-id='clear-all'
            onClick={onClearAll}
            className='flex items-center gap-1 md:gap-2 bg-red-600 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md font-medium text-sm md:text-base'
          >
            <Trash2 className='w-4 h-4 md:w-4 md:h-4' />
            Clear All
          </button>

          {/* Connect master jd.json */}
          <button
            data-tour-id='connect-server'
            onClick={onConnectMasterJson}
            disabled={!!isConnected}
            className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg transition-colors duration-200 shadow-md font-medium text-sm md:text-base ${
              isConnected
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
          >
            <Database className='w-4 h-4 md:w-4 md:h-4' />
            Connect to Server
          </button>
        </div>

        {/* Auto-save indicator */}
        <div className='text-sm text-gray-600 bg-green-50 p-4 rounded-lg border border-green-200'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
            <span>Auto-save is enabled · Server is connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
