import React, { useState } from 'react'
 
import Pagination from './Pagination'
import Search from './Search'
import Product from '../../../../Util/Product'
import PaginationExample from './Pagination'
 

const ProductContainer = ({product,categories,setSearch,range}) => {
  const [Searchs,setSearchs]=useState(false)
  const toggleSearch = () => setSearchs(!Searchs)
 
  return (
    <div className='  px-5 '>
      <div   className={`${Searchs?'w-full':'w-0'} transition-all`}>
        <div className='flex'>
<p>

resul
</p>
<p>

  {product?.length}
</p>
        </div>
        <Search setSearch={setSearch} range={range} categories={categories} handleShow={toggleSearch}/>
      </div>
      <div className='flex justify-between py-5 px-5'>
        <h1 className='font-bold'>Featured Products</h1>
 
      </div>
    <div className={" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 h-96"  }>
        {
          // Product List goes here. For now, we're just rendering a placeholder.
          product?.map((e, index) => (
            <Product product={e} />
          ))
        }
   
    </div>
    <div>

 
  </div>
        </div>
  )
}

export default ProductContainer
