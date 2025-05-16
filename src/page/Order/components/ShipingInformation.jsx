import React, { useEffect, useState } from 'react'
import ShippingMethod from './ShippingMethod'
import { Delete } from 'lucide-react'

const ShipingInhtmlFormation = () => {
  const [phoneNumber,setPhoneNumber]=useState([
    {phone :"",id:1}
  ])
  const addPhoneNumber = (e,i) => {
    console.log('====================================');
    console.log(i);
    console.log('====================================');
 setPhoneNumber(prev=>prev.map((item,index)=>(
  i === item.id? {...item, phone:e } : item
 )))
    console.log('====================================');
    console.log(phoneNumber);
    console.log('====================================');
  }
  const removePhoneNumber = (index) => {
    console.log('====================================');
    console.log(index);
    console.log('====================================');
    if(phoneNumber.length > 1){
      setPhoneNumber(phone=>phone.filter((e, i) => index!==e.id))
    }
  }
 
  const addmorePhoneNumber = () => {
    if(
      phoneNumber.length < 3
    ){
 setPhoneNumber((item)=>{
  return [...item, {phone:"",id:Math.floor((Math.random()*1000000)+1)}];

 })
    }
  };
  

  return (
<section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md   flex flex-col gap-5 my-10 h-full">
    <h2 className="text-lg font-semibold text-black capitalize dark:text-white">Account settings</h2>

    
            <div>
                <label className="text-gray-900 " htmlFor="email">email</label>
                <input id="email" type="email" className="block w-full px-4 py-2 mt-2 text-black  border border-gray-200 rounded-md bg-white dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
        <div className="grid grid-cols-1   gap-5 ">
          <div className='grid grid-cols-2 gap-5' >

   
            <div>
                <label className="text-black " htmlFor="FirstName">FirstName</label>
                <input id="FirstName" type="text" className="block w-full px-4 py-2 mt-2 text-black  border border-gray-200 rounded-md bg-white dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label className="text-black " htmlFor="LAstName">LastName</label>
                <input id="LAstName" type="text" className="block w-full px-4 py-2 mt-2 text-black  border border-gray-200 rounded-md bg-white dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
       </div>
            <div>
                <label className="text-black " htmlFor="Address">Address</label>
                <input id="Address" type="text" className="block w-full px-4 py-2 mt-2 text-black  border border-gray-200 rounded-md bg-white dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>

          <div className='grid grid-cols-2 gap-5' >


       </div>
          
 {
     phoneNumber.map((es,i)=>{
        return <div className='w-full' key={i}>
          <div className='flex flex-between w-full'>
            <label className="text-black " htmlFor="Phone">Phone</label>
            <button className="" onClick={()=>removePhoneNumber(es.id)}>
              <Delete/>
            </button>
          </div>
                <input onChange={
                  (e)=>addPhoneNumber(e.target.value,es.id)
                } value={es.phone} id="Phone" type="text" className="block w-full px-4 py-2 mt-2 text-black  border border-gray-200 rounded-md bg-white dark:text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"/>
            </div>
            } 
)
     }    
     <button className="" onClick={addmorePhoneNumber }>Add</button>

 </div>
 
        <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
  <ShippingMethod
  addPhoneNumber={addPhoneNumber}
  removePhoneNumber={removePhoneNumber}
 
 phoneNumber={phoneNumber}
  />
  <div>
    <div className="flex justify-end mt-6">
      <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Complete</button>
  
  </div>
  </div>
</section>
  )
}

export default ShipingInhtmlFormation
