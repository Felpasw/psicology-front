'use client'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import { DELETE, GET, POST, PUT } from '@/crud'
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaLock, FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

interface user {
  _id?: string
  password: string
  username: string
  email: string
  updatedAt?: string
  createdAt?: string
}
interface ModalStates {
  edit: boolean
  remove: boolean
}

const zeroState: user = {
  password: '',
  username: '',
  email: '',
}

export default function Users() {
  const [users, setUsers] = useState([] as user[])
  const [modal, setModal] = useState({
    edit: false,
    remove: false,
  } as ModalStates)
  const [currentUser, setCurrentUser] = useState({} as user)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await GET('/users')
    setUsers(response)
  }

  const headers = ['Usuário', 'Email', 'Ações']
  const fields = ['username', 'email', 'action']

  return (
    <AuthenticatedLayout>
      <div className='p-6 w-full'>
        <div className='w-full flex justify-between'>
          <h1 className='text-2xl'>Usuários</h1>
          <Button
            onClick={() => {
              setCurrentUser(zeroState), setModal({ ...modal, edit: true })
            }}>
            Novo
          </Button>
        </div>
        <hr className='my-6' />
        <Table>
          <TableHeader>
            {headers.map((header) => {
              return <TableColumn>{header}</TableColumn>
            })}
          </TableHeader>
          <TableBody>
            {users &&
              users.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {fields.map((field: keyof user) => {
                      return field != 'action' ? (
                        <TableCell> {item[field]} </TableCell>
                      ) : (
                        <TableCell>
                          <div className='relative flex items-center gap-2'>
                            <Tooltip content='Alterar senha'>
                              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                <FaLock />
                              </span>
                            </Tooltip>
                            <Tooltip content='Editar'>
                              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                                <FaEdit
                                  onClick={() => {
                                    setCurrentUser(item)
                                    setModal({ ...modal, edit: true })
                                  }}
                                />
                              </span>
                            </Tooltip>
                            <Tooltip color='danger' content='Remover'>
                              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                                <MdDelete onClick={() => setModal({ ...modal, remove: true })} />
                              </span>
                            </Tooltip>
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={modal.edit} onClose={() => setModal({ ...modal, edit: false })}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            {currentUser._id ? 'Editar usuário' : 'Novo usuário'}
          </ModalHeader>
          <ModalBody>
            <>
              <Input
                label='Usuário'
                value={currentUser.username}
                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              />
              <Input
                type='email'
                label='Email'
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />

              <ModalFooter>
                <Button color='danger' variant='light' onClick={() => setModal({ ...modal, edit: false })}>
                  Cancelar
                </Button>
                <Button
                  color='primary'
                  onClick={async () =>
                    currentUser && currentUser._id
                      ? await PUT(`/users/${currentUser._id}`, currentUser)
                      : await POST(`/users`, currentUser)
                  }>
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
              <ModalHeader className='flex flex-col gap-1'>Remover paciente</ModalHeader>
              <ModalBody>
                <p>
                  Gostaria mesmo de remover usuário <b>{currentUser.username}</b>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={async () => await DELETE(`/users/${currentUser._id}`)}>
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
