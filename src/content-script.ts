// Both lines below just added to make build files look different than the source file.
import browser from 'webextension-polyfill'
console.log(
  `Content script from ${browser.runtime.getManifest().name}!`
)

// Throw a fake error.
throw new Error('fake error')

// import browser from 'webextension-polyfill'

// let lastRightClickedLinkText: any = null

// console.log('content script loaded')

// document.addEventListener('contextmenu', (event) => {
//   console.log(event.target!)
//   if (event.target instanceof HTMLAnchorElement) {
//     lastRightClickedLinkText = event.target.textContent
//   }
// })

// browser.runtime.onMessage.addListener(
//   (message, sender, sendResponse: any) => {
//     if (message.action === 'get-link-text') {
//       sendResponse({ linkText: lastRightClickedLinkText })
//       lastRightClickedLinkText = null // Optionally reset after use
//     }
//   }
// )
