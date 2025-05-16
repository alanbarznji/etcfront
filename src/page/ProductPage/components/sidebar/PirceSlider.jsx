import { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch } from "react-redux";
import { GetProductsFilterAction } from "../../../../redux/action/ProductAction";

const PriceSlider = ({ product,categories,Search ,setRange,range}) => {
  // Initialize state with reasonable defaults
  const [price, setPrice] = useState({
    min: 0,
    max: 500
  });
  
  // Initialize the slider range separately
 
const dispatch=useDispatch()
  useEffect(() => {
    if (product && product.length > 0&&range.max==Infinity) {
      // Find the actual maximum price from the product data
      const maxPrice = Math.max(...product.map((e) => e.PriceBuy), 500);
      
      // Update the price limits
      setPrice({
        min: 0,
        max: maxPrice
      });
      
      // Also update the range to match
 
    }
  }, [product]);

  const handleOnChange = (value) => {
    setRange(value);
    if(categories.length>0){

      dispatch(GetProductsFilterAction(10,categories,Search,value))
    }else{
      dispatch(GetProductsFilterAction(10,"all",Search,value))

    }
  };

  return (
    <div className="flex md:flex-col">
      <div className="px-2 w-full grid grid-cols-2 gap-10 md:w-full">
      <div className="mb-5">
    <label htmlFor="from" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">from:</label>
    <input onChange={(e)=>{
         setRange({
          min: e.target.value,
          max: range.max
        });
 
    }} type="from" id="from" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
        <div className="mb-5">
    <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">to:</label>
    <input onChange={(e)=>{
             setRange({
              min:range.min,
              max:e.target.value,
            });
  
    }} type="to" id="to" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
 
      </div>
      <button onClick={()=>{
           
            if(categories.length>0){

              dispatch(GetProductsFilterAction(10,categories,Search,range))
            }else{
              console.log(":::::::::::::;;;");
              
              dispatch(GetProductsFilterAction(10,["all"],Search,range))
        
            }
      }}>filter</button>
    </div>
  );
};

export default PriceSlider;