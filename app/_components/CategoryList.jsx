'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { loadingBarProgress_Reducer } from '../redux/sharingData/sharingDataSlice'

const CategoryList = ({ categoryList }) => {

    const dispatch = useDispatch()

    return (
        <div className='mt-5'>
            <h2 className='text-green-600 font-fold text-2xl'>Shop by Category</h2>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5 mt-2'>
                {categoryList.map((category, index) => (
                    <Link href={'/products-category/' + category.attributes.name} key={index} onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }} className='flex flex-col items-center justify-center bg-green-50 gap-2 rounded-lg p-4 group cursor-pointer hover:bg-green-200'>
                        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.url} unoptimized={true} width={50} height={50} alt='icon' className='group-hover:scale-125 transition-all ease-in-out' />
                        <h2 className='text-green-800'>{category.attributes.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
