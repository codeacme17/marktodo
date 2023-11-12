import browser from 'webextension-polyfill'
import { useTheme } from '@/components/theme-provider'
import { useStoragedDataList, useStorage } from '@/lib/hooks'
import { addDataToStrageList } from '@/lib/handle-storage'
import { ListDataItem, Priority, SortType } from '@/lib/types'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Moon,
  Sun,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Plus,
} from 'lucide-react'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [sortType, setSort] = useStorage<SortType>('marktodo-sort-type', 'desc')
  const [storagedDataList, setStoragedDataList] =
    useStoragedDataList('marktodo-data-list')

  const troggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const sortDataList = (type: SortType) => {
    const temp = storagedDataList.slice()
    if (type === 'desc') temp.sort((a, b) => b.priority - a.priority)
    else temp.sort((a, b) => a.priority - b.priority)
    setStoragedDataList(temp)
  }

  const troggleSort = () => {
    const newSortType = sortType === 'desc' ? 'asc' : 'desc'
    setSort(newSortType)
    sortDataList(newSortType)
  }

  const handleMarkCurrentWeb = async (priority: Priority) => {
    const tabInfo = (
      await browser.tabs.query({ active: true, currentWindow: true })
    )[0]

    const data: ListDataItem = {
      label: tabInfo.title!,
      src: tabInfo.url!,
      srcLabel: tabInfo.url!,
      iconUrl: tabInfo.favIconUrl || '',
      priority: priority,
    }

    await addDataToStrageList(data, tabInfo)
    window.close()
  }

  return (
    <nav className="fixed top-0 w-full p-3 pb-0 z-20 backdrop-blur-md">
      <div className="flex h-full justify-between items-center border-b pb-3 border-solid border-primary/10">
        <div className="flex items-center">
          <h2 className="ml-2 text-lg font-[Poppins] select-none">Marktodo</h2>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-2">
              <Button size="icon" variant="ghost" className="w-6 h-6">
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleMarkCurrentWeb(3)}>
                  {browser.i18n.getMessage('menu_critical')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMarkCurrentWeb(2)}>
                  {browser.i18n.getMessage('menu_moderate')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMarkCurrentWeb(1)}>
                  {browser.i18n.getMessage('menu_mild')}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 mr-2"
            onClick={troggleSort}
            disabled={storagedDataList.length <= 1}>
            {sortType === 'desc' ? (
              <ArrowDownNarrowWide className="w-4 h-4" />
            ) : (
              <ArrowUpNarrowWide className="w-4 h-4" />
            )}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            onClick={troggleTheme}
            className="w-6 h-6">
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  )
}
