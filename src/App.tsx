import React, { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import { Header } from './components/Header'
import { Summary } from './components/Summary'
import { FilterControls } from './components/FilterControls'
import { InventoryTable } from './components/InventoryTable'
import { ConfirmDialog } from './components/ConfirmDialog'
import { StartingBalanceDialog } from './components/StartingBalanceDialog'
import { MobileActionBar } from './components/MobileActionBar'
import { Toast } from './components/Toast'
// Removed CSV/Print utilities
import { Tour } from './components/Tour'

function App() {
  const {
    state,
    filter,
    setFilter,
    filteredEntries,
    summaryStats,
    updateBusinessInfo,
    addEntry,
    updateEntry,
    deleteEntry,
    duplicateEntry,
    clearAllData,
    setStartingBalance,
    connectMasterJson,
    isConnected,
    toast,
  } = useInventory()

  const [showClearDialog, setShowClearDialog] = useState(false)
  const [showBalanceDialog, setShowBalanceDialog] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)

  // Listen for open_tour event from hook
  React.useEffect(() => {
    const handler = () => setTourOpen(true)
    window.addEventListener('open_tour', handler)
    return () => window.removeEventListener('open_tour', handler)
  }, [])

  const handleClearAll = () => {
    if (state.entries.length > 0) {
      setShowClearDialog(true)
    }
  }

  const confirmClearAll = () => {
    clearAllData()
    setShowClearDialog(false)
  }

  const handleSetStartingBalance = () => {
    setShowBalanceDialog(true)
  }

  const confirmSetStartingBalance = (balance: number) => {
    setStartingBalance(balance)
    setShowBalanceDialog(false)
  }

  return (
    <div className='min-h-screen bg-cream-50'>
      <Header
        businessLine={state.businessLine}
        department={state.department}
        onBusinessInfoChange={updateBusinessInfo}
        onOpenTour={() => setTourOpen(true)}
      />

      <main className='max-w-7xl mx-auto p-6 pb-28 sm:pb-6'>
        <Summary stats={summaryStats} />

        <FilterControls
          filter={filter}
          onFilterChange={setFilter}
          onAddEntry={addEntry}
          onClearAll={handleClearAll}
          onSetStartingBalance={handleSetStartingBalance}
          onConnectMasterJson={connectMasterJson}
          isConnected={isConnected}
        />

        {/* Guided Tour (first-time) */}
        <Tour
          isOpen={tourOpen}
          onClose={() => {
            setTourOpen(false)
            try {
              localStorage.setItem('tour_shown', '1')
            } catch {}
          }}
          steps={[
            {
              id: 'connect-server',
              title: 'Connect to Server',
              text: 'Create or select your company JSON (e.g., companyName.json).',
            },
            {
              id: 'add-row',
              title: 'Add Row',
              text: 'Insert an inventory record: date, notes, amounts and signer.',
            },
            {
              id: 'set-balance',
              title: 'Set Balance',
              text: 'Optionally set a starting balance to calculate running totals.',
            },
            {
              id: 'clear-all',
              title: 'Clear All',
              text: 'Remove all entries when you want to reset the sheet.',
            },
          ]}
        />

        <InventoryTable
          entries={filteredEntries}
          onUpdateEntry={updateEntry}
          onDeleteEntry={deleteEntry}
          onDuplicateEntry={duplicateEntry}
        />

        {filteredEntries.length === 0 && state.entries.length > 0 && (
          <div className='bg-white rounded-xl shadow-panel border border-cream-200 p-8 text-center mt-6'>
            <div className='text-ink-500'>
              No entries match your current filters. Try adjusting your search
              criteria.
            </div>
          </div>
        )}
      </main>

      <ConfirmDialog
        isOpen={showClearDialog}
        title='Clear All Data'
        message='Are you sure you want to clear all inventory data? This action cannot be undone.'
        confirmText='Clear All'
        cancelText='Cancel'
        type='danger'
        onConfirm={confirmClearAll}
        onCancel={() => setShowClearDialog(false)}
      />

      <StartingBalanceDialog
        isOpen={showBalanceDialog}
        currentBalance={state.startingBalance}
        onConfirm={confirmSetStartingBalance}
        onCancel={() => setShowBalanceDialog(false)}
      />

      <MobileActionBar
        onAddEntry={addEntry}
        onSetStartingBalance={handleSetStartingBalance}
        onConnectMasterJson={connectMasterJson}
        onOpenTour={() => setTourOpen(true)}
        isConnected={isConnected}
      />

      <Toast toast={toast} />
    </div>
  )
}

export default App
