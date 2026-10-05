import React from 'react'
import { InventoryEntry } from '../types'
import { Trash2, Copy, Calendar } from 'lucide-react'

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
    <tr className='group row-enter hover:bg-cream-50/70 transition-colors duration-150'>
      <td className='px-4 py-2.5 text-center font-medium text-ink-700 tabular-nums'>
        {entry.no}
      </td>

      <td className='px-4 py-2.5'>
        <div className='relative'>
          <Calendar className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-500/60 pointer-events-none' />
          <input
            type='date'
            value={entry.date}
            onChange={(e) => onUpdate('date', e.target.value)}
            className='w-full pl-8 pr-2 py-2 bg-transparent border border-transparent rounded-lg group-hover:border-cream-200 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
          />
        </div>
      </td>

      <td className='px-4 py-2.5'>
        <input
          type='text'
          value={entry.notes}
          onChange={(e) => onUpdate('notes', e.target.value)}
          placeholder='Item description'
          className='w-full px-3 py-2 bg-transparent border border-transparent rounded-lg group-hover:border-cream-200 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
        />
      </td>

      <td className='px-4 py-2.5'>
        <input
          type='number'
          inputMode='decimal'
          min='0'
          step='0.01'
          value={entry.in}
          onChange={(e) => handleNumberInput('in', e.target.value)}
          className='w-full px-3 py-2 bg-transparent border border-transparent rounded-lg group-hover:border-cream-200 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white transition-colors duration-150 text-emerald-700 tabular-nums'
        />
      </td>

      <td className='px-4 py-2.5'>
        <input
          type='number'
          inputMode='decimal'
          min='0'
          step='0.01'
          value={entry.out}
          onChange={(e) => handleNumberInput('out', e.target.value)}
          className='w-full px-3 py-2 bg-transparent border border-transparent rounded-lg group-hover:border-cream-200 focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 focus:bg-white transition-colors duration-150 text-rose-700 tabular-nums'
        />
      </td>

      <td className='px-4 py-2.5'>
        <div
          className={`px-3 py-1.5 rounded-lg text-center font-semibold tabular-nums ${
            entry.balance >= 0
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {entry.balance.toFixed(2)}
        </div>
      </td>

      <td className='px-4 py-2.5'>
        <input
          type='text'
          value={entry.sign}
          onChange={(e) => onUpdate('sign', e.target.value)}
          placeholder='Initials'
          maxLength={10}
          className='w-full px-3 py-2 bg-transparent border border-transparent rounded-lg group-hover:border-cream-200 focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
        />
      </td>

      <td className='px-4 py-2.5 print:hidden'>
        <div className='flex gap-1'>
          <button
            onClick={onDuplicate}
            className='p-2 text-brand-700 hover:bg-brand-50 rounded-lg transition duration-150 ease-out active:scale-[0.9]'
            title='Duplicate row'
            aria-label='Duplicate row'
          >
            <Copy className='w-4 h-4' />
          </button>

          <button
            onClick={onDelete}
            className='p-2 text-rose-700 hover:bg-rose-50 rounded-lg transition duration-150 ease-out active:scale-[0.9]'
            title='Delete row'
            aria-label='Delete row'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </td>
    </tr>
  )
}
