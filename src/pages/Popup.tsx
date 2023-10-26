import { Navbar } from '@/components/navbar'
import { MarkTable } from '@/components/mark-table'
import { useEffect } from 'react'

export default function () {
  return (
    <section className="h-full flex flex-col">
      <Navbar />
      <MarkTable />
    </section>
  )
}
