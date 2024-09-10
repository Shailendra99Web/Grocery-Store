'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment'
import MyOrderItem from './MyOrderItem'
import { useDispatch, useSelector } from 'react-redux'
import { loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice'
import { Loader2Icon } from 'lucide-react'

function MyOrder() {

    const user = useSelector((state) => state.sharingData.userId)
    const jwt = useSelector((state) => state.sharingData.jwt)
    const [loadingOrder, setLoadingOrder] = useState(true)

    const [orderList, setOrderList] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100)); 
    }, [])

    useEffect(() => {
        if (jwt) {
            getMyOrder()
        }
    }, [user, jwt])

    const getMyOrder = async () => {
        const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
        console.log(orderList_)
        setOrderList(orderList_)
        setLoadingOrder(false)
    }

    return (
        <div>
            <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>My order</h2>
            <div className='py-8 mx-7 md:mx-20 text-center'>
                <h2 className='text-3xl font-bold text-primary'>Order History</h2>
            </div>
            <div className='text-center'>
                {loadingOrder ? <Loader2Icon className='animate-spin m-auto'/> : orderList && orderList.map((item, index) => (
                    <div key={index} className='overflow-scroll'>
                        <Collapsible className='mb-3'>
                            <CollapsibleTrigger>
                                <div className='w-full border p-2 bg-slate-200 flex justify-evenly gap-24 rounded-md'>
                                    <h2><span className="font-bold mr-2">Order Date: </span>{moment(item.createdAt).format('DD/MMM/YYY')}</h2>
                                    <h2 ><span className='font-bold mr-2'>Total Amount: </span>{item?.totalOrderAmount}</h2>
                                    <h2 ><span className='font-bold mr-2'>Status: </span>{item?.status}</h2>
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            {/* <p className='bg-pink-500'>Hello</p> */}
                                {item.orderItemList.map((order, index_)=>(
                                    <MyOrderItem className='' orderItem={order} key={index_}/>
                                ))}
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MyOrder