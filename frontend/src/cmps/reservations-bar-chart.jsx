import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { range } from 'lodash'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
      legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
        enabled: true,
    }
  },
}

export function ReservBarChart({ orders }) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  function calcMonthsBack() {
    const currMonth = new Date().getMonth()
    if (currMonth - 4 >= 0) {
      const months = range(currMonth - 4, currMonth + 1).map((month) => ({
        month,
        year: new Date().getFullYear(),
      }))
      return months
    } else {
      const prevYearMonths = range(12 + (currMonth - 4), 12).map((month) => ({
        month,
        year: new Date().getFullYear() - 1,
      }))
      const currYearMonths = range(0, currMonth + 1).map((month) => ({
        month,
        year: new Date().getFullYear(),
      }))
      return [...prevYearMonths, ...currYearMonths]
    }
  }

  const labels = calcMonthsBack().map((monthNum) => months[monthNum.month])
  const monthsSum = calcMonthsBack().map((monthNum) => {
    let monthSum = 0
    orders
      .filter(
        (order) =>
          new Date(order.aboutOrder.startDate).getMonth() === monthNum.month &&
          new Date(order.aboutOrder.startDate).getFullYear() === monthNum.year &&
          order.aboutOrder.status === 'Approved'
      )
      .forEach((order) => (monthSum += order.aboutOrder.totalPrice))
    return monthSum
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Total income',
        data: monthsSum,
        backgroundColor: ['#6c26fc', '#1d28de', '#2d83f5','#1db9de', '#21ffd3'],
      },
    ],
  }
  return <Bar options={options} height={100} data={data} />
}
