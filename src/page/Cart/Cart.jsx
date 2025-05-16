import { Delete } from 'lucide-react'
import React, { useState } from 'react'
import { Heart, Minus, Plus, Share } from "lucide-react";
import DetailsCard from './components/DetailsCard';
import ProductContainer from './components/ProductContainerDetails';
import Footer from '../../Util/Footer';
 
const Cart = () => {
  return   <div className='flex flex-col justify-center items-center'>
 <DetailsCard />
 <ProductContainer />
 
    </div>
}

export default Cart
