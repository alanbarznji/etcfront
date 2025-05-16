import React, { useState } from 'react';
import { Minus, Plus, Delete, ShoppingBag } from 'lucide-react';

const CartTable = () => {
  // Track quantities for each item separately
  const [quantities, setQuantities] = useState(Array(5).fill(1));
  
  // Update quantity for a specific item
  const updateQuantity = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  // Handle direct input change
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    
    // If empty, set to empty string temporarily
    if (value === "") {
      updateQuantity(index, "");
      return;
    }
    
    // Parse as number
    const numValue = parseInt(value, 10);
    
    // Only update if it's a valid number
    if (!isNaN(numValue)) {
      updateQuantity(index, numValue);
    }
  };

  // Handle input blur to validate final value
  const handleInputBlur = (index) => {
    const currentValue = quantities[index];
    
    // If empty or less than 1, set to 1
    if (currentValue === "" || currentValue < 1) {
      updateQuantity(index, 1);
    }
  };

  // Increase quantity
  const increaseQuantity = (index) => {
    updateQuantity(index, Number(quantities[index] || 0) + 1);
  };

  // Decrease quantity with minimum of 1
  const decreaseQuantity = (index) => {
    const currentValue = Number(quantities[index] || 0);
    if (currentValue > 1) {
      updateQuantity(index, currentValue - 1);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    const itemPrice = 91000;
    return quantities.reduce((total, qty) => total + (itemPrice * (Number(qty) || 0)), 0);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <section className="container px-4 mx-auto">
      <div className="flex flex-col mt-6">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-medium text-left text-gray-700">
                      <span>Product</span>
                    </th>
                    <th scope="col" className="px-16 py-3.5 text-sm font-medium text-left text-gray-700">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-medium text-left text-gray-700">
                      Quantity
                    </th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-medium text-left text-gray-700">
                      Price
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            className="object-cover w-16 h-16 rounded-md" 
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80" 
                            alt="NIKE AIR"
                          />
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium">
                        <div className="text-gray-700">
                          Nike Air Max 270
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Color: Black | Size: US 10
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center border border-gray-300 rounded-md w-32">
                          <button 
                            onClick={() => decreaseQuantity(index)}
                            className={`px-2 py-1 ${quantities[index] <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                            disabled={quantities[index] <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="text"
                            className="w-full h-8 text-center focus:outline-none text-gray-700"
                            value={quantities[index]}
                            onChange={(e) => handleInputChange(index, e)}
                            onBlur={() => handleInputBlur(index)}
                            aria-label="Quantity"
                          />
                          <button 
                            onClick={() => increaseQuantity(index)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap font-bold text-gray-700">
                        {formatCurrency(91000 * (Number(quantities[index]) || 0))} IQD
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="p-1 text-red-500 transition-colors duration-200 rounded-full hover:bg-red-50">
                          <Delete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-700">Total</span>
            <span className="text-xl font-bold text-gray-900">{formatCurrency(calculateTotal())} IQD</span>
          </div>
          
          <button 
            onClick={() => {
              window.location = "/order";
            }} 
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="mr-2" size={18} />
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartTable;