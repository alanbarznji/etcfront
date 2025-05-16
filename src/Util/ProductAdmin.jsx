import { Delete, Heart, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'

const ProductAdmin = ({DelteHaandle}) => {
 const [isLiked, setIsLiked] = useState(false);
  
  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={() => {
        // window.location = "/product/1"
      }} 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden h-56">
        <img  
          className="object-cover w-full h-full transform transition-all duration-500 group-hover:scale-110" 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" 
          alt="NIKE AIR"
        />
        
        {/* Like Button */}
        <button 
          onClick={DelteHaandle}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
        >
          <Delete 
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
            Footwear
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus
        </p>
      </div>
      
      {/* Price and Action */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
        <div>
          <h1 className="text-lg font-bold text-gray-800">$129</h1>
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

export default ProductAdmin