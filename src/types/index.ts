export interface InventoryEntry {
  id: string;
  no: number;
  date: string;
  notes: string;
  in: number;
  out: number;
  balance: number;
  sign: string;
}

export interface InventoryState {
  businessLine: string;
  department: string;
  entries: InventoryEntry[];
  startingBalance: number;
}

export interface FilterState {
  searchTerm: string;
  startDate: string;
  endDate: string;
}

export interface SummaryStats {
  totalIn: number;
  totalOut: number;
  currentBalance: number;
  entryCount: number;
}