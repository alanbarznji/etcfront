 
import React from 'react'
import { motion } from "framer-motion";
import { Lightbulb, Plug, Zap } from "lucide-react";
import { useEffect, useState } from "react";
const Loading = () => {
  const [isPowered, setIsPowered] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  
  
  // Control the power and animation cycles
  useEffect(() => {
    const powerInterval = setInterval(() => {
      setIsPowered(prev => !prev);
    }, 1600); // Toggle power every 6 seconds
    
    return () => clearInterval(powerInterval);
  }, []);
  useEffect(() => {
    const powerInterval = setInterval(() => {
      setShowDrop(prev => !prev);
    }, 3200); // Toggle power every 6 seconds
    
    return () => clearInterval(powerInterval);
  }, []);
  
  // Control the drop animation when powered
  useEffect(() => {
    if (isPowered) {
      // Show a drop animation every 3 seconds while powered
      const dropInterval = setInterval(() => {
        setShowDrop(true);
        
        // Hide the drop after animation completes
        setTimeout(() => {
          setShowDrop(false);
        }, 1600); // Animation duration
      }, 3000);
      
      return () => clearInterval(dropInterval);
    }
  }, [isPowered]);

  return (
    <div className="flex flex-col   items-center justify-center  bg-black/50 fixed w-full h-[100vh] z-[9999] top-0">
      {/* Light Bulb */}
      <div className={`flex flex-col items-center relative  ${isPowered?"tetos":"testos"}`}>
        {/* Spinning component */}
        <div className="absolute -top-10 w-20 h-20">

        </div>
        
        {/* Drop animation */}
      {
!isPowered && !showDrop?
<motion.div
className="absolute bg-yellow-500 w-4 h-4 rounded-full left-1/2 -ml-2"
initial={{ bottom: "70px" }}
animate={{ bottom: "0px"}}

transition={{ 
  duration: 1.6,
  ease: "easeIn",
  repeat:Infinity
}}
/>
:null
      

      }
      {
showDrop && !isPowered?
<motion.div
className="absolute bg-yellow-500 w-4 h-4 rounded-full left-1/2 -ml-2"
initial={{ bottom: "0px" }}
animate={{ bottom: "70px"}}

transition={{ 
  duration: 1.6,
  ease: "easeIn",
  repeat:Infinity
}}
/>
:null
      

      }
        
        {/* Lightbulb */}
        <Lightbulb
          className={`w-20 h-20 ${isPowered && showDrop?"text-yellow-400 drop-shadow-lg":"text-gray-400 drop-shadow-lg"  }`}
        />
        
        {/* Cable */}
        <div className={`w-1 h-20 ${isPowered && showDrop?"bg-yellow-500 animate-pulse" :"bg-gray-500" }`} />
        
        {/* Power indicator */}
        { !isPowered && showDrop ?
          <div className="absolute -top-10">
            <Zap className="w-10 h-10 text-yellow-500 animate-ping" />
          </div>:null
        }
      </div>
      
      {/* Power toggle button */}
 
    </div>)
}

export default Loading
