'use client'
import { Button } from '@/components/ui/button'
import { Loader2Icon, LoaderCircle, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import GlobalApi from '../_utils/GlobalApi'
import { useSelector, useDispatch } from 'react-redux'
import { loadingBarProgress_Reducer, updateCart_Reducer } from '../redux/sharingData/sharingDataSlice'
import Link from 'next/link'

const ProductItemDetail = ({ product }) => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.sharingData.userId)
    const jwt = useSelector((state) => state.sharingData.jwt)
    const updateCart = useSelector((state) => state.sharingData.updateCart)
    const router = useRouter()

    const [productTotalPrice, setProductTotalPrice] = useState(
        product.attributes.sellingPrice ? product.attributes.sellingPrice : product.attributes.mrp
    )

    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)

    const addToCart = () => {
        setLoading(true)
        if (!jwt) {
            router.push('/sign-in');
            // setLoading(false)
        } else {
            const data = {
                data: {
                    quantity: quantity,
                    amount: (quantity * productTotalPrice).toFixed(2),
                    products: product.id,
                    users_permissions_users: user.id,
                    userId: user.id
                }
            }
            console.log(data)
            GlobalApi.addToCart(data, jwt).then(resp => {
                console.log(resp)
                toast('Added to Cart')
                dispatch(updateCart_Reducer(!updateCart))
                setLoading(false)

            }, (e) => {
                toast('Error while Adding to Cart')
                setLoading(false)

            })
        }
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 p-2 sm:space-x-5 bg-white text-black'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.attributes?.images?.data[0]?.attributes?.url} unoptimized={true} width={320} height={320} alt={product.attributes.name} className='bg-slate-200 p-2 w-80 h-auto lg:w-auto object-contain rounded-lg' />

            <div className='flex flex-col gap-3 pt-2 items-center'>
                <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
                <h2 className='hidden sm:block text-lg text-gray-500'>{product.attributes.description}</h2>

                <div className="hidden sm:flex gap-3">
                    {product.attributes.sellingPrice &&
                        <h2 className='font-bold text-3xl'>${product.attributes.sellingPrice}</h2>
                    }
                    <h2 className={`font-bold text-3xl ${product.attributes.sellingPrice && 'line-through text-gray-500'}`}>${product.attributes.mrp}</h2>
                </div>

                <h2 className='hidden sm:block font-bold text-lg'>Quantity: {product.attributes.itemQuantity + product.attributes.itemQuantityType}</h2>
                <div className='flex flex-col items-center'>
                    <div className='flex gap-3 items-center'>
                        <div className=' border flex items-center'>
                            <button className='px-5 py-2 border-e-2' disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <p className='px-5 py-2' >{quantity}</p>
                            <button className='px-5 py-2 border-s-2' onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>= ${(quantity * productTotalPrice).toFixed(2)}</h2>
                            <p>{(product.attributes.itemQuantity * quantity) + product.attributes.itemQuantityType}</p>
                        </div>
                    </div>
                    <Button className='flex gap-3 mt-4' onClick={addToCart} disabled={loading || !jwt}>
                        <ShoppingBasket />
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Add to Cart'}
                    </Button>
                    {!jwt && <Link className='text-red-600 hover:text-blue-500 mt-2' href='/sign-in' onClick={()=>{dispatch(loadingBarProgress_Reducer(50))}}>
                        <p>Please login first to add it your cart.</p>
                    </Link>}
                </div>
                <h2><span className='font-bold'>Category:</span> {product.attributes.categories.data[0].attributes.name}</h2>
            </div>
        </div>
    )
}

export default ProductItemDetail
