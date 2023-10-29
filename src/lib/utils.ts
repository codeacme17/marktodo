import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 *  Generate a label from a URL
 *  @example
 *  from: `https://developer.mozilla.org/en-US/docs/Web/API/URL`
 *  to: `developer.mozilla.org`
 */
export function generateSrcLabel(urlString: string): string {
  const url = new URL(urlString)
  return url.hostname
}

/**
 *  Generate a label from a web page title
 */
export function generateLabel(rawLable: string): string {
  let label = decodeURIComponent(rawLable)

  // Particular Github
  // @example
  // from: `react/docs/advanced/misc-concerns.md at main · typescript-cheatsheets/react · GitHub`
  // to: `misc-concerns.md`
  if (rawLable.includes('/') && rawLable.includes(' at ')) {
    label = label.split(' at ')[0]
    label = label.split('/').pop()!
  }
  return label
}
