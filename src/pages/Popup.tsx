import { Navbar } from '@/components/navbar'
import { MarkTable } from '@/components/mark-table'

const Popup = () => {
  return (
    <main className="w-[420px] max-h-[500px] min-h-[220px] flex flex-col">
      <Navbar />
      <MarkTable />
    </main>
  )
}

export default Popup
