import { Heart, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'

const PackageProduct = ({product}) => {
    const [isLiked, setIsLiked] = useState(false);
    console.log(product);
    
    const handleLikeClick = (e) => {
      e.stopPropagation();
      setIsLiked(!isLiked);
    };
  
    return (
      <div 
        onClick={() => {
          window.location = "/product/"+product._id
        }} 
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      >
        {/* Product Image Container */}
        <div className="relative overflow-hidden h-56">
          <img  
            className="object-cover w-full h-full transform transition-all duration-500 group-hover:scale-110" 
            src={product?.image||"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" }
            alt={product?.Name||"NIKE AIR"}
          />
          
          {/* Like Button */}
          <button 
            onClick={handleLikeClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <Heart 
              size={18} 
              className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"}
            />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">NIKE AIR</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
              {product?.Name||"Footwear"}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 break-words">
            {product?.Details||"Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus"}
          </p>
        </div>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
        <div className='flex  justify-center items-satrt relative'>
 
 {product?.hasDiscount?<h1 className="text-lg font-bold text-gray-800 absolute top-[-70%] right-0"> {product?.Discount} </h1>:null}
 
             <h1 className={`text-lg font-bold ${product?.hasDiscount?"text-gray-400":"text-gray-800"} relative `}>
             {product?.hasDiscount?<span className='h-0.5 w-full absolute top-[48%] left-0 bg-black  '></span>:null}
                {product?.PriceSell} IQD</h1>
               </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    )
}

export default PackageProduct
