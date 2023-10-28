import { getStoragedDataList } from '@/lib/handle-storage'

const SYMBOL_ID = '_marktodo_symbol_'
const SYMBOL_CONTENT = ' 🏷️'

// Render the link symbol on the web
export const renderLinkSymbolOnWeb = async () => {
  const storagedDataList = await getStoragedDataList()
  const linksCollection = [...document.querySelectorAll('a')]

  linksCollection.forEach((item) => {
    const isMarked = storagedDataList.some((i) => i.src === item.href)
    const symbolSpan = item.querySelector('#' + SYMBOL_ID)

    // Not use `innerHTML`,
    // because it will cause the page to be re-rendered,
    // use `appendChild()` instead
    if (isMarked && !symbolSpan) {
      const span = document.createElement('span')
      span.id = SYMBOL_ID
      span.textContent = SYMBOL_CONTENT
      item.appendChild(span)
    } else if (!isMarked && symbolSpan) {
      symbolSpan.remove()
    }
  })
}
