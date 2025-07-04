// app/page.tsx
"use client"

import { useAuthStore } from '@/app/common/store/authStore'
import Link from 'next/link'

export default function HomePage() {
  const user = useAuthStore((s) => s.user)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {user ? user.email : 'Guest'}</h1>

      {!user ? (
        <div className="space-x-4">
          <Link href="/auth/login" className="text-blue-600 underline">
            Login
          </Link>
          <Link href="/auth/register" className="text-blue-600 underline">
            Register
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link href="/posts/create" className="bg-green-600 text-white px-4 py-2 rounded">
            Create Post
          </Link>

          {user.role === 'admin' && (
            <Link href="/analytics" className="bg-blue-600 text-white px-4 py-2 rounded">
              Go to Analytics
            </Link>
          )}
        </div>
      )}
    </main>
  )
}
