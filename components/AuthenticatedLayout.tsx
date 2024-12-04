import React, { ReactNode } from 'react'
import { Button } from '@nextui-org/button'
import SideBar from './SideBar'



interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <>
      <div className='flex w-full items-center justify-between'>

        <img src="./logo.png" alt="" className='max-w-64' />
        <Button color="primary" >
          Logout
        </Button >

      </div>
      <main className="flex ">

        <SideBar />
        {children}
      </main>
    </>
  )
}
