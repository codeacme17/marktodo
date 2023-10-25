import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function () {
  useEffect(() => {
    console.log('Hello from the popup!')
  }, [])

  return (
    <div className="w-32 text-lg">
      <img src="/icon-with-shadow.svg" />
      <h1 className="font-sans">vite-plugin-web</h1>
      <Button variant="outline">Button</Button>
    </div>
  )
}
