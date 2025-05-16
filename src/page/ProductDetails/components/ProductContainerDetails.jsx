import React, { useEffect } from 'react'
import Product from '../../../Util/Product'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductAction, GetProductCategoryAction } from '../../../redux/action/ProductAction'

const ProductContainer = ({products}) => {
  const dispatch=useDispatch()
  console.log(products?.Category);
  
  useEffect(()=>{
dispatch(GetProductCategoryAction(4,products?.Category?._id))
  },[products])
  const product=useSelector(state=>state.product.products?.data)
  console.log('====================================');
  console.log(product);
  console.log('====================================');
  return (
    <div className='10vh container py-10 px-5'>
      <div className='flex justify-between py-5 px-5'>
        <h1 className='font-bold'>Featured Products</h1>
 
      </div>
    <div className={" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10"  }>
        {
          // Product List goes here. For now, we're just rendering a placeholder.
          product?.map((e, index) => (
            <Product product={e}/>
          ))
        }
      
    </div>
 
        </div>
  )
}

export default ProductContainer
