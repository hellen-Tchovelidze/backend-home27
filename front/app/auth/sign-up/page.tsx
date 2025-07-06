'use client'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from "react-hook-form"
import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema, SignUpType } from '@/validation/sign-up.schema'
import { toast } from 'sonner'
import { axiosInstance } from '@/lib/axios-instance'
import { useRouter } from 'next/navigation'

export default function SignUp() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpSchema),
    })

    const onSubmit = async ({age, email, fullName, password}: SignUpType) => {
        try{
            const resp = await axiosInstance.post('/auth/sign-up', {
                age,
                email,
                fullName,
                password
            })
            if(resp.status === 201){
                toast.success('regited successfully')
                router.push('/auth/sign-in')
                return
            }
            toast.error(resp.data.message)
        }catch(e: any){
            console.log(e,"e")
            if(typeof e.response.data.message === 'string'){
                toast.error(e.response.data.message)
            }
            if(typeof e.response.data.message === 'object' && Array.isArray(e.response.data.message)){
                toast.error(e.response.data.message.map((e: string) => e))
            }
        }
    }

    useEffect(() => {
        if(Object.keys(errors)){
            toast.error('Fill requerd fields')
        }
    }, [errors])

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardAction>
                        <Button variant="link">Sign In</Button>
                    </CardAction>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="fullname">FullName</Label>
                                <Input
                                    {...register('fullName')}
                                    id="fullname"
                                    type="text"
                                    placeholder="John doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    {...register('age')}
                                    id="age"
                                    type="number"
                                    placeholder="24"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input {...register('password')} id="password" type="password" required />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 mt-4">
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
