import { useEffect } from 'react'

import { Navbar } from '@/components/navbar'
import { MarkList } from '@/components/mark-list'

export default function () {
  useEffect(() => {
    console.log('Hello from the popup!')
  }, [])

  return (
    <section>
      <Navbar />
      <MarkList />
    </section>
  )
}
