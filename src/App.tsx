import { useState } from 'react'
import { useInventory } from './hooks/useInventory'
import { Header } from './components/Header'
import { Summary } from './components/Summary'
import { FilterControls } from './components/FilterControls'
import { InventoryTable } from './components/InventoryTable'
import { ConfirmDialog } from './components/ConfirmDialog'
import { StartingBalanceDialog } from './components/StartingBalanceDialog'
// Removed CSV/Print utilities

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
  } = useInventory()

  const [showClearDialog, setShowClearDialog] = useState(false)
  const [showBalanceDialog, setShowBalanceDialog] = useState(false)

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
    <div
      className='min-h-screen bg-gradient-to-br from-orange-50 to-pink-50'
      style={{ backgroundColor: '#FFE8E5' }}
    >
      <Header
        businessLine={state.businessLine}
        department={state.department}
        onBusinessInfoChange={updateBusinessInfo}
      />

      <main className='max-w-7xl mx-auto p-6'>
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

        <InventoryTable
          entries={filteredEntries}
          onUpdateEntry={updateEntry}
          onDeleteEntry={deleteEntry}
          onDuplicateEntry={duplicateEntry}
        />

        {filteredEntries.length === 0 && state.entries.length > 0 && (
          <div className='bg-white rounded-lg shadow-md p-8 text-center mt-6'>
            <div className='text-gray-500'>
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

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          table {
            break-inside: avoid;
          }
          
          tr {
            break-inside: avoid;
          }
          
          thead {
            display: table-header-group;
          }
          
          .bg-gradient-to-br {
            background: white !important;
          }
          
          .shadow-md {
            box-shadow: none !important;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .group:hover .opacity-0 {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default App
