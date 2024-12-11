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
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
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
  _id?: string
  title: string
  description: string
  date: Date
  startTime: string | time
  endTime: string | time
  status: 'confirmed' | 'pending' | 'cancelled'
  location: string
  createdBy: string
}

interface time {
  hour: number
  millisecond: number
  minute: number
  second: number
}

interface errors {
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  status: string
  location: string
  createdBy: string
}

interface patients {
  _id: string
  CPF: string
  age: number
  createdAt?: string
  email: string
  gender: string
  name: string
  phoneNumber: string
  updatedAt?: string
  address?: string
}

interface SchedulesBy {
  day: Schedule[]
  month: Schedule[]
}

export default function Schedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [modal, setModal] = useState<modal>({ remove: false, editOrNew: false })
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>({} as Schedule)
  const [errors, setErrors] = useState<errors>({} as errors)
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [schedules, setSchedules] = useState<SchedulesBy>({} as SchedulesBy)
  const [patients, setPatients] = useState<patients>()

  const requestMethods = {
    getSchedule: async () => {
      const monthS = await GET('/schedules', { params: { date: { month } } })
      const day = await GET('/schedules', { params: { date: { day: date.getDate(), month } } })
      setSchedules({ month: monthS, day })
    },
    putSchedule: async () => {},

    deleteSchedule: async () => {},

    postSchedule: async () => {
      const startTime = `${currentSchedule.startTime.hour}:${currentSchedule.startTime.minute}`
      const endTime = `${currentSchedule.endTime.hour}:${currentSchedule.endTime.minute}`

      const response = await POST(`/schedules`, { ...currentSchedule, startTime, endTime })
      setErrors(response.data ? response.data : ({} as errors))
      await requestMethods.getSchedule()
    },

    getPactients: async () => {},
  }

  const statusOptions = [
    { key: 'pending', label: 'Pendente' },
    { key: 'confirmed', label: 'Confirmado' },
    { key: 'cancelled', label: 'Cancelado' },
  ]

  useEffect(() => {
    requestMethods.getSchedule()
  }, [date, month])

  return (
    <AuthenticatedLayout>
      <>
        <Calendar date={date} setDate={setDate} schedules={schedules.month} setMonth={setMonth} />
        <div className='text-center w-[30%]'>
          <div className='flex justify-between p-2'>
            <h1 className='text-2xl'>
              Agenda para o dia{' '}
              {`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
            </h1>
            <Button
              onClick={() => {
                setCurrentSchedule({} as Schedule)
                setModal({ ...modal, editOrNew: true })
              }}>
              Adicionar
            </Button>
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
            {schedules.day && schedules.day.length == 0 && (
              <h1 className='opacity-75 text-slate-400'>Nenhum agendamento cadastrado</h1>
            )}
          </div>
        </div>

        <Modal isOpen={modal.remove} onClose={() => setModal({ ...modal, remove: false })}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Remover apontamento</ModalHeader>
                <ModalBody>
                  <p>
                    Gostaria mesmo remover o apontamento <b>{currentSchedule.title}</b>?
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

        <Modal isOpen={modal.editOrNew} onClose={() => setModal({ ...modal, editOrNew: false })}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>
                  {currentSchedule._id
                    ? `Editar agendamento ${currentSchedule.title}`
                    : `Criar agendamento dia ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
                </ModalHeader>
                <ModalBody>
                  <>
                    <Input
                      label='Título'
                      isRequired
                      errorMessage={errors.title}
                      isInvalid={!!errors.title}
                      value={currentSchedule.title}
                      onChange={(e) => setCurrentSchedule({ ...currentSchedule, title: e.target.value })}
                    />
                    <Select label='Status' isRequired>
                      {statusOptions.map((item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      ))}
                    </Select>
                    <TimeInput
                      isRequired
                      label='Horário de início'
                      errorMessage={errors.startTime}
                      isInvalid={!!errors.startTime}
                      hourCycle={24}
                      onChange={(e) => {
                        const startTime = e
                        setCurrentSchedule((prev) => ({ ...prev, startTime }))
                      }}
                    />
                    <TimeInput
                      isRequired
                      hourCycle={24}
                      errorMessage={errors.endTime}
                      isInvalid={!!errors.endTime}
                      label='Horário de fim'
                      onChange={(e) => {
                        const endTime = e
                        setCurrentSchedule((prev) => ({ ...prev, endTime }))
                      }}
                    />
                    <Textarea
                      errorMessage={errors.description}
                      isInvalid={!!errors.description}
                      value={currentSchedule.description}
                      onChange={(e) => setCurrentSchedule({ ...currentSchedule, description: e.target.value })}
                      label='Descrição'
                    />
                  </>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color='primary' onPress={() => requestMethods.postSchedule()}>
                    Enviar
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
