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
      <main className='flex'>
        <SideBar />
        {children}
      </main>
    </>
  )
}
