import { useState, useEffect, useCallback, useRef } from 'react'
import {
  InventoryState,
  InventoryEntry,
  FilterState,
  SummaryStats,
} from '../types'
import { saveToStorage, loadFromStorage } from '../utils/storage'
import {
  getStoredHandle,
  verifyPermission,
  readFromHandle,
  writeToHandle,
  getOrCreateMasterFile,
} from '../utils/fileAccess'
import { recalculateAllBalances } from '../utils/calculations'

const initialState: InventoryState = {
  businessLine: 'BAR & RESTAURANT',
  department: 'Premium Service',
  entries: [],
  startingBalance: 0,
}

export const useInventory = () => {
  const [state, setState] = useState<InventoryState>(initialState)
  const stateRef = useRef<InventoryState>(initialState)
  const [filter, setFilter] = useState<FilterState>({
    searchTerm: '',
    startDate: '',
    endDate: '',
  })
  const [fileHandle, setFileHandle] = useState<any>(null)
  const writeTimeoutRef = useRef<any>(null)

  // Load data from localStorage on mount
  useEffect(() => {
    // Show the tour on first load
    try {
      if (!localStorage.getItem('tour_shown')) {
        const evt = new CustomEvent('open_tour')
        window.dispatchEvent(evt)
      }
    } catch {}

    const stored = loadFromStorage()
    if (stored) {
      setState(stored)
      stateRef.current = stored
    }

    // Try to attach to existing jd.json handle and load data
    ;(async () => {
      try {
        const handle = await getStoredHandle()
        if (handle && (await verifyPermission(handle, true))) {
          setFileHandle(handle)
          const fileData = await readFromHandle<InventoryState>(handle)
          if (fileData && typeof fileData === 'object') {
            setState((prev) => ({
              businessLine: fileData.businessLine || prev.businessLine || '',
              department: fileData.department || prev.department || '',
              startingBalance:
                fileData.startingBalance || prev.startingBalance || 0,
              entries: recalculateAllBalances(
                (fileData.entries || []).map((e, index) => ({
                  ...e,
                  no: index + 1,
                })),
                fileData.startingBalance || prev.startingBalance || 0
              ),
            }))
          }
        }
      } catch {
        // ignore
      }
    })()

    return () => {}
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(state)
    stateRef.current = state
  }, [state])

  // Persist to master jd.json whenever state changes (debounced)
  useEffect(() => {
    if (!fileHandle) return
    if (writeTimeoutRef.current) clearTimeout(writeTimeoutRef.current)
    writeTimeoutRef.current = setTimeout(async () => {
      try {
        if (await verifyPermission(fileHandle, true)) {
          await writeToHandle(fileHandle, state)
        }
      } catch {
        // ignore write errors
      }
    }, 1500)
    return () => {
      if (writeTimeoutRef.current) clearTimeout(writeTimeoutRef.current)
    }
  }, [state, fileHandle])

  const updateBusinessInfo = useCallback(
    (businessLine: string, department: string) => {
      setState((prev) => ({ ...prev, businessLine, department }))
    },
    []
  )

  const addEntry = useCallback(() => {
    const newEntry: InventoryEntry = {
      id: Date.now().toString(),
      no: state.entries.length + 1,
      date: new Date().toISOString().split('T')[0],
      notes: '',
      in: 0,
      out: 0,
      balance: 0,
      sign: '',
    }

    setState((prev) => {
      const newEntries = [...prev.entries, newEntry]
      return {
        ...prev,
        entries: recalculateAllBalances(newEntries, prev.startingBalance),
      }
    })
  }, [state.entries.length])

  const updateEntry = useCallback(
    (id: string, field: keyof InventoryEntry, value: any) => {
      setState((prev) => {
        const updatedEntries = prev.entries.map((entry) =>
          entry.id === id ? { ...entry, [field]: value } : entry
        )

        // Recalculate balances for all entries
        const entriesWithBalances = recalculateAllBalances(
          updatedEntries,
          prev.startingBalance
        )

        return { ...prev, entries: entriesWithBalances }
      })
    },
    []
  )

  const deleteEntry = useCallback((id: string) => {
    setState((prev) => {
      const filteredEntries = prev.entries
        .filter((entry) => entry.id !== id)
        .map((entry, index) => ({ ...entry, no: index + 1 }))

      return {
        ...prev,
        entries: recalculateAllBalances(filteredEntries, prev.startingBalance),
      }
    })
  }, [])

  const duplicateEntry = useCallback((id: string) => {
    setState((prev) => {
      const originalEntry = prev.entries.find((entry) => entry.id === id)
      if (!originalEntry) return prev

      const duplicatedEntry: InventoryEntry = {
        ...originalEntry,
        id: Date.now().toString(),
        no: prev.entries.length + 1,
        date: new Date().toISOString().split('T')[0],
      }

      const newEntries = [...prev.entries, duplicatedEntry]
      return {
        ...prev,
        entries: recalculateAllBalances(newEntries, prev.startingBalance),
      }
    })
  }, [])

  const clearAllData = useCallback(() => {
    setState(initialState)
  }, [])

  const setStartingBalance = useCallback((balance: number) => {
    setState((prev) => ({
      ...prev,
      startingBalance: balance,
      entries: recalculateAllBalances(prev.entries, balance),
    }))
  }, [])

  const loadFromJson = useCallback((data: InventoryState) => {
    setState((prev) => {
      // Prefer existing business info if already set; otherwise take from imported data
      const mergedBusinessLine = prev.businessLine || data.businessLine || ''
      const mergedDepartment = prev.department || data.department || ''

      // Merge entries by id; append new ones, keep existing ones
      const existingIds = new Set(prev.entries.map((e) => e.id))
      const incomingSanitized = (data.entries || []).map((e) => ({
        ...e,
        id: e.id ?? Date.now().toString(),
        notes: e.notes ?? '',
        sign: e.sign ?? '',
      }))
      const newIncoming = incomingSanitized.filter(
        (e) => !existingIds.has(e.id)
      )
      const mergedEntries = [...prev.entries, ...newIncoming].map(
        (entry, index) => ({
          ...entry,
          no: index + 1,
        })
      )

      // Decide on starting balance: keep existing if set; otherwise use imported
      const mergedStartingBalance =
        prev.startingBalance || data.startingBalance || 0

      return {
        businessLine: mergedBusinessLine,
        department: mergedDepartment,
        entries: recalculateAllBalances(mergedEntries, mergedStartingBalance),
        startingBalance: mergedStartingBalance,
      }
    })
  }, [])

  const manualSave = useCallback(() => {
    ;(async () => {
      try {
        let handle = fileHandle
        if (!handle) {
          handle = await getOrCreateMasterFile()
          if (handle) setFileHandle(handle)
        }
        if (handle && (await verifyPermission(handle, true))) {
          await writeToHandle(handle, stateRef.current)
        }
      } catch {
        // ignore
      }
    })()
  }, [fileHandle])

  // Allow user to connect or create the master jd.json once
  const connectMasterJson = useCallback(async () => {
    try {
      const handle = await getOrCreateMasterFile()
      if (handle) {
        setFileHandle(handle)
        const fileData = await readFromHandle<InventoryState>(handle)
        if (fileData) {
          setState((prev) => ({
            businessLine: fileData.businessLine || prev.businessLine || '',
            department: fileData.department || prev.department || '',
            startingBalance:
              fileData.startingBalance || prev.startingBalance || 0,
            entries: recalculateAllBalances(
              (fileData.entries || []).map((e, index) => ({
                ...e,
                no: index + 1,
              })),
              fileData.startingBalance || prev.startingBalance || 0
            ),
          }))
        } else {
          // Write current state to initialize the file
          await writeToHandle(handle, stateRef.current)
        }
      }
    } catch {
      // ignore
    }
  }, [])
  // Filter entries based on search and date range
  const filteredEntries = state.entries.filter((entry) => {
    const matchesSearch =
      entry.notes.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
      entry.sign.toLowerCase().includes(filter.searchTerm.toLowerCase())

    const matchesDateRange =
      (!filter.startDate || entry.date >= filter.startDate) &&
      (!filter.endDate || entry.date <= filter.endDate)

    return matchesSearch && matchesDateRange
  })

  // Calculate summary statistics
  const summaryStats: SummaryStats = {
    totalIn: filteredEntries.reduce((sum, entry) => sum + entry.in, 0),
    totalOut: filteredEntries.reduce((sum, entry) => sum + entry.out, 0),
    currentBalance:
      filteredEntries.length > 0
        ? filteredEntries[filteredEntries.length - 1].balance
        : state.startingBalance,
    entryCount: filteredEntries.length,
  }

  return {
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
    loadFromJson,
    manualSave,
    connectMasterJson,
    isConnected: !!fileHandle,
  }
}
