import browser from 'webextension-polyfill'
import { addDataToStrageList } from '@/lib/handle-storage'
import { ListDataItem } from '@/components/mark-table'
import { ACTION } from '@/lib/constants'

browser.runtime.onInstalled.addListener(async () => {
  browser.contextMenus.create({
    id: 'marktodo-menu-item',
    title: 'marktodo',
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-title',
    parentId: 'marktodo-menu-item',
    title: 'Choose a priority',
    enabled: false,
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-separator',
    parentId: 'marktodo-menu-item',
    type: 'separator',
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-critical',
    parentId: 'marktodo-menu-item',
    title: '  critical',
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-moderate',
    parentId: 'marktodo-menu-item',
    title: '  moderate',
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-mild',
    parentId: 'marktodo-menu-item',
    title: '  mild',
    contexts: ['link'],
  })
})

// Listen for clicks on the context menu item
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.linkUrl || !tab || !tab.id) return

  const response = await browser.tabs.sendMessage(tab.id, {
    action: ACTION.GET_LINK_INFO,
  })

  if (!response || !response.linkText) return

  const data: ListDataItem = {
    label: response.linkText,
    src: info.linkUrl,
    srcLabel: '',
    iconUrl: response.iconUrl,
    priority: 1,
  }

  switch (info.menuItemId) {
    case 'sub-menu-critical':
      data.priority = 3
      break

    case 'sub-menu-moderate':
      data.priority = 2
      break

    case 'sub-menu-mild':
      data.priority = 1
      break

    default:
      console.warn('Unknown menu item clicked:', info.menuItemId)
      break
  }

  await addDataToStrageList(data, tab)
})

browser.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  browser.tabs.sendMessage(details.tabId, {
    action: ACTION.TAB_URL_UPDATE,
    url: details.url,
  })
})
