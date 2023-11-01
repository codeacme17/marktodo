export type ListDataItem = {
  label: string
  src: string
  srcLabel: string
  iconUrl: string
  priority: Priority
  maskVisible?: boolean
}

export type Priority = 1 | 2 | 3 // 1: mild, 2: moderate, 3: critical

export type Level = 'A' | 'B' | 'C' | 'Done'

export type SortType = 'desc' | 'asc'

export interface ToastOptions {
  message: string
  type?: ToastType
  duration?: number
}

export type ToastType = 'primary' | 'error' | 'warning'
