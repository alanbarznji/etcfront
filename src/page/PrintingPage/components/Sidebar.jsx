import { useEffect, useRef, useState } from "react";
import CategoryTypes from "./sidebar/CategoryTypes";
 
import PriceSlider from "./sidebar/PirceSlider"; // Fixed typo
import { red } from "@mui/material/colors";

const Sidebar = () => {
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
    <div className="grid grid-cols-1 items-center justify-center">
    

    <div className="grid grid-cols-2 md:grid-cols-1 justify-center items-start " ref={ref} >
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
          <CategoryTypes />
        </div>
      </div>

      {/* Price Filter */}
      <div className="  ">
        <h5 className="text-18 fw-500  ">Price</h5>
        <div className="      ">
          <div className=" ">
            <PriceSlider />
          </div>
        </div>
      </div>

    </div>
    <div className="w-full md:w-50  py-10  ">
      <button onClick={
        () => {
          window.location = "/customprinting";
        }
      } className=" w-full  bg-primary text-thirdly p-3 hover:bg-secondary transition-all" >
 
      Cusstom 3d
     
      </button>
    </div>
          </div>
  );
};

export default Sidebar;
