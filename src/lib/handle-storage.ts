import browser from 'webextension-polyfill'
import { ListDataItem } from '@/lib/types'
import { generateSrcLabel, generateLabel } from '@/lib/utils'
import { ACTION } from '@/lib/constants'

export type StorageKey = 'marktodo-data-list'

export const getStoragedDataList = async (): Promise<ListDataItem[]> => {
  const storageResult = await browser.storage.local.get(['marktodo-data-list'])

  const storagedDataList: ListDataItem[] =
    storageResult['marktodo-data-list'] || []

  return storagedDataList
}

// Handle local storagre events
export async function addDataToStrageList(
  data: ListDataItem,
  tab: browser.Tabs.Tab,
) {
  const storagedDataList = await getStoragedDataList()
  // If the link is already in the list
  const isThere = storagedDataList.find((item) => item.src === data.src)
  if (isThere) {
    return await browser.tabs.sendMessage(tab.id!, {
      action: ACTION.SHOW_TOAST,
      message: browser.i18n.getMessage('hint_duplicated'),
      type: 'error',
    })
  }

  // Add the link to the list
  storagedDataList.push({
    label: generateLabel(data.label),
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
    action: ACTION.SHOW_TOAST,
    message: browser.i18n.getMessage('hint_marked'),
    type: 'primary',
  })
}
