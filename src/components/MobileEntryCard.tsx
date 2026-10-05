import React from 'react'
import { InventoryEntry } from '../types'
import { Calendar, ChevronDown, Copy, Trash2 } from 'lucide-react'

interface MobileEntryCardProps {
  entry: InventoryEntry
  isOpen: boolean
  isConfirmingDelete: boolean
  onToggle: () => void
  onUpdate: (field: keyof InventoryEntry, value: any) => void
  onDuplicate: () => void
  onRequestDelete: () => void
  onCancelDelete: () => void
  onConfirmDelete: () => void
}

export const MobileEntryCard: React.FC<MobileEntryCardProps> = ({
  entry,
  isOpen,
  isConfirmingDelete,
  onToggle,
  onUpdate,
  onDuplicate,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}) => {
  const panelId = `entry-panel-${entry.id}`

  return (
    <div className='row-enter'>
      <button
        type='button'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className='w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left active:bg-cream-50/70 transition duration-150 ease-out'
      >
        <div className='flex items-center gap-3 min-w-0'>
          <span className='text-sm text-ink-500 tabular-nums flex-shrink-0'>#{entry.no}</span>
          <span
            className={`truncate font-medium ${
              entry.notes ? 'text-ink-900' : 'text-ink-500/60 italic'
            }`}
          >
            {entry.notes || 'Untitled entry'}
          </span>
        </div>
        <div className='flex items-center gap-2.5 flex-shrink-0'>
          <span
            className={`text-sm font-semibold tabular-nums ${
              entry.balance >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {entry.balance.toFixed(2)}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-ink-500 transition-transform duration-200 ease-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <div
        id={panelId}
        className='grid transition-[grid-template-rows] duration-[220ms] ease-in-out-strong'
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className='overflow-hidden min-h-0'>
          <div className='grid grid-cols-1 gap-3 px-4 pb-4 pt-1'>
            <label className='block'>
              <div className='text-sm text-ink-500 mb-1'>Date</div>
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500/60 pointer-events-none' />
                <input
                  type='date'
                  value={entry.date}
                  onChange={(e) => onUpdate('date', e.target.value)}
                  className='w-full pl-10 pr-3 py-3 bg-cream-50 border border-cream-200 rounded-lg focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
                />
              </div>
            </label>

            <label className='block'>
              <div className='text-sm text-ink-500 mb-1'>Notes (Name)</div>
              <input
                type='text'
                value={entry.notes}
                onChange={(e) => onUpdate('notes', e.target.value)}
                placeholder='Item description'
                className='w-full px-3 py-3 bg-cream-50 border border-cream-200 rounded-lg focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
              />
            </label>

            <div className='grid grid-cols-2 gap-3'>
              <label className='block'>
                <div className='text-sm text-ink-500 mb-1'>In</div>
                <input
                  type='number'
                  inputMode='decimal'
                  min='0'
                  step='0.01'
                  value={entry.in}
                  onChange={(e) =>
                    onUpdate('in', Math.max(0, parseFloat(e.target.value) || 0))
                  }
                  className='w-full px-3 py-3 bg-cream-50 border border-cream-200 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white transition-colors duration-150 text-emerald-700 tabular-nums'
                />
              </label>
              <label className='block'>
                <div className='text-sm text-ink-500 mb-1'>Out</div>
                <input
                  type='number'
                  inputMode='decimal'
                  min='0'
                  step='0.01'
                  value={entry.out}
                  onChange={(e) =>
                    onUpdate('out', Math.max(0, parseFloat(e.target.value) || 0))
                  }
                  className='w-full px-3 py-3 bg-cream-50 border border-cream-200 rounded-lg focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 focus:bg-white transition-colors duration-150 text-rose-700 tabular-nums'
                />
              </label>
            </div>

            <div className='grid grid-cols-2 gap-3 items-end'>
              <label className='block'>
                <div className='text-sm text-ink-500 mb-1'>Sign</div>
                <input
                  type='text'
                  value={entry.sign}
                  onChange={(e) => onUpdate('sign', e.target.value)}
                  placeholder='Initials'
                  maxLength={10}
                  className='w-full px-3 py-3 bg-cream-50 border border-cream-200 rounded-lg focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150'
                />
              </label>

              <div className='text-center'>
                <div
                  className={`px-3 py-2 rounded-lg text-center font-semibold tabular-nums ${
                    entry.balance >= 0
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {entry.balance.toFixed(2)}
                </div>
              </div>
            </div>

            {isConfirmingDelete ? (
              <div className='row-enter flex items-center justify-between gap-2 w-full bg-rose-50 border border-rose-100 rounded-lg px-3 py-2.5'>
                <span className='text-sm text-rose-800 font-medium'>Delete this entry?</span>
                <div className='flex gap-2 flex-shrink-0'>
                  <button
                    onClick={onCancelDelete}
                    className='px-3 py-1.5 text-sm rounded-lg border border-cream-200 bg-white hover:bg-cream-50 transition duration-150 ease-out active:scale-[0.97]'
                  >
                    No
                  </button>
                  <button
                    onClick={onConfirmDelete}
                    className='px-3 py-1.5 text-sm rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition duration-150 ease-out active:scale-[0.97]'
                  >
                    Yes, delete
                  </button>
                </div>
              </div>
            ) : (
              <div className='row-enter flex justify-end gap-2 pt-2'>
                <button
                  onClick={onDuplicate}
                  className='px-3 py-2 text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition duration-150 ease-out active:scale-[0.96]'
                  title='Duplicate row'
                >
                  <span className='inline-flex items-center gap-1.5'>
                    <Copy className='w-4 h-4' /> Duplicate
                  </span>
                </button>
                <button
                  onClick={onRequestDelete}
                  className='px-3 py-2 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition duration-150 ease-out active:scale-[0.96]'
                  title='Delete row'
                >
                  <span className='inline-flex items-center gap-1.5'>
                    <Trash2 className='w-4 h-4' /> Delete
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
