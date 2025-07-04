'use client'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '@/app/common/api/axios'
import { useRouter } from 'next/navigation'

const schema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
})

export default function CreatePostPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const onSubmit = async (data: any) => {
    await api.post('/posts', data)
    router.push('/posts')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <input {...register('title')} placeholder="Title" className="border px-2 py-1 w-full" />
      <textarea {...register('content')} placeholder="Content" className="border px-2 py-1 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  )
}
