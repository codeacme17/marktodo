import { getStoragedDataList } from '@/lib/handle-storage'

export const renderLinkSymbolOnWeb = async () => {
  console.log('gg')

  const storagedDataList = await getStoragedDataList()

  console.log(storagedDataList)

  const linksCollection = [...document.querySelectorAll('a')]

  linksCollection.map((item) => {
    if (storagedDataList.find((i) => i.src === item.href)) {
      item.append('🔖')
    }
  })
}
