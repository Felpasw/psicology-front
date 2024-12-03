import React, { ReactNode } from 'react'
import { Button } from '@nextui-org/button'



interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <>
    <div className='flex w-full items-center justify-between'> 

      <img src="./logo.png" alt="" className='max-w-64'/>
      <Button color="primary" >
        Logout
      </Button >

    </div>
      <main className="flex ">
        
        <div className='min-h-[50vh] flex flex-col justify-between mr-12 items-center'>
          <a href="/patients" className='w-full'>
          <Button color='primary' variant='light'  >
            Pacientes
          </Button>
          </a>
          <a href="/schedule">
          <Button color='primary' variant='light'  >
            Consultas
          </Button>
          </a>
          <a href="/users">

          <Button color='primary' variant='light' className='w-full' >
            Usuários
          </Button>
          </a>
        </div>
        {children}
        </main>
    </>
  )
}
