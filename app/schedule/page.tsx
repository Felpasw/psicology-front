'use client'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import Calendar from '@/components/Calendar'
import { GET, DELETE, POST, PUT } from '@/crud'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface modal {
  remove: boolean
  editOrNew: boolean
}
interface Schedule {
  title: string
  description: string
  date: Date
  startTime: string
  endTime: string
  status: 'confirmed' | 'pending' | 'cancelled'
  location: string
  createdBy: string
}

export default function Schedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [modal, setModal] = useState<modal>({ remove: false, editOrNew: false })
  const [currentSchedule, setCurrentSchedule] = useState<>()
  const [errors, setErrors] = useState<string>()

  const requestMethods = {
    getSchedule: async () => {
      const response = await GET('/schedules')
    },
    putSchedule: async () => {},
    deleteSchedule: async () => {},
    postSchedule: async () => {},
    getPactients: async () => {},
  }

  useEffect(() => {
    requestMethods.getSchedule()
  }, [date])

  return (
    <AuthenticatedLayout>
      <>
        <Calendar date={date} setDate={setDate} />
        <div className='text-center w-[30%]'>
          <div className='flex justify-between p-2'>
            <h1 className='text-2xl'>
              Agenda para o dia{' '}
              {`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
            </h1>
            <Button onClick={() => setModal({ ...modal, editOrNew: true })}>Adicionar</Button>
          </div>
          <hr />
        </div>

        <Modal isOpen={modal.remove} onClose={() => setModal({ ...modal, remove: false })}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Remover paciente</ModalHeader>
                <ModalBody>
                  <p>
                    Gostaria mesmo remover o apontamento do dia <b>{currentSchedule}</b>?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color='primary' onPress={() => requestMethods.deleteSchedule()}>
                    Remover
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </AuthenticatedLayout>
  )
}
