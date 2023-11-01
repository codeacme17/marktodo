import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { StorageKey } from '@/lib/handle-storage'
import { ListDataItem } from '@/lib/types'

/**
 * A custom hook to manage a list of data stored in the browser's local storage.
 * The hook returns the current state of the stored data list and a function to update it.
 * It also sets up a listener to sync the state whenever the specified local storage item changes.
 *
 * @param {StorageKey} storageKey - The key under which the data list is stored in local storage.
 * @returns {[ListDataItem[], (data: ListDataItem[]) => void]} - A tuple where:
 *   - The first element is the current state of the stored data list.
 *   - The second element is a function to update the stored data list.
 *
 * @example
 * const [storagedDataList, updateStoragedDataList] = useStoragedDataList('my-storage-key');
 */
export const useStoragedDataList = (
  storageKey: StorageKey,
): [ListDataItem[], (data: ListDataItem[]) => void] => {
  const [storagedDataList, setStoragedDataList] = useState<ListDataItem[]>([])

  browser.storage.local.onChanged.addListener((changes) => {
    setStoragedDataList(changes[storageKey].newValue)
  })

  const updateStoragedDataList = (data: ListDataItem[]) => {
    browser.storage.local.set({ [storageKey]: data })
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      const storageData = await browser.storage.local.get([storageKey])
      const storagedDataList = storageData[storageKey] || []

      setStoragedDataList(storagedDataList)
    }

    fetchInitialData()
  }, [])

  return [storagedDataList, updateStoragedDataList]
}
