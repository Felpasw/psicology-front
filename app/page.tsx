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
    <main className='flex flex-col items-center justify-center min-h-[100vh] gap-12'>
      <img src='./logo.png' alt='' />
      <Input
        type='email'
        label='Email'
        isInvalid={!!apiReponse.email}
        errorMessage={apiReponse.email}
        value={login.email}
        onChange={(e) => setLogin({ ...login, email: e.target.value })}
      />
      <Input
        type='password'
        label='Senha'
        isInvalid={!!apiReponse.password}
        errorMessage={apiReponse.password}
        value={login.password}
        onChange={(e) => setLogin({ ...login, password: e.target.value })}
      />
      <Button color='primary' variant='light' className='w-full' onClick={submit}>
        Enviar
      </Button>
    </main>
  )
}
