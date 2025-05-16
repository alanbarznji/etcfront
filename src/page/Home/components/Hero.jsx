import React from "react";
import CableLight from "./CableLight";
import Printing from "./Printing";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className=" px-6 py-16 mx-auto">
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Best place to choose <br />
            <span className="text-blue-500">clothes</span>
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            beatae error laborum ab amet sunt recusandae? Reiciendis natus
            perspiciatis optio.
          </p>

          <button
            onClick={() => (window.location.href = "/product")}
            className="px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500 self-start"
          >
            Shop Now
          </button>
        </div>

        {/* Right Section - Flexible Grid Layout */}
        <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Printing Category */}
              <div className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                    New Arrival
                  </span>
                </div>
                
                <div className="p-6 flex flex-col  h-[650px] lg:h-full">
                  <div className="flex-1 flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                    <Printing />
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Premium Printed Apparel
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Unique designs with high-quality printing technology.
                    </p>
                    
                    <button
                      onClick={""}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      View Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* CableLight Category */}
              <div className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-amber-500 rounded-full">
                    Trending
                  </span>
                </div>
                
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                    <CableLight />
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Designer Collection
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Exclusive designs from our premium product line.
                    </p>
                    
                    <button
                      onClick={ ""}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      View Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Hero;
