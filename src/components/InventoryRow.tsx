import React from 'react'
import { InventoryEntry } from '../types'
import { Trash2, Copy } from 'lucide-react'

interface InventoryRowProps {
  entry: InventoryEntry
  onUpdate: (field: keyof InventoryEntry, value: any) => void
  onDelete: () => void
  onDuplicate: () => void
}

export const InventoryRow: React.FC<InventoryRowProps> = ({
  entry,
  onUpdate,
  onDelete,
  onDuplicate,
}) => {
  const handleNumberInput = (field: 'in' | 'out', value: string) => {
    const numValue = Math.max(0, parseFloat(value) || 0)
    onUpdate(field, numValue)
  }

  return (
    <tr className='hover:bg-orange-50 transition-colors duration-150'>
      <td className='px-4 py-3 text-center font-medium text-gray-900'>
        {entry.no}
      </td>

      <td className='px-4 py-3'>
        <input
          type='date'
          value={entry.date}
          onChange={(e) => onUpdate('date', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
        />
      </td>

      <td className='px-4 py-3'>
        <input
          type='text'
          value={entry.notes}
          onChange={(e) => onUpdate('notes', e.target.value)}
          placeholder='Item description'
          className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
        />
      </td>

      <td className='px-4 py-3'>
        <input
          type='number'
          min='0'
          step='0.01'
          value={entry.in}
          onChange={(e) => handleNumberInput('in', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-green-700'
        />
      </td>

      <td className='px-4 py-3'>
        <input
          type='number'
          min='0'
          step='0.01'
          value={entry.out}
          onChange={(e) => handleNumberInput('out', e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-red-700'
        />
      </td>

      <td className='px-4 py-3'>
        <div
          className={`px-3 py-2 rounded text-center font-bold ${
            entry.balance >= 0
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {entry.balance.toFixed(2)}
        </div>
      </td>

      <td className='px-4 py-3'>
        <input
          type='text'
          value={entry.sign}
          onChange={(e) => onUpdate('sign', e.target.value)}
          placeholder='Initials'
          maxLength={10}
          className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
        />
      </td>

      <td className='px-4 py-3 print:hidden'>
        <div className='flex gap-1 transition-opacity duration-200'>
          <button
            onClick={onDuplicate}
            className='p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200'
            title='Duplicate row'
          >
            <Copy className='w-4 h-4' />
          </button>

          <button
            onClick={onDelete}
            className='p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200'
            title='Delete row'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </td>
    </tr>
  )
}
