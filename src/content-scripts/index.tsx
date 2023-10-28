import browser from 'webextension-polyfill'
import { injectToastAnimation, showToast } from '@/lib/handle-toast'
import { renderLinkSymbolOnWeb } from '@/lib/handle-link-symbol'
import { ACTION } from '@/lib/constants'
import { ListDataItem } from '@/components/mark-table'

// Inject the toast animation
injectToastAnimation()
// Render the symbol back to the marked links
renderLinkSymbolOnWeb()

// Listen for messages from the background script
browser.runtime.onMessage.addListener((message, _, sendResponse: any) => {
  switch (message.action) {
    case ACTION.GET_LINK_INFO:
      handleLinkInfo(sendResponse)
      break

    case ACTION.SHOW_TOAST:
      showToast({
        message: message.message,
        type: message.type,
      })
      break

    default:
      console.error('Unknown message received from background script')
      break
  }
})

browser.storage.local.onChanged.addListener(async (changes) => {
  const oldValue: ListDataItem[] = changes['marktodo-data-list'].oldValue || []
  const newValue: ListDataItem[] = changes['marktodo-data-list'].newValue

  // Only render the symbol the list updated
  if (oldValue.length !== newValue.length) renderLinkSymbolOnWeb()
})

// Listen for context menu clicks,
// get the link text and send it to the background script
let linkText: any = null
let iconUrl: string = ''
document.addEventListener('contextmenu', async (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return

  const iconElement = document.querySelector(
    'link[rel="icon"], link[rel="shortcut icon"]'
  ) as HTMLLinkElement

  if (iconElement && iconElement.href) iconUrl = iconElement.href

  // To get the link text, we need to check if the link is an anchor,
  // or a link with a hash
  if (event.target.hash === '') {
    linkText = event.target.textContent
  } else linkText = event.target.hash
})

// Send the link info to the background script
function handleLinkInfo(sendResponse: any) {
  sendResponse({ linkText, iconUrl })
  linkText = null
  iconUrl = ''
}

// Listen for changes in the DOM,
// and re-render the symbol when the DOM changes for (SPA)
let timeoutId: any
const observer = new MutationObserver((mutations) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    renderLinkSymbolOnWeb()
  }, 200)
})
observer.observe(document, {
  childList: true,
  subtree: true,
  characterData: false,
  attributes: false,
})
