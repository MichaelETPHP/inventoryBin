import React from 'react'
import { Settings, Database, Check, Plus } from 'lucide-react'
import { HelpPopover } from './HelpPopover'

interface MobileActionBarProps {
  onAddEntry: () => void
  onSetStartingBalance: () => void
  onConnectMasterJson: () => void
  onOpenTour: () => void
  isConnected?: boolean
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onAddEntry,
  onSetStartingBalance,
  onConnectMasterJson,
  onOpenTour,
  isConnected,
}) => {
  return (
    <nav
      className='sm:hidden fixed inset-x-0 bottom-0 z-40 print:hidden'
      aria-label='Primary actions'
    >
      <div className='relative bg-white/95 backdrop-blur border-t border-cream-200 safe-bottom shadow-[0_-4px_16px_-8px_rgba(58,23,20,0.15)]'>
        <div className='grid grid-cols-5 items-center h-16'>
          <button
            data-tour-id='set-balance'
            onClick={onSetStartingBalance}
            className='col-span-2 flex flex-col items-center justify-center gap-1 h-full text-ink-700 active:scale-[0.95] transition duration-150 ease-out'
          >
            <Settings className='w-5 h-5' />
            <span className='text-[10px] font-medium tracking-wide'>Balance</span>
          </button>

          {/* Spacer for the raised FAB */}
          <div className='col-span-1' />

          <button
            data-tour-id='connect-server'
            onClick={onConnectMasterJson}
            disabled={!!isConnected}
            className={`col-span-1 flex flex-col items-center justify-center gap-1 h-full active:scale-[0.95] transition duration-150 ease-out ${
              isConnected ? 'text-emerald-600' : 'text-ink-700'
            }`}
          >
            {isConnected ? <Check className='w-5 h-5' /> : <Database className='w-5 h-5' />}
            <span className='text-[10px] font-medium tracking-wide'>
              {isConnected ? 'Synced' : 'Connect'}
            </span>
          </button>

          <HelpPopover variant='tab' onOpenTour={onOpenTour} />
        </div>

        <button
          data-tour-id='add-row'
          onClick={onAddEntry}
          aria-label='Add row'
          className='absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-brand-700 text-white shadow-panel-lg flex items-center justify-center active:scale-[0.92] transition duration-150 ease-out ring-4 ring-cream-50'
        >
          <Plus className='w-6 h-6' />
        </button>
      </div>
    </nav>
  )
}
