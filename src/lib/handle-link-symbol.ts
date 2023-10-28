import { getStoragedDataList } from '@/lib/handle-storage'

export const renderLinkSymbolOnWeb = async () => {
  const storagedDataList = await getStoragedDataList()
  const linksCollection = [...document.querySelectorAll('a')]

  linksCollection.forEach((item) => {
    const isMarked = storagedDataList.some((i) => i.src === item.href)
    const symbolSpan = item.querySelector('#_marktodo_symbol_')

    if (isMarked && !symbolSpan) {
      const span = document.createElement('span')
      span.id = '_marktodo_symbol_'
      span.textContent = ' 🏷️'
      item.appendChild(span)
    } else if (!isMarked && symbolSpan) {
      symbolSpan.remove()
    }
  })
}
