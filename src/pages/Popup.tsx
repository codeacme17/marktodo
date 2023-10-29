import { Navbar } from '@/components/navbar'
import { MarkTable } from '@/components/mark-table'

export default function () {
  return (
    <main className="w-[420px] max-h-[500px] min-h-[200px] flex flex-col">
      <Navbar />
      <MarkTable />
    </main>
  )
}
