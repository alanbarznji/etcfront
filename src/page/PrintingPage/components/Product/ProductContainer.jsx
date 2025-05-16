import React, { useState } from 'react'
 
import Pagination from './Pagination'
import Search from './Search'
import Product from '../../../../Util/Product'
 

const ProductContainer = () => {
  const [Searchs,setSearchs]=useState(false)
  const toggleSearch = () => setSearchs(!Searchs)
  return (
    <div className='10vh px-5 '>
      <div   className={`${Searchs?'w-full':'w-0'} transition-all`}>

        <Search handleShow={toggleSearch}/>
      </div>
      <div className='flex justify-between py-5 px-5'>
        <h1 className='font-bold'>Featured Products</h1>
 
      </div>
    <div className={" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"  }>
        {
          // Product List goes here. For now, we're just rendering a placeholder.
          Array.from({ length: 10 }).map((_, index) => (
            <Product />
          ))
        }
      
    </div>
    <div className='flex justify-end py-5'>
  <Pagination />
          </div>
        </div>
  )
}

export default ProductContainer
