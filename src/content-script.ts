import browser from 'webextension-polyfill'

console.log('content script loaded')

let lastRightClickedLinkText: any = null

document.addEventListener('contextmenu', (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return

  if (event.target.hash === '') {
    lastRightClickedLinkText = event.target.textContent
  } else lastRightClickedLinkText = event.target.hash
})

browser.runtime.onMessage.addListener(
  (message, sender, sendResponse: any) => {
    if (message.action !== 'get-link-text') return
    sendResponse({ linkText: lastRightClickedLinkText })
    lastRightClickedLinkText = null
  }
)
