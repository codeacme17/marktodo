import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'

/**
 * A custom React hook that provides a way to store and retrieve data from the browser's local storage.
 *
 * @template T - The type of data to be stored in the local storage.
 * @param {string} storageKey - The key to be used for storing and retrieving data from the local storage.
 * @param {T} initialValue - The initial value to be used if no data is found in the local storage.
 * @returns {[storageData: T, setStorageData: (value: T) => void]} - An array containing the current value of the stored data and a function to update the stored data.
 *
 * @example
 * const [storageData, setStorageData] = useStorage('my-storage-key', 'my-initial-value')
 */
export const useStorage = <T>(
  storageKey: string,
  initialValue: T,
): [storageData: T, setStorageData: (value: T) => void] => {
  const [storageData, setStorageData] = useState<T>(initialValue)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const storageData = await browser.storage.local.get([storageKey])
        setStorageData(storageData[storageKey] || initialValue)
      } catch (error) {
        console.error('Failed to fetch initial data:', error)
      }
    }

    fetchInitialData()
  }, [initialValue])

  useEffect(() => {
    const getData = async () => {
      try {
        await browser.storage.local.set({ [storageKey]: storageData })
      } catch (error) {
        console.error('Failed to set data:', error)
      }
    }

    getData()
  }, [storageData, storageKey])

  return [storageData, setStorageData]
}
