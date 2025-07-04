"use client"

import Link from "next/link"
import { useAuthStore } from "@/app/common/store/authStore"
import { useRouter } from "next/navigation"

export default function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  return (
    <header className="bg-gray-100 px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-bold">
        <Link href="/">My App</Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        {user?.role === "admin" && <Link href="/analytics">Analytics</Link>}
        <Link href="/posts">Posts</Link>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout} className="text-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
