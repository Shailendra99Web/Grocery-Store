'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import ProductList from '@/app/_components/ProductList';
import TopCategoryList from '../../products-category/_components/TopCategoryList';
import { loadingBarProgress_Reducer } from '@/app/redux/sharingData/sharingDataSlice';
import { useDispatch } from 'react-redux';
import { Loader2Icon } from 'lucide-react';

function Search({ params }) {
    const [productList, setProductList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const dispatch = useDispatch()
    
    const getting_data = async () => {
        const fetchCategoryList = await GlobalApi.getCategoryList();
        setCategoryList(fetchCategoryList)
        const fetchProductList = await GlobalApi.getProductsByName(params.slug)
        setProductList(fetchProductList)
        setLoadingProducts(false)
    }

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100));
        getting_data()
    }, [])

    return (
        <div>
            <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>Searched by : {params.slug}</h2>
            <TopCategoryList categoryList={categoryList} />

            <div className="p-5 md:p-10">
                {loadingProducts?<Loader2Icon className='animate-spin m-auto mt-2'/>:<ProductList productList={productList} />}
            </div>

        </div>
    )
}

export default Search
