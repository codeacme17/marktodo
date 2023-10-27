import { getStoragedDataList } from '@/lib/handle-storage'

const innerSymbol = `<span id="_marktodo_symbol_"> 🔖</span>`

export const renderLinkSymbolOnWeb = async () => {
  const storagedDataList = await getStoragedDataList()
  const linksCollection = [...document.querySelectorAll('a')]

  linksCollection.forEach((item) => {
    const isMarked = storagedDataList.some((i) => i.src === item.href)

    if (isMarked && !item.innerHTML.includes(innerSymbol)) {
      item.innerHTML += innerSymbol
    } else if (!isMarked && item.innerHTML.includes(innerSymbol)) {
      item.innerHTML = item.innerHTML.replace(innerSymbol, '')
    }
  })
}
