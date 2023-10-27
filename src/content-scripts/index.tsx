import browser from 'webextension-polyfill'
import { injectToastAnimation, showToast } from '@/lib/handle-toast'

console.log('content script loaded')

// Inject the toast animation
injectToastAnimation()

let linkText: any = null // Link text to be sent to the background script
let iconUrl: string = '' // The Tab icon url to be sent to the background script

// Listen for context menu clicks,
// get the link text and send it to the background script
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

// Listen for messages from the background script
browser.runtime.onMessage.addListener(
  (message, sender, sendResponse: any) => {
    if (message.action === 'get-link-info')
      responseGetLinkInfoAction(sendResponse)

    if (message.action === 'show-toast')
      showToast({
        message: message.message,
        type: message.type,
      })
  }
)

// Send the link info to the background script
function responseGetLinkInfoAction(sendResponse: any) {
  sendResponse({ linkText, iconUrl })
  linkText = null
  iconUrl = ''
}
