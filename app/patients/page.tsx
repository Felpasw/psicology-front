'use client'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import { DELETE, GET, POST, PUT } from '@/crud'
import { Modal, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


interface patients {
  _id: string
  CPF: string,
  age: number,
  createdAt?: string,
  email: string,
  gender: string,
  name: string,
  phoneNumber: string
  updatedAt?: string,
  address?: string,

}
interface ModalStates {
  edit: boolean,
  remove: boolean
}

const zeroState: patients = {
  CPF: '',
  age: 0,
  email: '',
  gender: '',
  name: '',
  phoneNumber: ''
}

interface errors {
  CPF: string,
  age: number,
  email: string,
  gender: string,
  name: string,
  phoneNumber: string
  address: string
}


export default function Pacients() {
  const [patients, setPatients] = useState([] as patients[])
  const [modal, setModal] = useState({
    edit: false,
    remove: false
  } as ModalStates)
  const [currentPatient, setCurrentPatient] = useState({} as patients)
  const [errors, setErrors] = useState({} as errors)



  useEffect(() => {
    requestMethods.getPatients()
  }, [])

  const requestMethods = {
    getPatients: async () => {
      const response = await GET('/patients')
      setPatients(response)
    },
    putPatients: async () => {
      const response = await PUT(`/patients/${currentPatient._id}`, currentPatient)
      setErrors(response.data ? response.data : {} as errors)
      await requestMethods.getPatients()

    },
    postPatients: async () => {
      const response = await POST(`/patients`, currentPatient)
      setErrors(response.data ? response.data : {} as errors)
      await requestMethods.getPatients()

    },
    deletePatient: async () => {
      await DELETE(`/patients/${currentPatient._id}`)
      await requestMethods.getPatients()
      setModal({ ...modal, remove: false })
    }

  }




  const headers = ['CPF', 'Nome', 'Idade', 'Email', 'Telefone', 'Ações']
  const fields = ['cpf', 'name', 'age', 'email', 'phoneNumber', 'action']
  const genderOptions = [{ key: 'M', label: "Masculino" }, { key: 'F', label: 'Feminino' }, { key: 'O', label: 'Outros' }]


  return (
    <AuthenticatedLayout>
      <div className='p-6 w-full'>

        <div className='w-full flex justify-between'>
          <h1 className='text-2xl'>Pacientes</h1>
          <Button onClick={() => { setCurrentPatient({} as patients), setModal({ ...modal, edit: true }) }}>
            Novo
          </Button>
        </div>
        <hr className='my-6' />
        <Table >
          <TableHeader>
            {headers.map((header) => {
              return <TableColumn>{header}</TableColumn>
            })}
          </TableHeader>
          <TableBody>
            {
              patients && patients.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {fields.map((field: keyof patients) => {
                      return field != 'action' ? <TableCell> {item[field]} </TableCell> :
                        <TableCell>
                          <div className="relative flex items-center gap-2">
                            <Tooltip content="Detalhes">
                              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <FaEye />
                              </span>
                            </Tooltip>
                            <Tooltip content="Editar">
                              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <FaEdit onClick={() => {
                                  setCurrentPatient(item)
                                  setModal({ ...modal, edit: true })
                                }} />
                              </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Remover">
                              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <MdDelete onClick={() => setModal({ ...modal, remove: true })} />
                              </span>
                            </Tooltip>
                          </div>
                        </TableCell>
                    })}
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </div>
      <Modal isOpen={modal.edit} onClose={() => setModal({ ...modal, edit: false })}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{currentPatient._id ? 'Editar paciente' : 'Novo paciente'}</ModalHeader>
          <ModalBody>
            <>
              <Input
                label='Nome'
                isRequired
                errorMessage={errors.name}
                isInvalid={!!errors.name}
                value={currentPatient.name}
                onChange={(e) => setCurrentPatient({ ...currentPatient, name: e.target.value })}
              />
              <Input
                type='email'
                isRequired
                errorMessage={errors.email}
                isInvalid={!!errors.email}
                label='Email'
                value={currentPatient.email}
                onChange={(e) => setCurrentPatient({ ...currentPatient, email: e.target.value })}
              />
              <Input
                label='CPF'
                isRequired
                errorMessage={errors.CPF}
                isInvalid={!!errors.CPF}
                value={currentPatient.CPF}
                onChange={(e) => setCurrentPatient({ ...currentPatient, CPF: e.target.value })}
              />
              <Input

                errorMessage={errors.phoneNumber}
                isInvalid={!!errors.phoneNumber}
                label='Número de telefone'
                value={currentPatient.phoneNumber}
                onChange={(e) => setCurrentPatient({ ...currentPatient, phoneNumber: e.target.value })}
              />
              <Input
                type='number'
                label='Idade'
                isRequired
                errorMessage={errors.age}
                isInvalid={!!errors.age}
                value={currentPatient.age}
                onChange={(e) => setCurrentPatient({ ...currentPatient, age: Number(e.target.value) })}
              />
              <Select
                isInvalid={!!errors.gender}
                errorMessage={errors.gender}
                onChange={(e) => setCurrentPatient({ ...currentPatient, gender: e.target.value })}
                label="Gênero" isRequired >
                {genderOptions.map((gender) => (
                  <SelectItem key={gender.key}>{gender.label}</SelectItem>
                ))}
              </Select>
              <Textarea
                errorMessage={errors.address}
                isInvalid={!!errors.address}
                value={currentPatient.address}
                onChange={(e) => setCurrentPatient({ ...currentPatient, address: e.target.value })}

                label="Endereço" />

              <ModalFooter>
                <Button color="danger" variant="light" onClick={() => setModal({ ...modal, edit: false })}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={() => currentPatient && currentPatient._id ? requestMethods.putPatients() : requestMethods.postPatients()}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={modal.remove} onClose={() => setModal({ ...modal, remove: false })}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Remover paciente</ModalHeader>
              <ModalBody>
                <p>Gostaria mesmo de remover paciente <b>{currentPatient.name}</b>?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={() => requestMethods.deletePatient()}>
                  Remover
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>




    </AuthenticatedLayout>
  )
}