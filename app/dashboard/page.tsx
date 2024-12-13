import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import { Graph } from '@/components/Graph.'

export default function dashboard() {
  return (
    <AuthenticatedLayout>
      <div className=' w-full p-16 '>
        <Graph />
      </div>
    </AuthenticatedLayout>
  )
}
