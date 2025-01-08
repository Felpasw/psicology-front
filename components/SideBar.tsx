'use client'
import React, { useState } from 'react'
import { VscGraph } from 'react-icons/vsc'
import { FaUsers } from 'react-icons/fa'
import { FaUserDoctor } from 'react-icons/fa6'
import { FaCalendar } from 'react-icons/fa'


const Sidebar = () => {

  return (
    <div>

      <aside
        id='default-sidebar'
        className={` top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0`}
        aria-label='Sidebar'>
        <img src='./logo.png' alt='' className='max-w-64' />

        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-black'>
          <ul className='space-y-2 font-medium'>
            <li>
              <a
                href='/dashboard'
                className={`flex items-center ${window.location.pathname === '/dashboard' ? 'text-blue-400' : 'text-gray-900 dark:text-white'} p-2  rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                <VscGraph />

                <span className='ms-3'>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href='/users'
                className={`flex items-center p-2 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group ${window.location.pathname === '/users' ? 'text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                <FaUsers />

                <span className='flex-1 ms-3 whitespace-nowrap'>Usuários</span>
              </a>
            </li>
            <li>
              <a
                href='/patients'
                className={`flex items-center p-2  rounded-lg ${window.location.pathname === '/patients' ? 'text-blue-400' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
                <FaUserDoctor />
                <span className='flex-1 ms-3 whitespace-nowrap'>Pacientes</span>
              </a>
            </li>
            <li>
              <a
                href='/schedule'
                className={`flex items-center p-2  ${window.location.pathname === '/schedule' ? 'text-blue-400' : 'text-gray-900 dark:text-white'} rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
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
