import React, { useEffect, useRef, useState } from "react";
import { Image, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { PutProductAction } from "../../../../redux/action/ProductAction";
 

export default function UpdateProductModal({ isOpen, onClose, category,productid ,Products,isLoading}) {
  const [Name, setName] = useState("");
  const [PriceBuy, setPriceBuy] = useState("");
  const [PriceSell, setPriceSell] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Discount, setDiscount] = useState("");
  const [hasDiscount, setHasDiscount] = useState(Products?.hasDiscount??false);
  const [Category, setCategory] = useState("");
  const [Details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
 
  
  const dispatch = useDispatch();
  const modal = useRef(null);
  const content = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (modal.current && 
          content.current && 
          !content.current.contains(event.target)) {
        onClose();
      }
    }

    // Attach the event listener if the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageFile(null);
  };

  const CategoryHandle = (e) => {
    setCategory(e.target.value);
  };

  if (!isOpen) return null;

  const handleSubmit =async () => {
    const formData = new FormData();
    if(Name.length>0){
      
      formData.append('Name', Name);
    }
    if(PriceSell.length>0){
      formData.append('PriceSell', PriceSell);
    }
      if(PriceBuy.length>0){
        formData.append('PriceBuy', PriceBuy);
      }
        if(Quantity.length>0){
          formData.append('Quantity', Quantity);
        }
          if(Discount.length>0){
            formData.append('Discount', Discount);
          }
          
              formData.append('hasDiscount', hasDiscount);
           
              if(Category.length>0){
                formData.append('Category', Category);
              }
                if(Details.length>0){
                  formData.append('Details', Details);
                }
                 
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    console.log('Submitting product data:', {
      Name,
      PriceSell,
      PriceBuy,
      Quantity,
      Discount,
      hasDiscount,
      Category,
      Details,
      image: imageFile ? imageFile.name : 'No image'
    });
    
    // Dispatch action to add product
    isLoading(false)
    await dispatch(PutProductAction(formData,productid));
    isLoading(true)
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" ref={modal}>
      <div className="w-full md:w-[60%] bg-white rounded-md shadow-lg p-6 max-h-[80vh] overflow-y-auto" ref={content}>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Add Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700">Product Name</label>
            <input
              type="text"
              value={Name}
              placeholder={Products?.Name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
          </div>
          <div>
            <label className="text-gray-700">Purchase Price</label>
            <input
              type="number"
              value={PriceBuy}
              placeholder={Products?.PriceBuy}
              onChange={(e) => setPriceBuy(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
          </div>
          <div>
            <label className="text-gray-700">Selling Price</label>
            <input
              type="number"
              value={PriceSell}
              placeholder={Products?.PriceSell}
              onChange={(e) => setPriceSell(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
          </div>
          <div>
            <label className="text-gray-700">Quantity</label>
            <input
              type="number"
              value={Quantity}
              placeholder={Products?.Quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
          </div>
          <div>
            <label className="text-gray-700">Discount (%)</label>
            <input
              type="number"
              value={Discount}
              placeholder={Products?.Discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={!hasDiscount}
              />
          </div>
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="hasDiscount"
              checked={hasDiscount}
              onChange={(e) => setHasDiscount(e.target.checked)}
              className="mr-2 h-4 w-4"
              />
            <label htmlFor="hasDiscount" className="text-gray-700">
              Apply Discount
            </label>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mt-4">
          <label className="text-gray-700">Upload Image</label>
          <div className="flex gap-4 mt-2">
            {image && (
              <div className="relative w-full h-[200px] border rounded-md overflow-hidden">
                <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                <button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                  <Trash size={16} />
                </button>
              </div>
            )}
            
            {!image && (
              <label className="flex flex-col items-center justify-center w-full h-[200px] border rounded-md cursor-pointer hover:bg-gray-100">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <img src={Products.image} alt="Uploaded" className="w-full h-full object-cover" />
     
              </label>
            )}
          </div>
        </div>

        {/* Category Selection */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-2">Category *</label>
          <select 
            onChange={CategoryHandle} 
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">{category && category.length > 0 ? Products.Category?Products.Category.Name: "Select a category" : "No categories available"}</option>
            {category ? category.map((e, index) => (
              <option value={e._id} key={index}>{e.Name}</option>
            )) : null}
          </select>
        </div>

        {/* Details/Description */}
        <div className="mt-4">
          <label className="text-gray-700">Product Details</label>
          <textarea
            value={Details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={Products?.Details||"Enter product details..."}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 h-24"
         
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}