import { Heart, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {InserCartListAction} from "../redux/action/CartListAction"

const Product = ({product}) => {
   const [isLiked, setIsLiked] = useState(false);
  const [sessionId,setSessionId]=useState(localStorage.getItem("session"))
  const [Product,setProduct]=useState(localStorage.getItem("session"))
     const dispatch=useDispatch()
     const handleLikeClick = (e) => {
       e.stopPropagation();
       e.preventDefault();
       setIsLiked(!isLiked);
     };
     useEffect(()=>{
setProduct(product?._id)
if(sessionId.length>0 ){
  setSessionId(localStorage.getItem("session"))
}
     },[product,sessionId])
     console.log(sessionId);
     
     return (
       <Link 
     to={"/product/"+product?._id}
         className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group grid grid-rows-2 h-[500px]"
       >
         {/* Product Image Container */}
         <div className="relative overflow-hidden h-fill">
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
             <h1 className="text-xl font-bold text-gray-800 dark:text-white">{product?.Name}</h1>
             <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
               {product?.Category.Name||"Footwear"}
             </span>
           </div>
           
           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4  w-200px  break-all">
             {product?.Details||"Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus "}
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
        
               e.preventDefault()
               // Add to cart logic here
               dispatch(InserCartListAction(sessionId,Product,1))
             }}
             className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
           >
             <ShoppingBag size={16} />
             <span>Add </span>
           </button>
         </div>
       </Link>
  )
}

export default Product