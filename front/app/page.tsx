'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios-instance";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState<any>(null)
  const token = getCookie('token')
  const [page, setPage] = useState(1)
  const [paginationCount, setPaginationCount] = useState<number[]>([])

  if (!token) {
    router.push('/auth/sign-in')
    return null
  }

  const getCurrentUser = async (token: string) => {
    try {
      const resp = await axiosInstance.get('/auth/current-user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (resp.status === 200) {
        setUser(resp.data)
      }
    } catch (e) {
      deleteCookie('token')
      router.push('/auth/sign-in')
    }
  }

  const getAllPosts = async (token: string, page: number) => {
    const resp = await axiosInstance.get(`/posts?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (resp.status === 200) {
      setPosts(resp.data)
    }

  }

  useEffect(() => {
    if (token) {
      getCurrentUser(token as string)
      getAllPosts(token as string, page)
    }
  }, [])

  useEffect(() => {
    if(posts?.total){
      const count = Math.ceil(posts.total / posts.take)
      const pageCount = []
      for(let i = 1; i<= count; i++){
        pageCount.push(i)
      }
      setPaginationCount(pageCount)
    }
  }, [posts])

  const handleChangePage = async (page: number) => {
    setPage(page)
    await getAllPosts(token as string, page)
    window?.scrollTo(0, 0)
  }



  return (
    <div>
      <h1>hello wrold</h1>
      <Link href={'#20'}>Anrias ro unda</Link>
      <div className="grid grid-cols-3 gap-4">
        {posts && posts.posts?.map((p: any, i: number) => (
          <Card id={i.toString()} className="w-full">
            <CardHeader>
              {p.title}
            </CardHeader>
            <CardDescription>
              {p.desc}
            </CardDescription>
          </Card>
        ))}
      </div>
      {paginationCount.map(p => (
        <Button onClick={() => handleChangePage(p)} variant={page === p ? 'destructive': 'default'} >{p}</Button>
      ))}
      <div className="mt-20"></div>

      <div id="andria">Andrias ro unda </div>
    </div>
  );
}
