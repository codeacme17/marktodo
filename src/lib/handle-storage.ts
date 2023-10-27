import browser from 'webextension-polyfill'
import { TableDataItem } from '@/components/mark-table'
import { generateSrcLabel } from '@/lib/utils'

export type StorageKey = 'marktodo-data-list'

export const getStoragedDataList = async (): Promise<
  TableDataItem[]
> => {
  const storageResult = await browser.storage.local.get([
    'marktodo-data-list',
  ])

  const storagedDataList: TableDataItem[] =
    storageResult['marktodo-data-list'] || []

  return storagedDataList
}

// Handle local storagre events
export async function addDataToStrageList(
  data: TableDataItem,
  tab: browser.Tabs.Tab
) {
  const storagedDataList = await getStoragedDataList()
  // If the link is already in the list
  const isThere = storagedDataList.find(
    (item) => item.src === data.src
  )
  if (isThere) {
    return await browser.tabs.sendMessage(tab.id!, {
      action: 'show-toast',
      message: 'The link is already in the list.',
      type: 'error',
    })
  }

  // Add the link to the list
  storagedDataList.push({
    label: data.label,
    src: data.src,
    srcLabel: generateSrcLabel(data.src),
    iconUrl: data.iconUrl,
    priority: data.priority,
  })

  // Save the list to local storage
  await browser.storage.local.set({
    'marktodo-data-list': storagedDataList,
  })

  await browser.tabs.sendMessage(tab.id!, {
    action: 'show-toast',
    message: 'Marked to to-do list',
    type: 'primary',
  })
}
