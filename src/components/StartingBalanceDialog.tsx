import React, { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { usePresence } from '../hooks/usePresence';

interface StartingBalanceDialogProps {
  isOpen: boolean;
  currentBalance: number;
  onConfirm: (balance: number) => void;
  onCancel: () => void;
}

export const StartingBalanceDialog: React.FC<StartingBalanceDialogProps> = ({
  isOpen,
  currentBalance,
  onConfirm,
  onCancel
}) => {
  const [balance, setBalance] = useState(currentBalance.toString());
  const mounted = usePresence(isOpen);

  useEffect(() => {
    if (isOpen) setBalance(currentBalance.toString());
  }, [isOpen, currentBalance]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  if (!mounted) return null;

  const state = isOpen ? 'open' : 'closed';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numBalance = parseFloat(balance) || 0;
    onConfirm(numBalance);
  };

  return (
    <div
      data-state={state}
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink-900/0 backdrop-blur-0 transition-colors duration-300 ease-out data-[state=open]:bg-ink-900/50 data-[state=open]:backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="balance-dialog-title"
    >
      <div
        data-state={state}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-xl overflow-hidden shadow-panel-lg translate-y-full opacity-0 sm:translate-y-0 sm:scale-95 transition-[transform,opacity] duration-300 ease-drawer sm:ease-out-strong data-[state=open]:translate-y-0 data-[state=open]:opacity-100 sm:data-[state=open]:scale-100"
      >
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-9 h-1 rounded-full bg-cream-200" />
        </div>

        <div className="bg-gold-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-gold-700" />
            <h3 id="balance-dialog-title" className="text-lg font-semibold text-ink-900">Set Starting Balance</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <p className="text-ink-700 mb-4">
            Set the starting balance for your inventory. This will recalculate all entries.
          </p>

          <div>
            <label htmlFor="startingBalance" className="block text-sm font-medium text-ink-700 mb-1.5">
              Starting balance
            </label>
            <input
              id="startingBalance"
              type="number"
              step="0.01"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-cream-50 border border-cream-200 rounded-lg tabular-nums focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 focus:bg-white transition-colors duration-150"
              autoFocus
            />
          </div>
        </form>

        <div className="px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4 bg-cream-50 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-ink-700 border border-cream-200 rounded-lg hover:bg-white transition duration-150 ease-out active:scale-[0.97]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-brand-700 text-white rounded-lg hover:bg-brand-800 transition duration-150 ease-out active:scale-[0.97]"
          >
            Set Balance
          </button>
        </div>
      </div>
    </div>
  );
};
