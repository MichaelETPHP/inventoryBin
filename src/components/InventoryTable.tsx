import React from 'react'
import { InventoryEntry } from '../types'
import { InventoryRow } from './InventoryRow'
import { Trash2, Copy } from 'lucide-react'

interface InventoryTableProps {
  entries: InventoryEntry[]
  onUpdateEntry: (id: string, field: keyof InventoryEntry, value: any) => void
  onDeleteEntry: (id: string) => void
  onDuplicateEntry: (id: string) => void
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  entries,
  onUpdateEntry,
  onDeleteEntry,
  onDuplicateEntry,
}) => {
  if (entries.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow-md p-12 text-center'>
        <div className='text-gray-400 text-lg'>
          No inventory entries yet. Click "Add Row" to get started.
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      {/* Mobile: card list */}
      <div className='md:hidden divide-y divide-gray-200'>
        {entries.map((entry) => (
          <div key={entry.id} className='p-4'>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-sm text-gray-500'>No</div>
              <div className='text-base font-semibold'>{entry.no}</div>
            </div>

            <div className='grid grid-cols-1 gap-3'>
              <label className='block'>
                <div className='text-sm text-gray-600 mb-1'>Date</div>
                <input
                  type='date'
                  value={entry.date}
                  onChange={(e) =>
                    onUpdateEntry(entry.id, 'date', e.target.value)
                  }
                  className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                />
              </label>

              <label className='block'>
                <div className='text-sm text-gray-600 mb-1'>Notes (Name)</div>
                <input
                  type='text'
                  value={entry.notes}
                  onChange={(e) =>
                    onUpdateEntry(entry.id, 'notes', e.target.value)
                  }
                  placeholder='Item description'
                  className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                />
              </label>

              <div className='grid grid-cols-2 gap-3'>
                <label className='block'>
                  <div className='text-sm text-gray-600 mb-1'>In</div>
                  <input
                    type='number'
                    min='0'
                    step='0.01'
                    value={entry.in}
                    onChange={(e) =>
                      onUpdateEntry(
                        entry.id,
                        'in',
                        Math.max(0, parseFloat(e.target.value) || 0)
                      )
                    }
                    className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-green-700'
                  />
                </label>
                <label className='block'>
                  <div className='text-sm text-gray-600 mb-1'>Out</div>
                  <input
                    type='number'
                    min='0'
                    step='0.01'
                    value={entry.out}
                    onChange={(e) =>
                      onUpdateEntry(
                        entry.id,
                        'out',
                        Math.max(0, parseFloat(e.target.value) || 0)
                      )
                    }
                    className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-red-700'
                  />
                </label>
              </div>

              <div className='grid grid-cols-2 gap-3 items-end'>
                <label className='block'>
                  <div className='text-sm text-gray-600 mb-1'>Sign</div>
                  <input
                    type='text'
                    value={entry.sign}
                    onChange={(e) =>
                      onUpdateEntry(entry.id, 'sign', e.target.value)
                    }
                    placeholder='Initials'
                    maxLength={10}
                    className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent'
                  />
                </label>

                <div className='text-center'>
                  <div
                    className={`px-3 py-2 rounded text-center font-bold ${
                      entry.balance >= 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {entry.balance.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-2 pt-2'>
                <button
                  onClick={() => onDuplicateEntry(entry.id)}
                  className='px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg'
                  title='Duplicate row'
                >
                  <span className='inline-flex items-center gap-1'>
                    <Copy className='w-4 h-4' /> Duplicate
                  </span>
                </button>
                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className='px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg'
                  title='Delete row'
                >
                  <span className='inline-flex items-center gap-1'>
                    <Trash2 className='w-4 h-4' /> Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gradient-to-r from-amber-200 to-yellow-200 sticky top-0 z-10'>
            <tr>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                No
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                Date
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                Notes (Name)
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                In
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                Out
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                Balance
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900'>
                Sign
              </th>
              <th className='px-4 py-4 text-left font-bold text-amber-900 print:hidden'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {entries.map((entry) => (
              <InventoryRow
                key={entry.id}
                entry={entry}
                onUpdate={(field, value) =>
                  onUpdateEntry(entry.id, field, value)
                }
                onDelete={() => onDeleteEntry(entry.id)}
                onDuplicate={() => onDuplicateEntry(entry.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
