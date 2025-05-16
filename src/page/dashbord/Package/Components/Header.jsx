import React from 'react'

const Header = ({
  OnOpen
}) => {
  return (
    <div className=' flex p-5 justify-between items-center'>
    <h1>Page </h1>
    <button onClick={OnOpen} className="py-2 bg-black w-32 text-white flex items-center border-2 border-transparent justify-center hover:bg-white hover:text-black hover:border-black transition-all hover:border-2 duration-300">Add to cart</button>
</div>
  )
}

export default Header
