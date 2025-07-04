"use client"

import { useEffect, useState } from "react"
import api from "@/app/common/api/axios"
import Link from "next/link"

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    api.get("/posts").then((res) => setPosts(res.data))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      <Link href="/posts/create" className="text-blue-600 underline mb-4 inline-block">+ New Post</Link>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-2 rounded shadow-sm">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
