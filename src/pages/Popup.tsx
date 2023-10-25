import { useEffect } from 'react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export default function () {
  useEffect(() => {
    console.log('Hello from the popup!')
  }, [])

  return (
    <section className="w-32 text-lg">
      <div className="flex">
        <Logo />
        <h1 className="font-bold">marktodo</h1>
      </div>
    </section>
  )
}
