'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CircleUserRound, LayoutGrid, ShoppingBasket } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose, } from "@/components/ui/sheet"
import CartItemList from './CartItemList'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { cartItemList_Reducer, subTotal_Reducer, jwt_Reducer, userId_Reducer, loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.sharingData.userId)
    const jwt = useSelector((state) => state.sharingData.jwt)
    const updateCart = useSelector((state) => state.sharingData.updateCart)
    const cartItemList = useSelector((state) => state.sharingData.cartItemList)
    const subTotal = useSelector((state) => state.sharingData.subTotal)
    const [totalCartItem, setTotalCartItem] = useState(0)
    const [categoryList, setCategoryList] = useState([])
    const [isLogin, setIsLogin] = useState(false)
    const router = useRouter()
    const [signLoading, setSignLoading] = useState(false)

    useEffect(() => {
        console.log('jwt = ' + jwt)
        console.log('userId = ', user)
        setIsLogin(jwt ? true : false)
    }, [jwt, user])

    useEffect(() => {
        getCategoryList();
    }, [])

    useEffect(() => {
        console.log('are refreshing correctly')
        if (user && jwt) {
            console.log('user' + user.id)
            getCartItems()
        }
    }, [jwt, user, updateCart])

    // Get Category List
    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp => {
            setCategoryList(resp.data.data)
        })
    }

    // Used to get Total Cart Item
    const getCartItems = async () => {
        let cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
        console.log(cartItemList_)
        setTotalCartItem(cartItemList_?.length)
        console.log(cartItemList_)
        dispatch(cartItemList_Reducer(cartItemList_))
    }

    const onSignOut = () => {
        sessionStorage.clear();
        dispatch(jwt_Reducer(''))
        dispatch(userId_Reducer(''))
        router.push('/sign-in')
    }

    const onDeleteItem = async (id) => {
        let deletingItem = await GlobalApi.deleteCartItem(id, jwt).then(resp => {
            toast('Item removed !')
            getCartItems()
        })
    }

    useEffect(() => {
        console.log(cartItemList)
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount;
        })
        dispatch(subTotal_Reducer(total.toFixed(2)))
    }, [cartItemList])
    return (
        <div className='p-5 flex justify-between shadow-md'>

            <div className='flex items-center gap-8'>
                <Link href='/' onClick={() => dispatch(loadingBarProgress_Reducer(50))}>
                    <Image src='/images/logo.png' alt='logo' width={63} height={63} className='h-auto w-auto cursor-pointer' />
                </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='hidden md:flex gap-2 items-center border rounded-full py-2 px-10 bg-slate-200 outline-none cursor-pointer'><LayoutGrid className='h-5 w-5' /><h2>Category</h2></div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categoryList && categoryList.map((category, index) => (
                            <Link key={index} href={'/products-category/' + category.attributes.name}>
                                <DropdownMenuItem className='flex gap-4 items-center cursor-pointer'>
                                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.url} unoptimized={true} width={30} height={30} alt='icon' />
                                    <h2>{category.attributes.name}</h2>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* <div className='hidden md:flex items-center gap-3 border rounded-full px-10 py-2'><Search /><input className='outline-none' type='text' placeholder='Search' /></div> */}
                <SearchBox />
            </div>

            <div className='flex gap-2 items-center'>

                <Sheet>
                    <SheetTrigger>
                        <h2 className='flex gap-2 items-center text-lg'><ShoppingBasket className="h-7 w-7" /><span className='bg-primary text-white px-2 rounded-full'>{totalCartItem}</span></h2>
                    </SheetTrigger>
                    <SheetContent className="fixed inset-0 !left-auto w-screen h-100% p-4">
                        <SheetHeader className='h-full flex flex-col'>
                            <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>My Cart</SheetTitle>
                            <SheetDescription className='overflow-auto'>
                                {console.log(cartItemList.length)}
                                {cartItemList?.length <= 0 ? <p className='font-bold text-gray-400'>No items to show</p> :
                                    <div className=''>
                                        {cartItemList.map((cart, index) => (
                                            <CartItemList cart={cart} key={index} index={index} onDeleteItem={onDeleteItem} />
                                        ))}
                                    </div>
                                }
                            </SheetDescription>
                            <SheetClose asChild className='!mt-auto'>
                                <div className='flex flex-col'>
                                    <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>${subTotal}</span></h2>
                                    <Button onClick={() => { dispatch(loadingBarProgress_Reducer(50)); router.push(jwt ? '/checkout' : '/sign-in'); }}>View Cart</Button>
                                </div>
                            </SheetClose>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>


                {!isLogin ? <Link href={'/sign-in'} onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }}>
                    <Button>Login</Button>
                </Link>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CircleUserRound className='h-12 w-12 p-2 rounded-full bg-green-100 text-primary cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='cursor-pointer'><Link href='/my-profile' onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }}>Profile</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link href='/my-order' onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }}>My Order</Link></DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={onSignOut}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
        </div>
    )
}

export default Header
