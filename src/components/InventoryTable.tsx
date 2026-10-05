import React, { useEffect, useRef, useState } from 'react'
import { InventoryEntry } from '../types'
import { InventoryRow } from './InventoryRow'
import { MobileEntryCard } from './MobileEntryCard'

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
  // Mobile accordion: only one entry open at a time. A freshly added
  // entry opens itself and collapses whatever was open before it.
  const [expandedId, setExpandedId] = useState<string | null>(
    entries[0]?.id ?? null
  )
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const prevIdsRef = useRef<string[]>(entries.map((e) => e.id))

  useEffect(() => {
    const prevIds = prevIdsRef.current
    const addedEntry = entries.find((e) => !prevIds.includes(e.id))

    if (addedEntry) {
      setExpandedId(addedEntry.id)
    } else if (expandedId && !entries.some((e) => e.id === expandedId)) {
      // The expanded entry was deleted — fall back to the first remaining one.
      setExpandedId(entries[0]?.id ?? null)
    }

    prevIdsRef.current = entries.map((e) => e.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries])

  const toggleExpanded = (id: string) => {
    setConfirmDeleteId(null)
    setExpandedId((curr) => (curr === id ? null : id))
  }

  if (entries.length === 0) {
    return (
      <div className='bg-white rounded-xl shadow-panel border border-cream-200 p-16 text-center'>
        <div className='text-ink-500'>
          No inventory entries yet. Click "Add Row" to get started.
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-xl shadow-panel border border-cream-200 overflow-hidden'>
      {/* Mobile: accordion card list */}
      <div className='md:hidden divide-y divide-cream-200'>
        {entries.map((entry) => (
          <MobileEntryCard
            key={entry.id}
            entry={entry}
            isOpen={expandedId === entry.id}
            isConfirmingDelete={confirmDeleteId === entry.id}
            onToggle={() => toggleExpanded(entry.id)}
            onUpdate={(field, value) => onUpdateEntry(entry.id, field, value)}
            onDuplicate={() => onDuplicateEntry(entry.id)}
            onRequestDelete={() => setConfirmDeleteId(entry.id)}
            onCancelDelete={() => setConfirmDeleteId(null)}
            onConfirmDelete={() => {
              onDeleteEntry(entry.id)
              setConfirmDeleteId(null)
            }}
          />
        ))}
      </div>

      {/* Desktop: table */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-brand-900 sticky top-0 z-10'>
            <tr>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                No
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                Date
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                Notes (Name)
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                In
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                Out
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                Balance
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide'>
                Sign
              </th>
              <th className='px-4 py-3.5 text-left text-xs font-semibold text-gold-100 uppercase tracking-wide print:hidden'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-cream-200'>
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
