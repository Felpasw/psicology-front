'use client'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import { POST } from '@/crud'
interface login {
  email: string
  password: string
}

export default function Home() {
  const [login, setLogin] = useState({} as login)
  const [apiReponse, setApiResponse] = useState({} as login)

  const submit = async () => {
    const response = await POST('/login', login)

    if (response.error) {
      setApiResponse(response.data)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <main className='flex items-center justify-center min-h-[100vh] gap-12'>
      <div className='w-2/3'></div>
      <div className='flex flex-col items-center justify-center w-1/5 h-screen'>
        <img src='./logo.png' alt='' className='mb-5' />
        <Input
          type='email'
          label='Email'
          isInvalid={!!apiReponse.email}
          errorMessage={apiReponse.email}
          value={login.email}
          className='mb-5'
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
        <Input
          type='password'
          label='Senha'
          className='mb-5'
          isInvalid={!!apiReponse.password}
          errorMessage={apiReponse.password}
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <Button color='primary' variant='light' className='w-full' onClick={submit}>
          Enviar
        </Button>
      </div>
    </main>
  )
}
