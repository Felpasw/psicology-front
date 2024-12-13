'use client'
import React, { useState } from 'react'
import { VscGraph } from 'react-icons/vsc'
import { FaUsers } from 'react-icons/fa'
import { FaUserDoctor } from 'react-icons/fa6'
import { FaCalendar } from 'react-icons/fa'

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState)
  }

  return (
    <div>
      {/* Sidebar */}
      <aside
        id='default-sidebar'
        className={` top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label='Sidebar'>
        <img src='./logo.png' alt='' className='max-w-64' />

        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li>
              <a
                href='/dashboard'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <VscGraph />

                <span className='ms-3'>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href='/users'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <FaUsers />

                <span className='flex-1 ms-3 whitespace-nowrap'>Usuários</span>
              </a>
            </li>
            <li>
              <a
                href='/patients'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <FaUserDoctor />
                <span className='flex-1 ms-3 whitespace-nowrap'>Pacientes</span>
              </a>
            </li>
            <li>
              <a
                href='/schedule'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <FaCalendar />
                <span className='flex-1 ms-3 whitespace-nowrap'>Agenda</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
