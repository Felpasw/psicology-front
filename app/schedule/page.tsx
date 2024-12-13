'use client'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import Calendar from '@/components/Calendar'
import { GET, DELETE, POST, PUT } from '@/crud'
import { Button } from '@nextui-org/button'
import {
  Autocomplete,
  AutocompleteItem,
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
import { FaEdit, FaCheck, FaUserCheck } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { TbUserCancel } from 'react-icons/tb'
import { RiPassPendingFill } from 'react-icons/ri'

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
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  location: string
  patient: string
}

interface time {
  hour: number
  minute: number
  millisecond?: number
  second?: number
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
  patient: string
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

interface selectItem {
  label: string
  key: string
}

export default function Schedule() {
  const [date, setDate] = useState<Date>(new Date())
  const [modal, setModal] = useState<modal>({ remove: false, editOrNew: false })
  const [currentSchedule, setCurrentSchedule] = useState<Schedule>({} as Schedule)
  const [errors, setErrors] = useState<errors>({} as errors)
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [schedules, setSchedules] = useState<SchedulesBy>({} as SchedulesBy)
  const [patients, setPatients] = useState<selectItem[]>([] as selectItem[])

  const requestMethods = {
    getSchedule: async () => {
      const monthS = await GET('/schedules', { params: { date: { month } } })
      const day = await GET('/schedules', { params: { date: { day: date.getDate(), month } } })
      setSchedules({ month: monthS, day })
    },
    putSchedule: async () => {
      const startTime = `${currentSchedule.startTime.hour.toString().padStart(2, '0')}:${currentSchedule.startTime.minute.toString().padStart(2, '0')}`
      const endTime = `${currentSchedule.endTime.hour.toString().padStart(2, '0')}:${currentSchedule.endTime.minute.toString().padStart(2, '0')}`
      const response = await PUT(`/schedules/${currentSchedule._id}`, { ...currentSchedule, startTime, endTime })
      setErrors(response.data ? response.data : ({} as errors))
      await requestMethods.getSchedule()
    },

    deleteSchedule: async () => {
      await DELETE(`/schedules/${currentSchedule._id}`)
      await requestMethods.getSchedule()
      setModal({ ...modal, remove: false })
    },

    postSchedule: async () => {
      const startTime = `${currentSchedule.startTime.hour.toString().padStart(2, '0')}:${currentSchedule.startTime.minute.toString().padStart(2, '0')}`
      const endTime = `${currentSchedule.endTime.hour.toString().padStart(2, '0')}:${currentSchedule.endTime.minute.toString().padStart(2, '0')}`
      const response = await POST(`/schedules`, { ...currentSchedule, startTime, endTime, date })
      setErrors(response.data ? response.data : ({} as errors))
      await requestMethods.getSchedule()
    },

    getPatients: async () => {
      const response = await GET('/patients')

      setPatients(
        response.map((item: patients) => ({
          label: item.name,
          key: item._id,
        }))
      )
    },
  }

  const statusOptions = [
    { key: 'pending', label: 'Pendente' },
    { key: 'confirmed', label: 'Confirmado' },
    { key: 'cancelled', label: 'Cancelado' },
    { key: 'completed', label: 'Concluída' },
  ]

  const statusIcons = {
    cancelled: (
      <div className='text-red-400 flex items-center justify-center gap-2 text-sm'>
        <TbUserCancel /> Cancelado
      </div>
    ),
    concluded: (
      <div className='text-green-400 flex items-center justify-center gap-2 text-sm'>
        <FaCheck /> Concluída
      </div>
    ),
    pending: (
      <div className='text-yellow-400 flex items-center justify-center gap-2 text-sm'>
        <RiPassPendingFill /> Pendente
      </div>
    ),
    confirmed: (
      <div className='text-green-400 flex items-center justify-center gap-2 text-sm'>
        <FaUserCheck /> Confirmada pelo paciente
      </div>
    ),
  }

  const getSelectedPatient = () => {
    return patients.find((patient) => patient.key === currentSchedule.patient)?.label
  }

  useEffect(() => {
    requestMethods.getSchedule()
  }, [date, month])

  useEffect(() => {
    requestMethods.getPatients()
  }, [])

  return (
    <AuthenticatedLayout>
      <>
        <Calendar date={date} setDate={setDate} schedules={schedules.month} setMonth={setMonth} />
        <div className=' flex flex-col justify-center text-center w-[30%]'>
          <div className='flex justify-between p-2'>
            <h1 className='text-2xl'>
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
            <div className='w-full  gap-5 overflow-y-scroll h-[70vh]'>
              {schedules.day &&
                schedules.day.map((item) => {
                  return (
                    <Card className='my-5'>
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
                        <div className='flex justify-between w-full'>
                          {statusIcons[item.status]}

                          <div className='flex'>
                            <Tooltip content='Editar'>
                              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                <FaEdit
                                  onClick={() => {
                                    const startTime: time = {
                                      minute: Number(item.startTime.toString().split(':')[1]),
                                      hour: Number(item.startTime.toString().split(':')[0]),
                                    }

                                    const endTime: time = {
                                      minute: Number(item.endTime.toString().split(':')[1]),
                                      hour: Number(item.endTime.toString().split(':')[0]),
                                    }

                                    setCurrentSchedule({ ...item, startTime, endTime })
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
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  )
                })}
              {schedules.day && schedules.day.length == 0 && (
                <h1 className='opacity-75 text-slate-400'>Nenhum agendamento cadastrado</h1>
              )}
            </div>
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
                    ? `Editar agendamento `
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
                    <Select label='Status'>
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
                      value={currentSchedule.startTime}
                      onChange={(e) => {
                        const startTime = e
                        setCurrentSchedule((prev) => ({ ...prev, startTime }))
                      }}
                    />
                    <TimeInput
                      isRequired
                      hourCycle={24}
                      value={currentSchedule.endTime}
                      errorMessage={errors.endTime}
                      isInvalid={!!errors.endTime}
                      label='Horário de fim'
                      onChange={(e) => {
                        const endTime = e
                        setCurrentSchedule((prev) => ({ ...prev, endTime }))
                      }}
                    />
                    <Autocomplete
                      inputValue={getSelectedPatient()}
                      defaultItems={patients}
                      isInvalid={!!errors.patient}
                      errorMessage={errors.patient}
                      label='Paciente'
                      placeholder='Procure um paciente'
                      onInputChange={(value: string) => {
                        const patient = patients.find((item) => item.label === value)
                        if (patient) {
                          setCurrentSchedule({ ...currentSchedule, patient: patient.key })
                        }
                      }}
                      isRequired>
                      {(patient) => <AutocompleteItem key={patient.key}>{patient.label}</AutocompleteItem>}
                    </Autocomplete>

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
                  <Button
                    color='primary'
                    onPress={() =>
                      currentSchedule._id ? requestMethods.putSchedule() : requestMethods.postSchedule()
                    }>
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
