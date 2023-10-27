import browser from 'webextension-polyfill'
import { injectToastAnimation, showToast } from '../lib/handle-toast'
import { renderLinkSymbolOnWeb } from '../lib/handle-link-symbol'
import { ListDataItem } from '@/components/mark-table'

// Inject the toast animation
injectToastAnimation()
// Render the symbol back to the marked links
renderLinkSymbolOnWeb()

let linkText: any = null // Link text to be sent to the background script
let iconUrl: string = '' // The Tab icon url to be sent to the background script

// Listen for context menu clicks,
// get the link text and send it to the background script
document.addEventListener('contextmenu', async (event) => {
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
browser.runtime.onMessage.addListener((message, _, sendResponse: any) => {
  if (message.action === 'get-link-info') responseLinkInfo(sendResponse)
  if (message.action === 'successed-add') handleSuccessedAdd()
  if (message.action === 'show-toast')
    showToast({
      message: message.message,
      type: message.type,
    })
})

// Send the link info to the background script
function responseLinkInfo(sendResponse: any) {
  sendResponse({ linkText, iconUrl })
  linkText = null
  iconUrl = ''
}

function handleSuccessedAdd() {
  // Handle getted successed add message from the background script
}

browser.storage.local.onChanged.addListener(async (changes) => {
  const oldValue: ListDataItem[] = changes['marktodo-data-list'].oldValue || []
  const newValue: ListDataItem[] = changes['marktodo-data-list'].newValue

  // Only render the symbol when the length of the list changes
  if (oldValue.length !== newValue.length) renderLinkSymbolOnWeb()
})
