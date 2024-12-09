'use client'

import React, { ReactNode } from 'react'
import { Button } from '@nextui-org/button'
import SideBar from './SideBar'
import { IoLogOutSharp } from 'react-icons/io5'
import { Tooltip } from '@nextui-org/react'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <img src='./logo.png' alt='' className='max-w-64' />
        <div className='flex'>
          <Tooltip content='Sair'>
            <IoLogOutSharp />
          </Tooltip>
          <Tooltip content='Perfil'>
            <IoLogOutSharp />
          </Tooltip>
        </div>
      </div>
      <main className='flex'>
        <SideBar />
        {children}
      </main>
    </>
  )
}
