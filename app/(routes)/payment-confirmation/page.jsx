'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { loadingBarProgress_Reducer, updateCart_Reducer } from '@/app/redux/sharingData/sharingDataSlice'


const PaymentConfirmation = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.sharingData.userId)
    const jwt = useSelector((state) => state.sharingData.jwt)

    const cartItemList = useSelector((state) => state.sharingData.cartItemList)
    const totalAmount = useSelector((state) => state.sharingData.totalAmount)
    const updateCart = useSelector((state) => state.sharingData.updateCart)
    const subTotal = useSelector((state) => state.sharingData.subTotal)

    const username = useSelector((state) => state.sharingData.username)
    const email = useSelector((state) => state.sharingData.email)
    const phone = useSelector((state) => state.sharingData.phone)
    const address = useSelector((state) => state.sharingData.address)
    const zip = useSelector((state) => state.sharingData.zip)

    const router = useRouter()

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100)); 
    }, [])

    useEffect(() => {
        if (user && jwt) {
            console.log('user' + user.id)
        }
    }, [user, jwt])

    useEffect(() => {
        console.log('totalAmount' + totalAmount)
        console.log('username' + username)
        console.log('cartItemList' + cartItemList)
    }, [])

    const onApprove = async (data) => {
        console.log('onApprove kansuu ....')
        console.log('totalAmount' + totalAmount)
        console.log('username' + username)
        // console.log('cartItemList' + cartItemList)

        console.log(data)

        const payload = {
            data: {
                paymentId: (data.paymentID).toString(),
                totalOrderAmount: totalAmount,
                username: username,
                email: email,
                phone: phone,
                zip: zip,
                address: address,
                orderItemList: cartItemList,
                userId: user.id
            }
        }

        await GlobalApi.createOrder(payload, jwt).then(resp => {
            console.log(resp);
            toast('Order Places Successfully!')
            cartItemList.forEach(async (item, index) => {
                await GlobalApi.deleteCartItem(item.id, jwt).then(resp => {
                })
            })
            // getCartItems()
            })
        console.log('Dispatching wa shita yo')
        dispatch(loadingBarProgress_Reducer(50))
        
        setTimeout(() => {
            dispatch(updateCart_Reducer(!updateCart))
            router.replace('/order-confirmation')
        }, 1000);
    }

    return (
        <div className='my-7 mx-auto border w-1/2'>
            <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({cartItemList.length})</h2>
            <div className='p-4 flex flex-col gap-4'>
                <h2 className='font-bold flex justify-between'>Subtotal: <span>${subTotal}</span></h2>
                <hr />
                <h2 className='flex justify-between'>Delivery: <span>$15:00</span></h2>
                <h2 className='flex justify-between'>Tax (9%): <span>${(cartItemList.length * 0.9).toFixed(2)}</span></h2>
                <hr />
                <h2 className='font-bold flex justify-between'>Total : <span>${totalAmount}</span></h2>
                <PayPalButtons style={{ layout: "horizontal" }}
                    className='w-full mx-auto'
                    disabled={!(username && email && address && zip)}

                    forceReRender={[jwt, user]}

                    createOrder={async (data, actions) => {
                        console.log('data', data)
                        console.log('actions', actions)
                        console.log('createOrder kansuu ....')
                        console.log('totalAmount' + totalAmount)
                        console.log('username' + username)
                        // console.log('cartItemList' + cartItemList)

                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: totalAmount,
                                        currency_code: 'USD'
                                    }
                                }
                            ]
                        })
                    }}
                    onApprove={onApprove}
                />
            </div>
        </div>
    )
}

export default PaymentConfirmation
