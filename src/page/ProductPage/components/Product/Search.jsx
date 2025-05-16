import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetProductsFilterAction } from '../../../../redux/action/ProductAction'

const Search = ({handleShow,categories,setSearch,range}) => {
  const dispatch=useDispatch()
 
  useEffect(()=>{

  },[categories])
  return (
<div className="relative w-full   px-5 py-4 mx-auto rounded-md ">
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg onClick={handleShow}  className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>

        <input   onChange={(e)=>{
          setSearch(e.target.value)
          if(categories.length>0){

            dispatch(GetProductsFilterAction(10,categories,e.target.value))
          }else{
            dispatch(GetProductsFilterAction(10,["all"],e.target.value))

          }
        }} type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" placeholder="Search"/>
    </div>

 
</div>
  )
}

export default Search
