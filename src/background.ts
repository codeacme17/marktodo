import browser from 'webextension-polyfill'
import { TableDataItem } from '@/components/mark-table'

console.log('background script loaded')

// Init
browser.runtime.onInstalled.addListener(async () => {
  // Create a context menu which will only show up for link.
  browser.contextMenus.create({
    id: 'marktodo-menu-item',
    title: 'Mark to to-do list',
    contexts: ['link'],
  })
})

// Listen for clicks on the context menu item
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (
    info.menuItemId !== 'marktodo-menu-item' ||
    !info.linkUrl ||
    !tab?.id
  )
    return

  const response = await browser.tabs.sendMessage(tab.id, {
    action: 'get-link-text',
  })

  if (!response || !response.linkText) return
  await handleStorage(response, info, tab)
})

// Handle local storagre events
async function handleStorage(
  response: any,
  info: any,
  tab: browser.Tabs.Tab
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

  if (isThere)
    return await browser.tabs.sendMessage(tab.id!, {
      action: 'show-toast',
      message: 'The link is already in the list.',
      type: 'error',
    })

  storagedDataList.push({
    label: response.linkText,
    src: info.linkUrl,
    srcLabel: generateSrcLabel(info.linkUrl),
    iconUrl: response.iconUrl,
  })

  await browser.storage.local.set({
    'marktodo-data-list': storagedDataList,
  })
}

function generateSrcLabel(urlString: string): string {
  const url = new URL(urlString)
  return url.hostname
}
