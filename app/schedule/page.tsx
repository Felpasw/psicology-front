import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import Calendar from '@/components/Calendar'

export default function Schedule() {
  return (
    <AuthenticatedLayout>
      <Calendar />
    </AuthenticatedLayout>
  )
}
