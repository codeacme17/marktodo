import { useEffect } from 'react'

import { Navbar } from '@/components/navbar'

export default function () {
  useEffect(() => {
    console.log('Hello from the popup!')
  }, [])

  return (
    <section className="">
      <Navbar />
    </section>
  )
}
