import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
 

import { ArrowLeft, ArrowRight, Package, Star } from "lucide-react";
import PackageProduct from "./PackageProduct";
 
const ProductFeature = ({packages}) => {

  console.log('====================================');
  console.log(packages,"printer");
  console.log('====================================');
  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center">
    {/* Left Content Section */}
    <div
      style={{
        fontFamily:   "",
      }}
      className="w-full lg:w-2/5 space-y-6"
    >
      {/* Brand and Title */}
      <div>
        <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
          {packages?.Name}
        </span>
        
        <h1 className="text-3xl md:text-2xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Premium 
          <span className="text-blue-600 ml-2">
            Prodduct  
          </span>
        </h1>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-lg leading-relaxed">
      {packages?.Details}
      </p>
      
      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        {['Premium Support', 'Quality Materials', '24/7 Assistance', 'Satisfaction Guarantee'].map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      {/* Customer Review */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600 text-sm italic">
          "These packages have transformed my business workflow. The quality and service are exceptional!"
        </p>
        <div className="mt-2 text-sm font-medium text-gray-800">— Sarah Johnson, CEO</div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4 pt-4">
        <button
          id="slider-button-left"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          id="slider-button-right"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-sm"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
    
    {/* Mobile Title - Only visible on mobile */}
    <div className="lg:hidden text-center mb-8">
      <h2 className="text-2xl font-bold text-blue-600">
        Featured Packages
      </h2>
    </div>
    
    {/* Right Swiper Section */}
    <div className="w-full lg:w-3/6">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: "#slider-button-right",
          prevEl: "#slider-button-left",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="package-swiper"
      >
        {packages?.ProductOfOffer?.map((e, index) => (
          <SwiperSlide key={`package-${index}`}>
            <div className="h-full">
              <PackageProduct product={e.Products}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  )
}

export default ProductFeature
