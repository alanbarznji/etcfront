import React from 'react'
import ShipingInformation from './components/ShipingInformation'
import ListCart from './components/ListCart'

const Order = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className=' col-span-2  '>

      <ShipingInformation />
        </div>
        <div className=' hidden md:flex'>

      <ListCart/>
        </div>
    </div>
  )
}

export default Order
