import { useStoragedDataList } from '@/lib/use-storaged-data-list'

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CheckCircle, CircleDot, XCircle } from 'lucide-react'

export type TableDataItem = {
  label: string
  src: string
  srcLabel: string
  iconUrl: string
  priority: Priority
  maskVisible?: boolean
}

export type Priority = 1 | 2 | 3 // 1: mild, 2: moderate, 3: critical

type Level = 'A' | 'B' | 'C' | 'Done'

export const MarkTable = () => {
  const [storagedDataList, setStoragedDataList] = useStoragedDataList(
    'marktodo-data-list'
  )

  const handleMaskVisible = (
    item: TableDataItem,
    maskVisible: boolean
  ) => {
    setStoragedDataList(
      storagedDataList.map((dataItem) =>
        dataItem === item ? { ...item, maskVisible } : dataItem
      )
    )
  }

  const handleSelectLevel = async (
    item: TableDataItem,
    level: Level
  ) => {
    setStoragedDataList(
      storagedDataList.filter((dataItem) => dataItem.src !== item.src)
    )
  }

  return (
    <section className="pt-14 pb-3 px-3 flex-1">
      <Table>
        <TableBody>
          {storagedDataList.map((item) => (
            <TableRow className="relative" key={item.src}>
              <TableCell className="font-medium">
                <a
                  className="decoration-1 flex items-center underline-offset-4 font-medium hover:underline"
                  href={item.src}
                  target="_blank"
                >
                  {item.priority === 3 && (
                    <CircleDot className="w-4 h-4 mr-2 mb-auto mt-0.5 fill-red-500 stroke-current" />
                  )}
                  {item.priority === 2 && (
                    <CircleDot className="w-4 h-4 mr-2 mb-auto mt-0.5 fill-orange-500 stroke-current" />
                  )}
                  {item.priority === 1 && (
                    <CircleDot className="w-4 h-4 mr-2 mb-auto mt-0.5 fill-green-500 stroke-current" />
                  )}
                  <span className="flex-1">{item.label}</span>
                </a>

                <a
                  className="text-muted-foreground decoration-1 underline-offset-4 hover:underline text-xs flex items-center mt-1 ml-6"
                  href={'https://' + item.srcLabel}
                  target="_blank"
                >
                  <img
                    height="16"
                    width="16"
                    className="mr-2 grayscale"
                    src={item.iconUrl}
                  />
                  <span className="flex-1">{item.srcLabel}</span>
                </a>
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-8 h-8"
                  onClick={() => handleMaskVisible(item, true)}
                >
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
                  </Button>
                  <Button
                    className="w-12 h-8 "
                    onClick={() => handleSelectLevel(item, 'Done')}
                  >
                    Done
                  </Button>
                </div>
              )}
            </TableRow>
          ))}

          {/* Empty Hint */}
          {!storagedDataList.length && (
            <TableRow>
              <TableCell className="text-center text-primary/50 select-none">
                There is currently no data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
