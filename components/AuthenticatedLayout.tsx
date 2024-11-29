import React, { ReactNode } from 'react'
import Navbar from './navbar'

interface AuthenticatedLayoutProps {
  children: ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
