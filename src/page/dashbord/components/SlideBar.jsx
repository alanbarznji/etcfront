import React from 'react'
import { Link } from 'react-router-dom'

const SlideBar = ({handle}) => {
  const items =[
    {
    id:1,   
      name:"Home",
      path:"/admin/home"
    },
    {
    id:3,   
      name:"product",
       path:"/admin/product"
    },
    {
    id:4,   
      name:"Chat",
      path:"/admin/chat"
    },
    {
    id:5,   
      name:"Earnings",
      path:"/admin/home"
    },
    {
    id:6,   
      name:"Package",
      path:"/admin/package"
    },
    {
    id:7,   
      name:"Show Product",
      path:"/admin/showproduct"
    },
    {
    id:8,   
      name:"Show Printer",
      path:"/admin/showprinter"
    },
  ]
  return (
    <div className='w-full flex flex-col h-full'>
      {items.map(item => (
        <Link to={
          item.path
        } key={item.id} onClick={()=>handle(item.id)} className='bg-primary text-white py-4 hover:bg-secondary cursor-pointer px-10'>
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default SlideBar

