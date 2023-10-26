import { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'
import { TableDataItem } from '@/components/mark-table'

/**
 * @description:
 * 1. get the data from local storage
 * 2. modify the data and store to local storage
 * 3. all need reactively
 *
 */

export const useStoragedDataList = (): [
  TableDataItem[],
  (data: TableDataItem[]) => void
] => {
  const [storagedDataList, setStoragedDataList] = useState<TableDataItem[]>([])

  browser.storage.local.onChanged.addListener((changes) => {
    setStoragedDataList(changes['marktodo-data-list'].newValue)
  })

  useEffect(() => {
    const fetchInitialData = async () => {
      const storageData = await browser.storage.local.get([
        'marktodo-data-list',
      ])
      setStoragedDataList(storageData['marktodo-data-list'] || [])
    }

    fetchInitialData()
  }, [])

  const updateStoragedDataList = (data: TableDataItem[]) => {
    browser.storage.local.set({ 'marktodo-data-list': data })
    setStoragedDataList(data)
  }

  return [storagedDataList, updateStoragedDataList]
}
