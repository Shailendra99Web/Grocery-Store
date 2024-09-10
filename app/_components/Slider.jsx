'use client'
import React, { useEffect } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { loadingBarProgress_Reducer } from '../redux/sharingData/sharingDataSlice'

const Slider = ({ sliderList }) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadingBarProgress_Reducer(100))
    })

    return (
        <Carousel>
            <CarouselContent>
                {sliderList.map((slider, index)=>(
                <CarouselItem key={index}>
                    <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider.attributes?.image?.data[0]?.attributes?.url}  unoptimized={true} width={1000} height={500} alt='slider' className='w-full h-[200px] md:h-[500px] object-cover rounded-2xl bg-green-600'/>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export default Slider
