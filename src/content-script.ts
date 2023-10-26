import browser from 'webextension-polyfill'

console.log('content script loaded')

let linkText: any = null
let iconUrl: string = ''

document.addEventListener('contextmenu', (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return

  const iconElement = document.querySelector(
    'link[rel="icon"], link[rel="shortcut icon"]'
  ) as HTMLLinkElement

  if (iconElement && iconElement.href) iconUrl = iconElement.href

  if (event.target.hash === '') {
    linkText = event.target.textContent
  } else linkText = event.target.hash
})

browser.runtime.onMessage.addListener((message, sender, sendResponse: any) => {
  if (message.action !== 'get-link-text') return
  sendResponse({ linkText, iconUrl })
  linkText = null
  iconUrl = ''
})
