import React from 'react'
import Product from '../../../Util/Product'

const ProductContainer = () => {
  return (
    <div className='10vh container py-10 px-5'>
      <div className='flex justify-between py-5 px-5'>
        <h1 className='font-bold'>Featured Products</h1>
 
      </div>
    <div className={" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"  }>
        {
          // Product List goes here. For now, we're just rendering a placeholder.
          Array.from({ length: 4 }).map((_, index) => (
            <Product />
          ))
        }
      
    </div>
 
        </div>
  )
}

export default ProductContainer
