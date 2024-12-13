'use client'
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { GET } from '@/crud'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
      },
    },
    title: {
      display: true,
      text: 'Faturamento no ano',
      color: '#ffffff',
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff',
      },
    },
    y: {
      ticks: {
        color: '#ffffff',
      },
    },
  },
}

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function Graph() {
  const [fetchedData, setFetchedData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await GET('/report/getMonthlyRevenue')
    console.log(response)
  }

  const data = {
    labels,
    datasets: [
      {
        label: '2024',
        data: fetchedData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return <Line options={options} data={data} className='max-w-[100%]' />
}
