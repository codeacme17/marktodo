import browser from 'webextension-polyfill'
import { addDataToStrageList, getStoragedDataList } from '@/lib/handle-storage'
import { ListDataItem } from '@/lib/types'
import { ACTION } from '@/lib/constants'

setBadgeContent()

browser.runtime.onInstalled.addListener(async () => {
  browser.contextMenus.create({
    id: 'marktodo-menu-item',
    title: browser.i18n.getMessage('extension_name'),
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-title',
    parentId: 'marktodo-menu-item',
    title: browser.i18n.getMessage('menu_title'),
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
    title: '  ' + browser.i18n.getMessage('menu_critical'),
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-moderate',
    parentId: 'marktodo-menu-item',
    title: '  ' + browser.i18n.getMessage('menu_moderate'),
    contexts: ['link'],
  })

  browser.contextMenus.create({
    id: 'sub-menu-mild',
    parentId: 'marktodo-menu-item',
    title: '  ' + browser.i18n.getMessage('menu_mild'),
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

browser.storage.onChanged.addListener(async (changes) => {
  if (!changes['marktodo-data-list']) return
  setBadgeContent()
})

function setBadgeContent() {
  getStoragedDataList().then((list) => {
    browser.action.setBadgeText({
      text: !!list.length ? list.length.toString() : null,
    })
  })

  browser.action.setBadgeBackgroundColor({
    color: '#1D2837',
  })
}
