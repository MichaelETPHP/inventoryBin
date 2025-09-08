import { InventoryEntry } from '../types';

export const calculateBalance = (
  entries: InventoryEntry[],
  currentIndex: number,
  startingBalance: number = 0
): number => {
  if (currentIndex === 0) {
    const entry = entries[0];
    return startingBalance + entry.in - entry.out;
  }

  let balance = startingBalance;
  for (let i = 0; i <= currentIndex; i++) {
    const entry = entries[i];
    balance += entry.in - entry.out;
  }
  return balance;
};

export const recalculateAllBalances = (
  entries: InventoryEntry[],
  startingBalance: number = 0
): InventoryEntry[] => {
  return entries.map((entry, index) => ({
    ...entry,
    balance: calculateBalance(entries, index, startingBalance)
  }));
};