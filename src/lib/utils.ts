import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSrcLabel(urlString: string): string {
  const url = new URL(urlString)
  return url.hostname
}
