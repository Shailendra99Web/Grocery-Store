import Image from 'next/image'
import React from 'react'

const MyOrderItem = ({orderItem}) => {
    return (
        <div className=' bg-slate-100 p-2 w-full sm:m-auto text-center rounded-sm'>
            <div className='grid grid-cols-4 items-center gap-2'>
                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+orderItem.product.data.attributes.images.data[0].attributes.url} width={80} height={80} alt='img' unoptimized={true} className='bg-gray-100 sm:p-5 rounded-md sm:border'/>
                <div className='cols-span-2'>
                    <h2>{orderItem.product.data.attributes.name}</h2>
                    <h2>Item Piece: {orderItem.product.data.attributes.mrp}</h2>
                </div>
                <h2>Quantity: {orderItem.quantity}</h2>
                <h2>Price: {orderItem.amount}</h2>
            </div>
            <hr className='mt-3'></hr>
        </div>
    )
}

export default MyOrderItem
