import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail'


const ProductItem = ({ product }) => {
    return (
        <div className='p-2 md:p-6 grid flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.attributes?.images?.data[0]?.attributes?.url} unoptimized={true} width={500} height={200} alt={product.attributes.name} className=' h-auto sm:h-[200px] w-[200px] object-contain' />
            <div className='p-2 md:p-6 flex flex-col self-end items-center justify-center gap-3'>
                <h2 className='font-bold text-lg'>{product.attributes.name}</h2>
                <div className="flex gap-3">
                    {product.attributes.sellingPrice &&
                        <h2 className='font-bold text-lg'>${product.attributes.sellingPrice}</h2>
                    }
                    <h2 className={`font-bold text-lg ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>${product.attributes.mrp}</h2>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='text-primary hover:text-white hover:bg-primary'>Add to cart</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[95vh] max-w-96 lg:max-w-[60%] overflow-auto p-4">
                        <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription>
                                <ProductItemDetail product={product}/>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}

export default ProductItem
