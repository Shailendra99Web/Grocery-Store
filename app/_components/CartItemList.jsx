'use client'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2Icon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

// const CartItemList = ({ cartItemList , onDeleteItem }) => {
const CartItemList = ({ cart, index, onDeleteItem}) => {
    const [loading, setLoading] = useState(false)

    const onDelete = async(cartId)=>{
        setLoading(true)
        let loadingValue = await onDeleteItem(cartId)
        setLoading(false)
    }

    return (
        <div>
            {/* <div className='h-[400px] overflow-auto'> */}
                {/* {cartItemList.map((cart, index)=>( */}
                    <div key={index} className='flex justify-between items-center p-2 mb-5'>
                        <div className='flex gap-6 items-center '>
                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image} width={70} height={70} alt={cart.name} unoptimized={true} className='border p-2 '/>
                            <div>
                                <p className='font-bold'>{cart.name}</p>
                                <p className=''>Quantity {cart.quantity}</p>
                                <p className='text-lg font-bold'>$ {cart.amount}</p>
                            </div>
                        </div>
                        {loading ? <Loader2 className='animate-spin'/>:<Trash2Icon onClick={()=>{onDelete(cart.id)}} className='cursor-pointer hover:text-gray-600'/>}
                        
                    </div>
                {/* ))} */}
            {/* </div> */}
        </div>
    )
}

export default CartItemList
