import browser from 'webextension-polyfill'

// Create a context menu item
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: 'marktodo-menu-item',
    title: 'Mark to to-do list',
    contexts: ['link'],
  })
})

// Listen for clicks on the context menu item
browser.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info)
  if (
    info.menuItemId === 'marktodo-menu-item' &&
    info.linkUrl &&
    tab?.id
  ) {
    browser.tabs
      .sendMessage(tab.id, { action: 'get-link-text' })
      .then((response) => {
        if (response && response.linkText) {
          localStorage.setItem('linkUrl', info.linkUrl!)
          localStorage.setItem('linkText', response.linkText)
        }
      })
      .catch((error) =>
        console.error('Error sending message:', error)
      )
  }
})

const handleLinkUrl = (linkUrl: string) => {
  const res = {
    label: '779. K-th Symbol in Grammarl',
    src: 'https://leetcode.com/problems/k-th-symbol-in-grammar/?envType=daily-question&envId=2023-10-25',
    srcLabel: 'leetcode.com',
  }
}
