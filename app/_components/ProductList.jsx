import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({ productList }) => {
    return (
        <div className='mt-10'>
            <h2 className='text-green-600 font-fold text-2xl'>Our Products</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4'>
                {productList.map((product, index) => (
                    <ProductItem product={product} key={index} />
                ))}
            </div>
        </div>
    )
}

export default ProductList
