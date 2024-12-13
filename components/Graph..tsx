'use client'
import React from 'react'
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

export const data = {
  labels,
  datasets: [
    {
      label: '2024',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export function Graph() {
  return <Line options={options} data={data} className='max-w-[100%]' />
}
