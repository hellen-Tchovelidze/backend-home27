'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '@/app/common/api/axios'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/app/common/store/authStore'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default function Login() {
  const router = useRouter()
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    const res = await api.post('/auth/login', data)
    setToken(res.data.token)
    setUser(res.data.user)
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <input {...register('email')} placeholder="Email" className="border px-2 py-1 w-full" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register('password')}
        placeholder="Password"
        type="password"
        className="border px-2 py-1 w-full"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  )
}
