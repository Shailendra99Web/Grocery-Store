'use client'
import { loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const TopCategoryList = ({ categoryList, selectedCategory }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100))
    }, [])

    return (
        <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20'>
            {categoryList.map((category, index) => (
                <Link href={'/products-category/' + category.attributes.name} key={index} onClick={() => { dispatch(loadingBarProgress_Reducer(50)) }} className={`flex flex-col items-center justify-center gap-2 hover:bg-green-600 hover:text-white rounded-lg p-4 group cursor-pointer w-[150px] min-w-[135px] ${(decodeURIComponent(selectedCategory)===category.attributes.name)?'bg-green-600 text-white':'bg-green-50 text-green-800'}`}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.url} unoptimized={true} width={50} height={50} alt='icon' className='group-hover:scale-125 transition-all ease-in-out' />
                    <h2 className=''>{category.attributes.name}</h2>
                </Link>
            ))}
        </div>
    )
}

export default TopCategoryList
