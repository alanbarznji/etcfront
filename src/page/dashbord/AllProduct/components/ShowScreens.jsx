import React, { useEffect } from 'react'
import ProductAdmin from '../../../../Util/ProductAdmin'
import { Delete, Edit, ShoppingBag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAction } from '../../../../redux/action/ProductAction';

const ShowScreens = ({DeleteHandle,UpdateHandle,product}) => {
  const productArray = Array.isArray(product) ? product : [];
  return (
    <div className="10vh px-5"  >
    <div className="flex justify-between py-5 px-5">
      <h1 className="font-bold">Featured Products</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {
        // Placeholder product list for now
        productArray? productArray?.map((e, index) => (
    <div key={index}>
          <div 
          onClick={() => {
            // window.location = "/product/1"
          }} 
          key={e._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
        >
          {/* Product Image Container */}
          <div className="relative overflow-hidden h-56">
            <img  
              className="object-cover w-full h-full transform transition-all duration-500 group-hover:scale-110" 
              src={e.image}
              alt="NIKE AIR"
            />
            
            {/* Like Button */}
            <button 
              onClick={()=>{DeleteHandle(e._id)}}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Delete 
                size={18} 
                className={  "text-gray-400 hover:text-red-400"}
              />
            </button>
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">NIKE AIR</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                {e.Name}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {e.Details}
            </p>
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
            <div>
              <div className='flex flex-col justify-center items-center'>
                <div className='flex  justify-center items-satrt relative'>
 
{e.hasDiscount?<h1 className="text-lg font-bold text-gray-800 absolute top-[-70%] right-0"> {e.Discount} </h1>:null}

            <h1 className={`text-lg font-bold ${e.hasDiscount?"text-gray-400":"text-gray-800"} relative `}>
            {e.hasDiscount?<span className='h-0.5 w-full absolute top-[48%] left-0 bg-black  '></span>:null}
               {e.PriceSell} IQD</h1>
              </div>
              <div className='flex  justify-center items-center'>

            <h1 className="text-lg font-bold text-gray-800"> {e.PriceSell} IQD</h1>
              </div>
 
                </div>
            </div>
            
            <button 
              onClick={() => {
                UpdateHandle(e._id)
              }}
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
        </div>
    </div>
        )) :<div>not</div>
      }
    </div>
    <div className="flex justify-end py-5">
      {/* Replace Link with button */}
      <button
        onClick={() => window.location=('/printing')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Load More
      </button>
    </div>
  </div>
  )
}

export default ShowScreens
