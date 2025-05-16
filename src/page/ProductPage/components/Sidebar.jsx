import { useEffect, useRef, useState } from "react";
import CategoryTypes from "../components/sidebar/CategoryTypes";
 
import PriceSlider from "../components/sidebar/PirceSlider"; // Fixed typo
import { red } from "@mui/material/colors";
import Pagination from "./Product/Pagination";
import PaginationExample from "./Product/Pagination";

const Sidebar = ({category,handleCheckboxChange,categories,product,Search,range,setRange}) => {
  const [show, setShow] = useState(false);
  
  const ref =useRef(null)
  useEffect(() => {
    // Define the handler inside useEffect
    const handleClickOutside = (event) => {
      console.log(ref , event.target);
      
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
  
    // Add the event listener when the component mounts
    window.addEventListener("mousedown", handleClickOutside);
  
    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
 
 
  return (
    <div className="grid grid-cols-2 md:grid-cols-1 justify-center items-start py-6 " ref={ref} >
      <div className="flex flex-col justify-center">
        <h5 className="text-18 fw-500 mb-4">Category Types</h5>

        {/* Button only visible on small screens */}
        <button
          onClick={() => setShow(!show)}
          className="w-26 flex md:hidden justify-center items-center"
        >
          <h1 className="bg-blue-600 w-full font-bold rounded-md hover:bg-blue-500 transition-all">
            {show ? "Hide" : "Show"}
          </h1>
        </button>

        {/* Sidebar Content: Always visible on md+ screens, controlled by `show` on smaller screens */}
        <div className={`md:flex ${show ? "flex" : "hidden"}`}>
          <CategoryTypes Search={Search} range={range} handleCheckboxChange={handleCheckboxChange} categories={categories} category={category}/>
        </div>
      </div>

      {/* Price Filter */}
      <div className="  ">
     
        <div className="      ">
          <div className=" ">
            <PriceSlider setRange={setRange} range={range} product={product} categories={categories} category={category} Search={Search} />
          </div>
        </div>
 
      </div>
    </div>
  );
};

export default Sidebar;
