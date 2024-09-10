'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeftCircleIcon, ArrowLeftSquareIcon, Loader2Icon, LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { jwt_Reducer, loadingBarProgress_Reducer, userId_Reducer } from '@/app/redux/sharingData/sharingDataSlice'

const SignIn = () => {
    const jwt = useSelector((state) => state.sharingData.jwt)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState()
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100))
        if (jwt) {
            router.push('/')
        }
    }, [])

    const onSignIn = () => {
        setLoader(true)
        GlobalApi.signIn(email, password).then(resp => {
            console.log(resp.data.user)
            console.log(resp.data.jwt)
            sessionStorage.setItem('user', JSON.stringify(resp.data.user))
            sessionStorage.setItem('jwt', resp.data.jwt)
            dispatch(userId_Reducer(resp.data.user))
            dispatch(jwt_Reducer(resp.data.jwt))
            toast('Login Successfully')
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
                <Link href='/' onClick={()=>{dispatch(loadingBarProgress_Reducer(50))}}><Button className='absolute top-0 left-0 bg-slate-100 hover:text-gray-700 hover:bg-slate-100 border-transparent' variant="outline"><ArrowLeftSquareIcon/></Button></Link>
                <Image src='/images/logo.png' width={200} height={200} className='w-auto h-auto' alt='logo'></Image>
                <h2 className='font-bold text-3xl'>Sign In to Account</h2>
                <p className='text-gray-500'>Enter your Email and Password to Sign In</p>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='name@example.com' />
                    <Input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' />
                    <Button onClick={onSignIn} disabled={!(email || password)}>
                        {loader?<Loader2Icon className='animate-spin'/>:'Sign In'}
                    </Button>
                    <p>Don't have an account ?<Link href='/create-account' onClick={()=>{dispatch(loadingBarProgress_Reducer(50))}} className='text-blue-500'> Click here to create new account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
