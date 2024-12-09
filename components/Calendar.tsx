'use client'

import { Button } from '@nextui-org/button'
import React, { useState } from 'react'
import { HiChevronDoubleLeft } from 'react-icons/hi'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const days = []
    let day = new Date(firstDay)

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    while (day <= lastDay) {
      days.push(new Date(day))
      day.setDate(day.getDate() + 1)
    }

    return days
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    setCurrentDate(nextMonth)
  }

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    setCurrentDate(prevMonth)
  }

  const daysInMonth = getDaysInMonth(currentDate)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date)
  }

  return (
    <div className='w-1/2 min-h-screen p-12'>
      {/* Navegação */}
      <div className='flex justify-between items-center mb-4'>
        <Button onClick={handlePreviousMonth}>
          <HiChevronDoubleLeft />
        </Button>
        <h2>{formatDate(currentDate)}</h2>
        <Button onClick={handleNextMonth}>
          <HiChevronDoubleLeft className='rotate-180' />
        </Button>
      </div>

      {/* Blocos do calendário */}
      <div className='grid grid-cols-7 gap-2'>
        {daysOfWeek.map((item, index) => (
          <div key={index} className='text-center font-bold'>
            {item}
          </div>
        ))}
        {daysInMonth.map((day, index) =>
          day ? (
            <div
              key={day.toISOString()}
              className={`border p-2 text-center rounded ${
                day.toDateString() === today.toDateString() ? 'bg-blue-500 text-white font-bold' : 'bg-black'
              }`}>
              {day.getDate()}
            </div>
          ) : (
            <div key={index} className='border p-2 bg-transparent'></div>
          )
        )}
      </div>
    </div>
  )
}

export default Calendar
