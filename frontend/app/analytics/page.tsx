'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/common/store/authStore'
import api from '@/app/common/api/axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export default function AnalyticsPage() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/')
    } else {
      api.get('/analytics').then((res) => setData(res.data))
    }
  }, [user])

  if (!data) return <div>Loading...</div>

  const chartData = [
    { name: 'Users', value: data.totalUsers },
    { name: 'Expenses', value: data.totalExpenses },
    { name: 'Transactions', value: data.totalTransactions },
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
