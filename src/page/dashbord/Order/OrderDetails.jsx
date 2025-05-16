import { Check, CreditCard, Delete, MapPin, ShoppingBag, Truck, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Heart, Minus, Plus, Share } from "lucide-react";
import DetailsCard from './components/DetailsCard';
import ProductContainer from './components/ProductContainerDetails';
import Footer from '../../../Util/Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOneOrderAction, GetOneOrderAction, GetOrderAction } from '../../../redux/action/OrderAction';
 
 
const OrderDetails = () => {
  const [quantities, setQuantities] = useState(Array(5).fill(1));
  const [Loading, setLoading] = useState(false);
  const params=useParams().id
  console.log(params);
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(GetOneOrderAction(params))
  },[Loading])
  const order=useSelector(state=>state.order.Order?.data)
  console.log(order);
  
  // Sample product data for demonstration
 
 const year=new Date(order?.createdAt).getFullYear()
 const month=new Date(order?.createdAt).getMonth()+1
 const day=new Date(order?.createdAt).getDay()+1
 const ActivityDispatch=(e)=>{
  setLoading(false)
  dispatch(CheckOneOrderAction(order?._id,e))
  setLoading(true)
 }
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Order Status */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{order?.name}</h1>
            <span className={`ml-4 px-3 py-1   ${order?.state!=="waiting"?order?.state=="pending"?"bg-red-100 text-red-800":" bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"} text-sm font-medium rounded-full`}>
              {order?.state}
            </span>
          </div>
          <div className="text-gray-600 flex items-center">
            <Truck size={16} className="mr-2" />
            <span>Estimated delivery:  {`${year}/${month}/${day}`}</span>
          </div>
        </div>

        {/* Order Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              Order Items
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="py-4 px-6 text-sm font-medium text-gray-600">Product</th>
                  <th className="py-4 px-6 text-sm font-medium text-gray-600">Price</th>
                  <th className="py-4 px-6 text-sm font-medium text-gray-600">Quantity</th>
                  <th className="py-4 px-6 text-sm font-medium text-gray-600 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.CartList?.map((product, index) => {
                  console.log(product,index,"dddddds");
                  
                  return <tr key={product.Product.id} className="border-t border-gray-100">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img 
                          src={product.Product.image} 
                          alt={product.Product.Name} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="font-medium text-gray-800">{product.Product.Name}</h3>
                          <p className="text-sm text-gray-500">{product.Product.Category.Name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-800 font-medium">{product.Product.PriceSell} IQD</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center border border-gray-200 rounded-md w-32">
           
                        <div className="flex-1 text-center font-medium">
                          {product.Quantity}
                        </div>
                
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-gray-800">
                      {product.Product.PriceSell*product.Quantity} IQD
                    </td>
                  </tr>
})}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin size={18} className="mr-2" />
                  Shipping Information
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Delivery Address</h3>
                  <p className="text-gray-800">{order?.city}</p>
                 
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Customer</h3>
            
                  {
                    order?.Number?.map(e=>{
                      return <p key={e._id} className="text-gray-800">{e.phone}</p>
                    })
                  }
        
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <CreditCard size={18} className="mr-2" />
                  Order Summary
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">{order?.totalCartPrice} IQD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="text-gray-800 font-medium">5,000 IQD</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-xl font-bold text-gray-800">{order?.totalCartPrice+5000} IQD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-4 mt-6">
          <button onClick={()=>{ActivityDispatch("pending")}} className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-800 font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
            <X size={18} className="mr-2" />
            Cancel Order
          </button>
          <button onClick={()=>{ActivityDispatch("successfuly")}} className="px-6 py-3 bg-blue-600 rounded-lg text-white font-medium flex items-center justify-center hover:bg-blue-700 transition-colors md:ml-auto">
            <Check size={18} className="mr-2" />
            Approve Order
          </button>
        </div>
      </div>
    </div>)}

export default OrderDetails
