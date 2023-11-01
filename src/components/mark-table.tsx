import browser from 'webextension-polyfill'
import { useState } from 'react'
import { useStoragedDataList } from '@/lib/hooks/use-storaged-data-list'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, TableIcon } from 'lucide-react'

export type ListDataItem = {
  label: string
  src: string
  srcLabel: string
  iconUrl: string
  priority: Priority
  maskVisible?: boolean
}

export type Priority = 1 | 2 | 3 // 1: mild, 2: moderate, 3: critical

type Level = 'A' | 'B' | 'C' | 'Done'

interface PrioritySwitchButtonProps {
  item: ListDataItem
  getPrioirty: (item: ListDataItem, priority: Priority) => void
}

const PrioritySwitchButton = ({
  item,
  getPrioirty,
}: PrioritySwitchButtonProps) => {
  const [priority, setPriority] = useState<Priority>(item.priority)
  const [isDown, setIsDown] = useState<boolean>(true) // [true: down, false: up]

  const changePriority = () => {
    setPriority((prev: Priority) => {
      if (prev === 3) {
        prev -= 1
        setIsDown(true)
      } else if (prev === 2 && isDown) {
        prev -= 1
      } else if (prev === 2 && !isDown) {
        prev += 1
      } else if (prev === 1) {
        prev += 1
        setIsDown(false)
      }

      getPrioirty(item, prev as Priority)
      return prev as Priority
    })
  }

  return (
    <Button
      size="icon"
      className="w-5 h-5 flex justify-center items-center mr-2"
      variant="outline"
      onClick={changePriority}>
      {priority === 3 && (
        <span className="w-2 h-2 rounded-full transition-colors bg-red-600 dark:bg-red-400" />
      )}
      {priority === 2 && (
        <span className="w-2 h-2 rounded-full transition-colors bg-amber-600 dark:bg-amber-400" />
      )}
      {priority === 1 && (
        <span className="w-2 h-2 rounded-full transition-colors bg-green-600 dark:bg-green-400" />
      )}
    </Button>
  )
}

export const MarkTable = () => {
  const [storagedDataList, setStoragedDataList] =
    useStoragedDataList('marktodo-data-list')

  const handleMaskVisible = (item: ListDataItem, maskVisible: boolean) => {
    setStoragedDataList(
      storagedDataList.map((dataItem) =>
        dataItem === item ? { ...item, maskVisible } : dataItem,
      ),
    )
  }

  const handleSelectLevel = async (item: ListDataItem, level: Level) => {
    setStoragedDataList(
      storagedDataList.filter((dataItem) => dataItem.src !== item.src),
    )
  }

  const handleSwitchPriority = (item: ListDataItem, priority: Priority) => {
    setStoragedDataList(
      storagedDataList.map((dataItem) => {
        if (dataItem.src !== item.src) return dataItem
        return { ...item, priority }
      }),
    )
  }

  return (
    <section className="pt-14 pb-3 px-3 flex-1">
      <Table>
        <TableBody>
          {storagedDataList.map((item) => (
            <TableRow className="relative" key={item.src}>
              <TableCell className="font-medium pl-2">
                <div className="flex">
                  <PrioritySwitchButton
                    item={item}
                    getPrioirty={handleSwitchPriority}
                  />

                  <a
                    className="decoration-1 flex-1 items-center underline-offset-4 font-medium hover:underline"
                    href={item.src}
                    target="_blank"
                    rel="noreferrer">
                    {item.label}
                  </a>
                </div>

                <a
                  className="text-muted-foreground decoration-1 underline-offset-4 hover:underline text-xs flex items-center mt-1 ml-7"
                  href={'https://' + item.srcLabel}
                  target="_blank"
                  rel="noreferrer">
                  {/* TODO
                  <img
                    height="16"
                    width="16"
                    className="mr-2 grayscale"
                    src={item.iconUrl}
                  /> */}
                  <span className="flex-1">{item.srcLabel}</span>
                </a>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-8 h-8"
                  onClick={() => handleMaskVisible(item, true)}>
                  <CheckCircle
                    className="w-4 h-4 stroke-green-500"
                    strokeWidth="3px"
                  />
                </Button>
              </TableCell>

              {item.maskVisible && (
                <div className="w-full h-full absolute top-0 left-0 bg-primary/20 rounded-md backdrop-blur-md flex justify-center items-center">
                  <XCircle
                    className="w-5 h-5 absolute right-2 top-2 cursor-pointer"
                    onClick={() => handleMaskVisible(item, false)}
                  />

                  {/* TODO 
                  <Button
                    className="w-8 h-8 mr-2 bg-emerald-600 dark:bg-emerald-400 font-black"
                    onClick={() => handleSelectLevel(item, 'A')}
                  >
                    A
                  </Button>
                  <Button
                    className="w-8 h-8 mr-2  bg-amber-600 dark:bg-amber-400 font-black"
                    onClick={() => handleSelectLevel(item, 'B')}
                  >
                    B
                  </Button>
                  <Button
                    className="w-8 h-8 mr-2 bg-rose-600 dark:bg-rose-400 font-black"
                    onClick={() => handleSelectLevel(item, 'C')}
                  >
                    C
                  </Button> */}
                  <Button
                    className="w-16 h-8"
                    onClick={() => handleSelectLevel(item, 'Done')}>
                    Done
                  </Button>
                </div>
              )}
            </TableRow>
          ))}

          {/* Empty Hint */}
          {!storagedDataList.length && (
            <TableRow>
              <TableCell className="text-center text-primary/50 select-none flex flex-col items-center justify-center h-40">
                <TableIcon className="w-6 h-6 mb-4" />
                <p>{browser.i18n.getMessage('hint_empty_list')}</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
