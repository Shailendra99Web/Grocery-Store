'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { ArrowLeftSquareIcon, Loader2Icon } from 'lucide-react'
import {  useDispatch } from 'react-redux'
import { jwt_Reducer, userId_Reducer, loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice'

const CreateAccount = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState()
    const router = useRouter()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100))
    },[])

    const onCreateAccount = () => {
        setLoader(true)
        GlobalApi.registerUser(username, email, password).then(resp => {
            console.log(resp.data.user)
            console.log(resp.data.jwt)
            sessionStorage.setItem('user', JSON.stringify(resp.data.user))
            sessionStorage.setItem('jwt', resp.data.jwt)
            dispatch(userId_Reducer(resp.data.user))
            dispatch(jwt_Reducer(resp.data.jwt))
            toast('Account Created Successfully')
            dispatch(loadingBarProgress_Reducer(50))
            router.push('/')
            setLoader(false)
        }, (e) => {
            toast(e?.response?.data?.error?.message)
            setLoader(false)
        })
    }

    return (
        <div className='flex items-center justify-center my-8 sm:my-20'>
            <div className='relative flex flex-col items-center justify-center p-3 sm:p-10 bg-slate-100 border border-gray-200'>
                <Link href={'/'} onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }}><Button className='absolute top-0 left-0 bg-slate-100 hover:bg-slate-100 hover:text-gray-700 border-transparent' variant="outline"><ArrowLeftSquareIcon /></Button></Link>
                <Image src='/images/logo.png' width={200} height={200} className='w-auto h-auto' alt='logo'></Image>
                <h2 className='font-bold text-3xl'>Create Account</h2>
                <p className='text-gray-500'>Enter your Email and Password to Create an account</p>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' />
                    <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='name@example.com' />
                    <Input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                    <Button onClick={onCreateAccount} disabled={!(username || email || password)}>{
                        loader ? <Loader2Icon className='animate-spin' /> : 'Create an Account'
                    }</Button>
                    <p>Already have an account ?
                        <Link href={'/sign-in'} onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }} className='text-blue-500'> Click here to Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount
