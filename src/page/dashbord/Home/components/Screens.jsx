import { BarChart, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import HomeDashboard from './HomeDashboard'
import { Link } from 'react-router-dom';
import { User, Calendar, MapPin, Package, DollarSign, Clock, Phone, ChevronRight } from 'lucide-react';

const Screens = ({order,query,SearchHanlder,handleClear,isFocused,setIsFocused}) => {
 
 
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-red-500';
      case 'waiting':
        return 'bg-yellow-500';
      case 'successfuly':
        return 'bg-green-500';
 
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='w-full min-h-[94vh] p-4 bg-gray-50'>
           <div 
        className={`flex items-center w-full rounded-full border ${
          isFocused 
            ? 'border-blue-500 shadow-lg bg-white' 
            : 'border-gray-300 bg-gray-50'
        } px-4 py-2 transition-all duration-200 `}
      >
        <Search className="text-gray-400 mr-2" size={20} />
        
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={SearchHanlder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        
        {query && (
          <button 
            onClick={handleClear}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Recent Orders</h1>
        <p className='text-gray-600'>Manage and track your customer orders</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {order?order.map((e, index) => {
          const year=new Date(e.createdAt).getFullYear()
          const month=new Date(e.createdAt).getMonth()+1
          const day=new Date(e.createdAt).getDay()
 
 
 
          
          return (
            <Link 
              to={`/admin/order/${e._id}`} 
              key={index} 
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative'
            >
              <div className={` absolute right-0 top-0 w-24 text-white ${getStatusColor(e.state)}  rounded-sm text-center `}> 
              
                {e.state}

            
              </div>
        <div className="relative py-5">

          <div className='p-5'>
          
          <div className='flex w-full justify-between '>
            <div>

            <span className=' font-bold text-md'>Order</span>
            <span className=' font-bold text-md'>#{e.SessionId}</span>
            </div>
            <span className='text-xs text-gray-500 flex items-center'>
                      <Clock size={14} className='mr-1' /> Just now
                    </span>
          </div>
          </div>
          <div className='py-2 px-4'>
            <div className=' flex items-center'>
            <User size={16} className='text-gray-400 mr-3 min-w-[16px]' />
<div className='flex justify-between w-full'>
            <span className='text-sm text-gray-500 flex items-center'>
                      Customer:
                    </span>
            <span className='text-xs text-gray-900 text-[16px]  flex items-center'>
                       {e.name}
                    </span>

</div>
            </div>

          </div>
          <div className='py-2 px-4'>
            <div className=' flex items-center'>
            <DollarSign size={16} className='text-gray-400 mr-3 min-w-[16px]' />
<div className='flex justify-between w-full'>
            <span className='text-sm text-gray-500 flex items-center'>
                      Total:
                    </span>
            <span className='text-xs text-gray-900 font-bold text-[16px]  flex items-center'>
                       {e.totalCartPrice} IQD
                    </span>

</div>
            </div>

          </div>
          <div className='py-2 px-4'>
            <div className=' flex items-center'>
            <Calendar size={16} className='text-gray-400 mr-3 min-w-[16px]' />
<div className='flex justify-between w-full'>
            <span className='text-sm text-gray-500 flex items-center'>
                      date:
                    </span>
            <span className='text-xs text-gray-900 text-[16px]  flex items-center'>
                      {`${year}/${month}/${day}`}
                    </span>

</div>
            </div>

          </div>
          <div className='py-2 px-4'>
            <div className=' flex items-center'>
            <MapPin  size={16} className='text-gray-400 mr-3 min-w-[16px]' />
<div className='flex justify-between w-full'>
            <span className='text-sm text-gray-500 flex items-center'>
                      address:
                    </span>
            <span className='text-xs text-gray-900 text-[16px]  flex items-center'>
                     {e.city}
                    </span>

</div>
            </div>

          </div>
          <div className='py-2 px-4'>
            <div className=' flex items-center'>
            <Package  size={16} className='text-gray-400 mr-3 min-w-[16px]' />
<div className='flex justify-between w-full'>
            <span className='text-sm text-gray-500 flex items-center'>
                      items:
                    </span>
            <span className='text-xs text-gray-900 text-[16px]  flex items-center'>
                       {e.totalCartQuantity}
                    </span>

</div>
            </div>

          </div>
        </div>
        <div className='flex justify-between px-4 py-2 bg-gray-100 '>
          <div className='flex items-start   flex-col'>
            {
e.Number.map(e=>(
<div key={e._id} className='flex'>
 <Phone size={16} className='text-gray-400 mr-2' />
<div className='flex flex-col'>{e.phone}</div>
</div>
))
    }
          </div >
<div className='text-blue-400 relative group flex items-center'>
  <span>View Details </span>
  <ChevronRight size={16} className='ml-1 transform transition-transform duration-300 group-hover:translate-x-1' />
</div>
        </div>
            </Link>
          );
        }):<div>null</div>}
      </div>
    </div>
  );
};

export default Screens;