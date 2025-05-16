import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, MapPin, Package, DollarSign, Clock, Phone, ChevronRight } from 'lucide-react';

const HomeDashboard = () => {
  // Sample status options for demonstration
  const statusOptions = ['Pending', 'Processing', 'Delivered', 'Completed', 'Cancelled'];
  
  // Get a random status for demo purposes
  const getRandomStatus = () => {
    const randomIndex = Math.floor(Math.random() * statusOptions.length);
    return statusOptions[randomIndex];
  };
  
  // Get status color based on status type
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Processing':
        return 'bg-blue-500';
      case 'Delivered':
        return 'bg-green-500';
      case 'Completed':
        return 'bg-purple-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='w-full min-h-[94vh] p-4 bg-gray-50'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Recent Orders</h1>
        <p className='text-gray-600'>Manage and track your customer orders</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {Array.from({length: 20}).map((_, index) => {
          const randomStatus = getRandomStatus();
          const statusColor = getStatusColor(randomStatus);
          
          return (
            <Link 
              to={`/admin/order/${index + 1}`} 
              key={index} 
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative'
            >
              <div className={` absolute right-0 top-0 w-24 text-white ${statusColor}  rounded-sm text-center `}> 
              
                Pending

            
              </div>
        <div className="relative py-5">

          <div className='p-5'>
          
          <div className='flex w-full justify-between '>
            <div>

            <span className=' font-bold text-md'>Order</span>
            <span className=' font-bold text-md'>#1000</span>
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
                       Alan Najm
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
                       20000 IQD
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
                      2023/22/1
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
                     kirkuk
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
                       5
                    </span>

</div>
            </div>

          </div>
        </div>
        <div className='flex justify-between px-4 py-2 bg-gray-100 '>
          <div className='flex items-center'>
          <Phone size={16} className='text-gray-400 mr-2' />
      <div>07706969698</div>
          </div >
<div className='text-blue-400 relative group flex items-center'>
  <span>View Details </span>
  <ChevronRight size={16} className='ml-1 transform transition-transform duration-300 group-hover:translate-x-1' />
</div>
        </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeDashboard;