import browser from 'webextension-polyfill'
import { TableDataItem, Priority } from '@/components/mark-table'

// Handle local storagre events
export async function handleStorage(
  response: any,
  info: any,
  tab: browser.Tabs.Tab,
  priority: Priority
) {
  const storageResult = await browser.storage.local.get([
    'marktodo-data-list',
  ])

  const storagedDataList: TableDataItem[] =
    storageResult['marktodo-data-list'] || []

  // If the link is already in the list
  const isThere = storagedDataList.find(
    (item) => item.src === info.linkUrl
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
    label: response.linkText,
    src: info.linkUrl,
    srcLabel: generateSrcLabel(info.linkUrl),
    iconUrl: response.iconUrl,
    priority: priority,
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

function generateSrcLabel(urlString: string): string {
  const url = new URL(urlString)
  return url.hostname
}
