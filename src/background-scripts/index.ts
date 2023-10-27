import browser from 'webextension-polyfill'
import { handleStorage } from './handle-storage'

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
    title: 'critical ⭐️⭐️⭐️',
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-moderate',
    parentId: 'marktodo-menu-item',
    title: 'moderate ⭐️⭐️',
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-mild',
    parentId: 'marktodo-menu-item',
    title: 'mild ⭐️',
    contexts: ['link'],
  })
})

// Listen for clicks on the context menu item
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.linkUrl || !tab || !tab.id) return

  const contentScriptResponse = await browser.tabs.sendMessage(
    tab.id,
    {
      action: 'get-link-info',
    }
  )

  if (!contentScriptResponse || !contentScriptResponse.linkText)
    return

  switch (info.menuItemId) {
    case 'sub-menu-critical':
      await handleStorage(contentScriptResponse, info, tab, 3)
      break

    case 'sub-menu-moderate':
      await handleStorage(contentScriptResponse, info, tab, 2)
      break

    case 'sub-menu-mild':
      await handleStorage(contentScriptResponse, info, tab, 1)
      break

    default:
      console.warn('Unknown menu item clicked:', info.menuItemId)
      break
  }
})
