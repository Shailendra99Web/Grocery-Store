import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';
import Image from 'next/image';
import Footer from '@/app/_components/Footer';

async function ProductCategory({ params }) {
    const productList = await GlobalApi.getProductsByCategory(params.categoryName)
    const categoryList = await GlobalApi.getCategoryList();

    return (
        <div>
            <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>{decodeURIComponent(params.categoryName)}</h2>
            <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName} />

            <div className="p-5 md:p-10">
                <ProductList productList={productList} />
            </div>
            <div className="relative w-full flex justify-evenly items-center py-4 my-4 rounded-md bg-green-700">
                <Image src='/images/delivery.png' width={350} height={150} alt='banner' className="w-auto h-auto px-2 md:pl-4" />
                <p className=' absolute md:relative bottom-0 md:bottom-auto p-2 text-2xl sm:text-5xl text-center font-bold text-slate-200'>Delivery in 24 Hours</p>
            </div>
            <Footer />
        </div>

    )
}

export default ProductCategory
