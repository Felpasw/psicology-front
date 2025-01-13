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
import { FaLock, FaEdit, FaEye, FaEyeSlash, FaUsers } from 'react-icons/fa'
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
  password: boolean
}

const zeroState: user = {
  password: '',
  username: '',
  email: '',
}

interface password {
  password: string
  confirmPassword: string
}

interface passwordVisible {
  password: boolean
  confirmPassword: boolean
}

interface errors {
  password: string,
  confirmPassword: string,
  email: string,
  username: string,
}

export default function Users() {
  const [users, setUsers] = useState([] as user[])
  const [modal, setModal] = useState({
    edit: false,
    remove: false,
  } as ModalStates)
  const [currentUser, setCurrentUser] = useState({} as user)
  const [password, setPassword] = useState({} as password)
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  } as passwordVisible)
  const [errors, setErrors] = useState({} as errors)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await GET('/users')
    setUsers(response)
  }

  const requestMethods = {
    getUsers: async () => {
      const response = await GET('/users')
      setUsers(response)
    },
    putUsers: async () => {
      const response = await PUT(`/users/${currentUser._id}`, currentUser)
      setErrors(response.data ? response.data : {} as errors)
      await requestMethods.getUsers()

    },
    postUsers: async () => {
      const response = await POST(`/users`, { ...currentUser, ...password })
      setErrors(response.data ? response.data : {} as errors)
      await requestMethods.getUsers()

    },
    changePassword: async () => {
      const response = await POST(`/change-password`, { ...password, _id: currentUser._id })
      setErrors(response.data ? response.data : {} as errors)

    },
    deleteUser: async () => {
      await DELETE(`/users/${currentUser._id}`)
      await requestMethods.getUsers()
      setModal({ ...modal, remove: false })
    }

  }



  const headers = ['Usuário', 'Email', 'Ações']
  const fields = ['username', 'email', 'action']

  return (
    <AuthenticatedLayout>
      <div className='p-6 w-full'>
        <div className='w-full flex justify-between mt-24'>
          <h1 className='text-5xl flex items-center gap-6 text-[#0061EE]'> <FaUsers /> Usuários</h1>

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
                                <FaLock
                                  onClick={() => {
                                    setCurrentUser(item)
                                    setModal({ ...modal, password: true })
                                  }}
                                />
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
                                <MdDelete onClick={() => {
                                  setModal({ ...modal, remove: true })
                                  setCurrentUser(item)
                                }} />
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
      <Modal isOpen={modal.edit} onClose={() => setModal({ ...modal, edit: false })} backdrop='blur'>
        <ModalContent>
          <ModalHeader >
            {currentUser._id ? 'Editar usuário' : 'Novo usuário'}
          </ModalHeader>
          <ModalBody>
            <>
              <Input
                label='Usuário'
                isInvalid={!!errors.username}
                errorMessage={errors.username}
                value={currentUser.username}
                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              />
              <Input
                type='email'
                label='Email'
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              />
              {!currentUser._id &&
                <>
                  <Input
                    type={passwordVisible.password ? 'text' : 'password'}
                    label='Senha'
                    isInvalid={!!errors.password}
                    errorMessage={errors.password}
                    value={password.password}
                    endContent={
                      <button
                        className='focus:outline-none'
                        type='button'
                        onClick={() => {
                          setPasswordVisible({ ...passwordVisible, password: !passwordVisible.password })
                        }}
                        aria-label='toggle password visibility'>
                        {passwordVisible.password ? (
                          <FaEye className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                    onChange={(e) => setPassword({ ...password, password: e.target.value })}
                  />
                  <Input
                    type={passwordVisible.confirmPassword ? 'text' : 'password'}
                    label='Confirmar senha'
                    value={password.confirmPassword}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword}
                    endContent={
                      <button
                        className='focus:outline-none'
                        type='button'
                        onClick={() => {
                          setPasswordVisible({ ...passwordVisible, confirmPassword: !passwordVisible.confirmPassword })
                        }}
                        aria-label='toggle password visibility'>
                        {passwordVisible.confirmPassword ? (
                          <FaEye className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                    onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                  />
                </>
              }
              <ModalFooter>
                <Button color='danger' variant='light' onClick={() => setModal({ ...modal, edit: false })}>
                  Cancelar
                </Button>
                <Button
                  color='primary'
                  onClick={async () =>
                    currentUser && currentUser._id
                      ? requestMethods.putUsers()
                      : requestMethods.postUsers()
                  }>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={modal.remove} onClose={() => setModal({ ...modal, remove: false })} backdrop='blur'>
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
                <Button color='primary' onPress={() => requestMethods.deleteUser()}>
                  Remover
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={modal.password} onClose={() => setModal({ ...modal, password: false })} backdrop='blur'>
        <ModalContent>
          <ModalBody>
            <>
              <ModalHeader className='flex gap-2 items-center'>
                Alterar senha de
                <b> {currentUser.username} </b>
              </ModalHeader>

              <Input
                type={passwordVisible.password ? 'text' : 'password'}
                label='Senha'
                value={password.password}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={() => {
                      setPasswordVisible({ ...passwordVisible, password: !passwordVisible.password })
                    }}
                    aria-label='toggle password visibility'>
                    {passwordVisible.password ? (
                      <FaEye className='text-2xl text-default-400 pointer-events-none' />
                    ) : (
                      <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                    )}
                  </button>
                }
                onChange={(e) => setPassword({ ...password, password: e.target.value })}
              />
              <Input
                type={passwordVisible.confirmPassword ? 'text' : 'password'}
                label='Confirmar senha'
                value={password.confirmPassword}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                endContent={
                  <button
                    className='focus:outline-none'
                    type='button'
                    onClick={() => {
                      setPasswordVisible({ ...passwordVisible, confirmPassword: !passwordVisible.confirmPassword })
                    }}
                    aria-label='toggle password visibility'>
                    {passwordVisible.confirmPassword ? (
                      <FaEye className='text-2xl text-default-400 pointer-events-none' />
                    ) : (
                      <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
                    )}
                  </button>
                }
                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
              />

              <ModalFooter>
                <Button color='danger' variant='light' onClick={() => setModal({ ...modal, password: false })}>
                  Cancelar
                </Button>
                <Button color='primary' onClick={() => requestMethods.changePassword()}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </AuthenticatedLayout>
  )
}
