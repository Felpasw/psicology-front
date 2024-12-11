'use client'

import { Button } from '@nextui-org/button'
import { Badge } from '@nextui-org/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { HiChevronDoubleLeft } from 'react-icons/hi'

interface Schedule {
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  status: 'confirmed' | 'pending' | 'cancelled'
  location: string
  createdBy: string
}

interface props {
  setDate: Dispatch<SetStateAction<Date>>
  date: Date
  schedules: Schedule[]
  setMonth: Dispatch<SetStateAction<number>>
}

const Calendar = ({ setDate, date, schedules, setMonth }: props) => {
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
      days.push({ date: null })
    }

    while (day <= lastDay) {
      const appoitmentsRegistered = verifySchedule(day)
      days.push({ date: new Date(day), appoitmentsRegistered })
      day.setDate(day.getDate() + 1)
    }

    return days
  }
  const verifySchedule = (day: Date) => {
    let num = 0

    if (schedules) {
      schedules.forEach((item) => {
        const date = new Date(`${item.date.split('T')[0]}T00:00:00`)

        const isSameDate =
          date.getFullYear() === day.getFullYear() &&
          date.getMonth() === day.getMonth() &&
          date.getDate() === day.getDate()

        if (isSameDate) {
          num++
        }
      })
    }

    return num
  }

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    setCurrentDate(nextMonth)
    console.log(nextMonth)

    setMonth(nextMonth.getMonth() + 1)
  }

  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    setCurrentDate(prevMonth)

    setMonth(prevMonth.getMonth() + 1)
  }

  const daysInMonth = getDaysInMonth(currentDate)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date)
  }

  return (
    <div className='w-1/2 min-h-screen p-12'>
      <div className='flex justify-between items-center mb-4'>
        <Button onClick={handlePreviousMonth}>
          <HiChevronDoubleLeft />
        </Button>
        <h2>{formatDate(currentDate)}</h2>
        <Button onClick={handleNextMonth}>
          <HiChevronDoubleLeft className='rotate-180' />
        </Button>
      </div>

      <div className='grid grid-cols-7 gap-2'>
        {daysOfWeek.map((item, index) => (
          <div key={index} className='text-center font-bold'>
            {item}
          </div>
        ))}
        {daysInMonth.map((day, index) =>
          day.appoitmentsRegistered && day.date ? (
            <Badge color='primary' content={day.appoitmentsRegistered}>
              <div
                onClick={() => setDate(day.date)}
                key={day.date.toISOString()}
                className={`border p-2 cursor-pointer text-center rounded w-full ${
                  day.date.toDateString() === today.toDateString() ? 'bg-blue-500 text-white font-bold' : 'bg-black'
                } ${date.toDateString() === day.date.toDateString() ? 'border-red-500' : ''}`}>
                {day.date.getDate()}
              </div>
            </Badge>
          ) : day.date ? (
            <div
              onClick={() => setDate(day.date)}
              key={day.date.toISOString()}
              className={`border p-2 cursor-pointer text-center rounded ${
                day.date.toDateString() === today.toDateString() ? 'bg-blue-500 text-white font-bold' : 'bg-black'
              } ${date.toDateString() === day.date.toDateString() ? 'border-red-500' : ''}`}>
              {day.date.getDate()}
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
