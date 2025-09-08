import React, { useState } from 'react';
import { Settings } from 'lucide-react';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numBalance = parseFloat(balance) || 0;
    onConfirm(numBalance);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="bg-amber-50 px-6 py-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-amber-600" />
            <h3 className="text-lg font-bold text-gray-900">Set Starting Balance</h3>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <p className="text-gray-700 mb-4">
            Set the starting balance for your inventory. This will recalculate all entries.
          </p>
          
          <div>
            <label htmlFor="startingBalance" className="block text-sm font-medium text-gray-700 mb-2">
              Starting Balance:
            </label>
            <input
              id="startingBalance"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              autoFocus
            />
          </div>
        </form>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
          >
            Set Balance
          </button>
        </div>
      </div>
    </div>
  );
};