import browser from 'webextension-polyfill'
import { useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import { useStoragedDataList } from '@/lib/hooks/use-storaged-data-list'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Moon,
  Settings,
  Sun,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Plus,
} from 'lucide-react'

type SortType = 'desc' | 'asc'

export const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const troggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const [sortType, setSort] = useState<SortType>('desc')
  const [storagedDataList, setStoragedDataList] =
    useStoragedDataList('marktodo-data-list')
  const troggleSort = () => {
    setSort(sortType === 'desc' ? 'asc' : 'desc')
    handleSort()
  }

  const handleSort = () => {
    let temp = storagedDataList.slice()

    if (sortType === 'desc') {
      temp.sort((a, b) => a.priority - b.priority)
    } else {
      temp.sort((a, b) => b.priority - a.priority)
    }

    setStoragedDataList(temp)
  }

  return (
    <nav className="fixed top-0 w-full p-3 pb-0 z-20 backdrop-blur-md">
      <div className="flex h-full justify-between items-center border-b pb-3 border-solid border-primary/10">
        <div className="flex items-center">
          <h2 className="ml-2 text-lg font-[Poppins]">marktodo</h2>
        </div>

        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="w-6 h-6 mr-2">
                  <Plus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{browser.i18n.getMessage('hint_mark_current_web')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 mr-2"
            onClick={troggleSort}
            disabled={storagedDataList.length === 0}
          >
            {sortType === 'desc' ? (
              <ArrowDownNarrowWide className="w-4 h-4" />
            ) : (
              <ArrowUpNarrowWide className="w-4 h-4" />
            )}
          </Button>

          {/* TODO
          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 mr-2"
          >
            <Settings className="w-4 h-4" />
          </Button> */}

          <Button
            size="icon"
            variant="ghost"
            onClick={troggleTheme}
            className="w-6 h-6"
          >
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
