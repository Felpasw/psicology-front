'use client'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import Calendar from '@/components/Calendar'
import { GET, DELETE, POST, PUT } from '@/crud'
import { Button } from '@nextui-org/button'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

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

interface SchedulesBy {
  day: Schedule[]
  month: Schedule[]
}

export default function Schedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [modal, setModal] = useState<modal>({ remove: false, editOrNew: false })
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>({} as Schedule)
  const [errors, setErrors] = useState<string>()
  const [schedules, setSchedules] = useState<SchedulesBy>({} as SchedulesBy)

  const requestMethods = {
    getSchedule: async () => {
      const month = await GET('/schedules', { date: { month: date.getMonth() } })
      const day = await GET('/schedules', { date: { day: date.getDay(), month: date.getMonth() } })
      setSchedules({ month, day })
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
        <Calendar date={date} setDate={setDate} schedules={schedules.month} />
        <div className='text-center w-[30%]'>
          <div className='flex justify-between p-2'>
            <h1 className='text-2xl'>
              Agenda para o dia{' '}
              {`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
            </h1>
            <Button onClick={() => setModal({ ...modal, editOrNew: true })}>Adicionar</Button>
          </div>
          <Divider className='mb-5' />

          <div className='flex flex-col justify-center items-center gap-6'>
            {schedules.day &&
              schedules.day.map((item) => {
                return (
                  <Card className='w-full'>
                    <CardHeader className='flex gap-3'>
                      <div className='flex flex-col'>
                        <p className='text-md text-start'>{item.title}</p>
                        <p className='text-small text-default-500'>
                          {item.startTime} - {item.endTime}
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardFooter>
                      <Tooltip content='Editar'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                          <FaEdit
                            onClick={() => {
                              setCurrentSchedule(item)
                              setModal({ ...modal, editOrNew: true })
                            }}
                          />
                        </span>
                      </Tooltip>

                      <Tooltip color='danger' content='Remover'>
                        <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                          <MdDelete
                            onClick={() => {
                              setModal({ ...modal, remove: true })
                              setCurrentSchedule(item)
                            }}
                          />
                        </span>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
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
