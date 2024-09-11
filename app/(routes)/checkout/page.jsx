'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigRight, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { toast } from 'sonner'
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cartItemList_Reducer, totalAmount_Reducer, username_Reducer, phone_Reducer, zip_Reducer, email_Reducer, address_Reducer, subTotal_Reducer, loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice'

const Checkout = () => {
    const user = useSelector((state) => state.sharingData.userId)
    const jwt = useSelector((state) => state.sharingData.jwt)
    const cartItemList = useSelector((state) => state.sharingData.cartItemList)
    const totalAmount = useSelector((state) => state.sharingData.totalAmount)
    const subTotal = useSelector((state) => state.sharingData.subTotal)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState(0)
    const [phone, setPhone] = useState(0)

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalCartItem, setTotalCartItem] = useState(0)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100)); 
    }, [])

    useEffect(() => {
        if (user && jwt) {
            console.log('user' + user.id)
            // getCartItems()
            setTotalCartItem(cartItemList?.length);
        } else{
            router.push('/sign-in');
        }
    }, [user, jwt])


    // Used to get Total Cart Item
    // const getCartItems = async () => {
    //     let cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    //     console.log(cartItemList_);
    //     setTotalCartItem(cartItemList_?.length);
    //     setCartItemList(cartItemList_);
    // }

    useEffect(() => {
        if (cartItemList.length != 0) {
            let total = 0;
            cartItemList.forEach(element => {
                total = total + element.amount;
            })
            console.log(total)
            setTotalPrice(total)
            dispatch(totalAmount_Reducer((total + total * 0.09 + 15).toFixed(2)))
            console.log('cartItemList ' + cartItemList.length)
        }
    }, [cartItemList])

    const createOrder_ = (data, actions) => {
        console.log('data', data)
        console.log('actions', actions)
        console.log('createOrder kansuu ....')
        console.log('totalAmount' + totalAmount)
        console.log('username' + username)
        console.log('cartItemList' + cartItemList)

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: '99',
                        currency_code: 'USD'
                    }
                }
            ]
        })

        // try {
        //     // create accessToken using your clientID and clientSecret
        //     // for the full stack example, please see the Standard Integration guide
        //     // https://developer.paypal.com/docs/multiparty/checkout/standard/integrate/
        //     const accessToken = "A21AAKOcfSHqPBkqnhgMBwzAFVbrnvwW69tWgvaw1IDQNvUxdCrzy-nU9SWBz3_Ro4bQRD8m5xUy6YVUnE56YcRx0PD3m9cKg";
        //     const responsc = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
        //         cache: 'no-store',
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //         body: JSON.stringify({
        //             "purchase_units": [
        //                 {
        //                     "amount": {
        //                         "currency_code": "USD",
        //                         "value": totalAmount
        //                     },
        //                     "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
        //                 }
        //             ],
        //             "intent": "CAPTURE",
        //             "payment_source": {
        //                 "paypal": {
        //                     "experience_context": {
        //                         "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
        //                         "payment_method_selected": "PAYPAL",
        //                         "brand_name": "EXAMPLE INC",
        //                         "locale": "en-US",
        //                         "landing_page": "LOGIN",
        //                         "shipping_preference": "GET_FROM_FILE",
        //                         "user_action": "PAY_NOW",
        //                         "return_url": "https://example.com/returnUrl",
        //                         "cancel_url": "https://example.com/cancelUrl"
        //                     }
        //                 }
        //             }
        //         })
        //     })

        //     console.log('orderData is coming...')

        //     // const orderData = await response.json();
        //     const orderData = await responsc.json();

        //     if (!orderData.id) {
        //         const errorDetail = orderData.details[0];
        //         const errorMessage = errorDetail
        //             ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
        //             : "Unexpected error occurred, please try again.";

        //         throw new Error(errorMessage);
        //     }
        //     console.log(orderData)
        //     return orderData.id;

        // } catch (error) {
        //     console.error(error);
        //     throw error;
        // }

    }

    const approvePayment = () => {
        dispatch(loadingBarProgress_Reducer(50)); 
        setLoading(true)
        dispatch(username_Reducer(username))
        dispatch(email_Reducer(email))
        dispatch(zip_Reducer(zip))
        dispatch(address_Reducer(address))
        dispatch(phone_Reducer(phone))
        router.push('/payment-confirmation')
    }

    return (
        <div className=''>
            <h2 className='p-3 bg-primary text-xl font-bold text-center text-white'>Checkout</h2>

            <div className='py-8 px-2 sm:px-16 md:px-12 lg:px-32 xl:px-48 grid grid-rows-2 md:grid-cols-3 gap-4 lg:gap-16 xl:gap-8'>

                <div className='md:col-span-2 mx-4 md:mx-0'> 
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <div className='grid gap-3 lg:grid-cols-2 lg:gap-10 mt-3'>
                        <Input placeholder='Name' onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='grid gap-3 lg:grid-cols-2 lg:gap-10 mt-3'>
                        <Input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                        <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <Input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>

                <div className='mx-4 md:mx-0 border'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({totalCartItem})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'>Subtotal: <span>${subTotal}</span></h2>
                        <hr />
                        <h2 className='flex justify-between'>Delivery: <span>$15.00</span></h2>
                        <h2 className='flex justify-between'>Tax (9%): <span>${(totalPrice * 0.09).toFixed(2)}</span></h2>
                        <hr />
                        <h2 className='font-bold flex justify-between'>Total : <span>${totalAmount}</span></h2>
                        <Button onClick={() => { approvePayment(); }}>{loading ? <Loader2Icon className='animate-spin' /> : `Approve Payment`}</Button>
                        {console.log('client side component redered')}
                        {/* <PayPalButtons style={{ layout: "horizontal" }}
                            disabled={!(username && email && address && zip)}

                            forceReRender={[username]}
                            createOrder={(data, actions) => createOrder_(data, actions)}

                            createOrder = { async (data, actions) => {
                                console.log('data', data)
                                console.log('actions', actions)
                                console.log('createOrder kansuu ....')
                                console.log('totalAmount' + totalAmount)
                                console.log('username' + username)
                                console.log('cartItemList' + cartItemList)

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

                            // moshi kono createOrder wo shuusei shitai toki kono rinku o yonde mite ne
                            // https://stackoverflow.com/questions/69259922/how-to-pass-dynamic-amount-to-paypal-react-sdk-button-without-re-render
                            
                            onApprove={onApprove}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
