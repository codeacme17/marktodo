import { ToastOptions, ToastType } from '@/lib/types'

export function showToast({
  message,
  type = 'primary',
  duration = 3000,
}: ToastOptions) {
  const toast = document.createElement('div')

  const colors = getColors(type)

  toast.style.animation = '_slideFadeIn_marktodo_toast 0.2s forwards'
  toast.style.position = 'fixed'
  toast.style.top = '17px'
  toast.style.right = '20px'
  toast.style.backgroundColor = colors.bgColor
  toast.style.color = colors.textColor
  toast.style.padding = '10px 20px'
  toast.style.borderRadius = '5px'
  toast.style.zIndex = '1000'
  toast.style.fontFamily = 'JetBrains Mono, 微软雅黑 light, youyuan'
  toast.style.fontSize = '13px'
  toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)'

  toast.innerText = message

  document.body.appendChild(toast)

  setTimeout(() => {
    document.body.removeChild(toast)
  }, duration)
}

export function injectToastAnimation() {
  const style = document.createElement('style')
  style.innerHTML = `
  @keyframes _slideFadeIn_marktodo_toast {
    0% {
      opacity: 0;
      transform: translateY(-70%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`
  document.head.appendChild(style)
}

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getColors(type: ToastType) {
  const systemTheme = getSystemTheme()

  const res = {
    bgColor: '',
    textColor: '',
  }

  if (type === 'primary')
    res.bgColor = systemTheme === 'dark' ? '#e5e5e5' : '#171717'
  else if (type === 'error')
    res.bgColor = systemTheme === 'dark' ? '#fda4af' : '#dc2626'
  else if (type === 'warning')
    res.bgColor = systemTheme === 'dark' ? '#fcd34d' : '#d97706'

  res.textColor = systemTheme === 'dark' ? '#262626' : '#e5e5e5'

  return res
}
