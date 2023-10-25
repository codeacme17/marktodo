import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

type TableDataItem = {
  label: string
  src: string
  srcLabel: string
  checked?: boolean
}

type Level = 'A' | 'B' | 'C'

export const MarkTable = () => {
  const [tableData, setTableData] = React.useState<TableDataItem[]>([
    {
      label: '779. K-th Symbol in Grammarl',
      src: 'https://leetcode.com/problems/k-th-symbol-in-grammar/?envType=daily-question&envId=2023-10-25',
      srcLabel: 'leetcode.com',
    },
    {
      label:
        '为何 try 里面放 return，finally 还会执行，理解其内部机制',
      src: 'https://github.com/codeacme17/be-frontend-master/blob/main/self-examination/Javascript%20%E5%9F%BA%E7%A1%80/%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6/try-finally.md',
      srcLabel: 'github.com',
    },
  ])

  const handleChecked = async (
    item: TableDataItem,
    checked: boolean,
    level?: Level
  ) => {
    item.checked = !item.checked

    if (level) handleLevel(item, level)

    setTableData(
      tableData.map((dataItem) =>
        dataItem === item ? { ...item, checked } : dataItem
      )
    )
  }

  const handleLevel = (item: TableDataItem, level: Level) => {
    // TODO: handle memory level
  }

  return (
    <Table className="pt-3">
      <TableBody>
        {tableData.map((item) => (
          <TableRow className="relative" key={item.src}>
            <TableCell className="font-medium">
              <a
                className="decoration-1 underline-offset-4 text-sm font-medium hover:underline"
                href={item.src}
                target="_blank"
              >
                {item.label}
              </a>

              <p className="text-muted-foreground text-sm flex items-center mt-1">
                <img
                  height="16"
                  width="16"
                  className="mr-2"
                  src={`https://cdn.simpleicons.org/${
                    item.srcLabel.split('.')[0]
                  }/gray`}
                />
                {item.srcLabel}
              </p>
            </TableCell>

            <TableCell className="text-right">
              <Button
                size="icon"
                variant="outline"
                className="w-8 h-8"
                onClick={() => handleChecked(item, true)}
              >
                <CheckCircle
                  className="w-4 h-4 stroke-green-500"
                  strokeWidth="3px"
                />
              </Button>
              {item.checked}
            </TableCell>

            {item.checked && (
              <div className="w-full h-full absolute top-0 left-0 bg-primary/20 rounded-md backdrop-blur-sm flex justify-center items-center">
                <Button
                  className="w-8 h-8 mr-2 bg-emerald-600 dark:bg-emerald-400 font-black"
                  onClick={() => handleChecked(item, false, 'A')}
                >
                  A
                </Button>
                <Button
                  className="w-8 h-8 mr-2  bg-amber-600 dark:bg-amber-400 font-black"
                  onClick={() => handleChecked(item, false, 'B')}
                >
                  B
                </Button>
                <Button
                  className="w-8 h-8 bg-rose-600 dark:bg-rose-400 font-black"
                  onClick={() => handleChecked(item, false, 'C')}
                >
                  C
                </Button>
              </div>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
