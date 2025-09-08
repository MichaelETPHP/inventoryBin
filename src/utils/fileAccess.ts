// Minimal File System Access + IndexedDB helpers to manage a single jd.json file
// This enables reading/writing a persistent file after the user grants access once.

import { InventoryState } from '../types'

const DB_NAME = 'jd-file-db'
const STORE_NAME = 'handles'
const HANDLE_KEY = 'jd-json-handle'

const isFsAccessSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    (!!(window as any).showOpenFilePicker ||
      !!(window as any).showSaveFilePicker) &&
    'indexedDB' in window
  )
}

const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const idbGet = async <T = any>(key: string): Promise<T | null> => {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const req = store.get(key)
    req.onsuccess = () => resolve((req.result as T) ?? null)
    req.onerror = () => reject(req.error)
  })
}

const idbSet = async (key: string, value: any): Promise<void> => {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.put(value, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

const idbDel = async (key: string): Promise<void> => {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export const getStoredHandle =
  async (): Promise<FileSystemFileHandle | null> => {
    if (!isFsAccessSupported()) return null
    try {
      const handle = await idbGet<FileSystemFileHandle>(HANDLE_KEY)
      return handle ?? null
    } catch {
      return null
    }
  }

export const storeHandle = async (
  handle: FileSystemFileHandle
): Promise<void> => {
  if (!isFsAccessSupported()) return
  await idbSet(HANDLE_KEY, handle)
}

export const clearStoredHandle = async (): Promise<void> => {
  if (!isFsAccessSupported()) return
  await idbDel(HANDLE_KEY)
}

export const verifyPermission = async (
  handle: FileSystemFileHandle,
  readWrite: boolean
): Promise<boolean> => {
  try {
    const opts: any = { mode: readWrite ? 'readwrite' : 'read' }
    // @ts-ignore queryPermission is supported in FS Access API contexts
    let permission: PermissionState = await (handle as any).queryPermission(
      opts
    )
    if (permission === 'granted') return true
    // @ts-ignore requestPermission is supported in FS Access API contexts
    permission = await (handle as any).requestPermission(opts)
    return permission === 'granted'
  } catch {
    return false
  }
}

export const pickOrCreateMasterFile =
  async (): Promise<FileSystemFileHandle | null> => {
    if (!isFsAccessSupported()) return null
    // Try to pick existing jd.json first
    try {
      const open: any = (window as any).showOpenFilePicker
      if (open) {
        const [picked] = await open({
          multiple: false,
          types: [
            {
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] },
            },
          ],
        })
        if (picked && picked.name && picked.name.toLowerCase() === 'jd.json') {
          await storeHandle(picked)
          return picked
        }
      }
    } catch {
      // fall through to save picker
    }
    try {
      const save: any = (window as any).showSaveFilePicker
      if (save) {
        const handle: FileSystemFileHandle = await save({
          suggestedName: 'jd.json',
          types: [
            {
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] },
            },
          ],
        })
        await storeHandle(handle)
        return handle
      }
    } catch {
      return null
    }
    return null
  }

export const getOrCreateMasterFile =
  async (): Promise<FileSystemFileHandle | null> => {
    if (!isFsAccessSupported()) return null
    let handle = await getStoredHandle()
    if (handle) {
      if (await verifyPermission(handle, true)) return handle
    }
    handle = await pickOrCreateMasterFile()
    if (handle && (await verifyPermission(handle, true))) return handle
    return null
  }

export const readFromHandle = async <T = any>(
  handle: FileSystemFileHandle
): Promise<T | null> => {
  try {
    const file = await handle.getFile()
    const text = await file.text()
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

export const writeToHandle = async (
  handle: FileSystemFileHandle,
  data: InventoryState
): Promise<void> => {
  const writable = await handle.createWritable()
  await writable.write(
    new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  )
  await writable.close()
}

export const isFileSystemAccessAvailable = (): boolean => isFsAccessSupported()
