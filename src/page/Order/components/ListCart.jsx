import { Delete } from 'lucide-react'
import React from 'react'

const ListCart = () => {
  return (
    <div className=" overflow-x-scroll">
 
    <div className="flex flex-col mt-2 h-[70vh]  w-full overflow-y-scroll">
        <div className=" ">
            <div className="inline-block min-w-full py-2 align-middle ">
                <div className="    md:rounded-lg  " >
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-2 lg:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button className="flex items-center gap-x-3 focus:outline-none">
                                        <span>items</span>

                                      
                                    </button>
                                </th>

                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    name
                                </th>

                            

                                <th scope="col" className="px-2 md:px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y border-b h-[40vh]">
    
 {
Array.from({ length: 5 }).map((_, index) => (

                       <tr key={index} >
                                <td className="  text-sm font-medium whitespace-nowrap relative">
                                    <div >
                                    <img  className="object-cover  transition-all w-[80%]  " src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" alt="NIKE AIR"/>
<span className='bg-white rounded-full w-5 top-5 left-1 absolute flex items-center justify-center'>1</span>
                                    </div>
                                </td>
                                <td className="  px-4 py-4 text-sm font-medium">
                                    <div className=" inline   py-1 text-sm font-normal text-gray-500   dark:text-gray-400 gap-x-2 " >
                                        Productivity app
                                     

                                    </div>
                                </td>
                
                                <td className="  px-2 lg:px-4 py-4 text-sm whitespace-nowrap font-bold">
                                91000Iqd
                                </td>
                       
                            </tr>
    ))
 }
                        </tbody>
                    </table>
                    
 
    
                </div>
            </div>
        </div>
    </div>
                    <div>
   <div className='flex justify-between px-5'>
        <p>Total Items</p>
        <p>1</p>
   </div>
 
   <div className='flex justify-between px-5'>
        <h1 className='font-bold text-xl'>Total</h1>
        <h1 className='font-bold text-xl'>
        IQD 106,250.000</h1>
   </div>
    

                    </div>

 
</div>
  )
}

export default ListCart
