import { getStoragedDataList } from '@/lib/handle-storage'

const INNER_SYMBOL = `<span id="_marktodo_symbol_"> 🏷️</span>`

export const renderLinkSymbolOnWeb = async () => {
  const storagedDataList = await getStoragedDataList()
  const linksCollection = [...document.querySelectorAll('a')]

  linksCollection.forEach((item) => {
    const isMarked = storagedDataList.some((i) => i.src === item.href)

    console.log(isMarked, 'isMarked')

    if (isMarked && !item.innerHTML.includes(INNER_SYMBOL)) {
      item.innerHTML += INNER_SYMBOL
    } else if (!isMarked && item.innerHTML.includes(INNER_SYMBOL)) {
      item.innerHTML = item.innerHTML.replace(INNER_SYMBOL, '')
    }
  })
}
