import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, MapPin, Package, DollarSign, Clock, Phone, ChevronRight, Edit } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { DeletePackageAction } from '../../../../redux/action/PackagrAction';

const PackageAllow = ({packages,OpenDeleteHandle,OnUpdate}) => {
 
  const dispatch=useDispatch()
  // Handle delete button click
  const handleDelete = (e, packageId) => {
    // Stop the event from bubbling up to the parent Link component
    e.preventDefault();
    e.stopPropagation();
  dispatch(DeletePackageAction(packageId))
 
  };

  return (
    <div className='w-full min-h-[94vh] p-4 bg-gray-50'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Recent Orders</h1>
        <p className='text-gray-600'>Manage and track your customer orders</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {packages?.map((e, index) => {
 
          return (
            <Link 
              to={e._id}
              key={index} 
              className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative grid grid-rows-1'
            >
              <div className="relative py-5">
                <div className='p-5'>
                  <div className='flex w-full justify-between'>
                    <img src={e.image} alt="" className='w-full' />
                  </div>
                </div>
                <div className='flex flex-col overflow-y-scroll '>
               
                <div className='py-2 px-4 '>
                  <div className='flex items-center '>
                    <User size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        package name:
                      </span>
                      <span className='text-xs text-gray-900 text-[16px] flex items-center'>
                        {e.Name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='py-2 px-4'>
                  <div className='flex items-center'>
                    <DollarSign size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        Price:
                      </span>
                      <span className='text-xs text-gray-900 font-bold text-[16px] flex items-center'>
                        {e.Price} IQD
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <DollarSign size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        Type:
                      </span>
                      <span className='text-xs text-gray-900 font-bold text-[16px] flex items-center'>
                        {e.state}  
                      </span>
                    </div>
                  </div>
                </div>
                <div className='py-2 px-4'>
                  <div className='flex items-center'>
                    <Calendar size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        date:
                      </span>
                      <span className='text-xs text-gray-900 text-[16px] flex items-center'>
                        {e.FinishDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='py-2 px-4'>
                  <div className='flex items-center'>
                    <MapPin size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        OfferAvalible:
                      </span>
                      <span className='text-xs text-gray-900 text-[16px] flex items-center'>
                        {e.OfferAvalible ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='py-2 px-4'>
                  <div className='flex items-center'>
                    <Package size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        product:
                      </span>
                      <span className='text-xs text-gray-900 text-[16px] flex flex-col items-start'>
                        {e.ProductOfOffer?.map((product, idx) => (
                          <li key={idx}>{product.Products?.Name}</li>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='py-2 px-4'>
                  <div className='flex items-center'>
                    <Package size={16} className='text-gray-400 mr-3 min-w-[16px]' />
                    <div className='flex justify-between w-full'>
                      <span className='text-sm text-gray-500 flex items-center'>
                        printer:
                      </span>
                      <span className='text-xs text-gray-900 text-[16px] flex flex-col items-start'>
                        {e.PrinterOfOffer?.map((product, idx) => (
                          <li key={idx}>{product.Printer?.Name}</li>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>   
                </div>
              </div>
              <div className='flex justify-between px-4 py-2 bg-gray-100 relative bottom-0'>
                <button 
                  className='py-2  px-5 border-2 rounded-2xl border-red-400 hover:border-white hover:bg-red-400 hover:text-white text-red-400 font-bold duration-300'
                  onClick={(event) => OpenDeleteHandle(event, e._id || index)}
                >
                  Delete
                </button>
                <div className='text-blue-400 relative group flex items-center'>
                  <span>View Details</span>
                  <ChevronRight size={16} className='ml-1 transform transition-transform duration-300 group-hover:translate-x-1' />
                </div>
              </div>
                <button 
                  className=' absolute p-2 top-10 right-5 bg-white  border-2 rounded-full border-blue-400 hover:border-white hover:bg-blue-400 hover:text-white text-blue-400 font-bold duration-300'
                  onClick={(event) => OnUpdate(event, e._id || index)}
                >
                  <Edit />
                </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PackageAllow;