'use client'
import { loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const OrderConfirmaion = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadingBarProgress_Reducer(100)); 
    },[])
    return (
        <div className='flex justify-center my-20'>
            <div className='border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32'>
                <CheckCircle2 className='h-24 w-24 text-primary'/>
                <h2 className='font-medium text-3xl text-primary'>Order Successful</h2>
                <h2>Thank you so much for order</h2>
                <Link href='/my-order' onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }}><Button className='mt-8'>Track your order</Button></Link>
            </div>
        </div>
    )
}

export default OrderConfirmaion
