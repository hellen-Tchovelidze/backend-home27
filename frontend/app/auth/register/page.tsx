'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '@/app/common/api/axios'
import { useRouter } from 'next/navigation'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    await api.post('/auth/register', data)
    router.push('/auth/login')
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
        Register
      </button>
    </form>
  )
}
