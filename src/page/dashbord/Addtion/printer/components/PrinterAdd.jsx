import { useEffect, useState } from "react";
import { Image, Trash, Plus, DollarSign, Package, Tag, FileText, Hash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { InserProductAction } from "../../../../../redux/action/ProductAction";
import { GetCategoryAction } from "../../../../../redux/action/CategoryAction";
import { InserPrinterAction } from "../../../../../redux/action/PrinterAction";

export default function AddPrinterModal() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [SelectedFile, setSelectedFile] = useState(null);
  const [hasDiscount, setHasDiscount] = useState(false);

  const dispatch = useDispatch();
  
 

  const CategoryHandle = (e) => {
    setCategory(e.target.value);
  };
  
  const handleImageChange = (event) => {
   
      if (event.target.files && event.target.files[0]) {
          console.log(event.target.files[0])
          setImage(URL.createObjectURL(event.target.files[0]))
          setSelectedFile(event.target.files[0])
      }
 
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleDiscountToggle = (e) => {
    setHasDiscount(e.target.checked);
    if (!e.target.checked) {
      setDiscountPrice("");
    }
  };

  const handleSubmit = () => {
    // Prepare form data
    const formData = new FormData();
    formData.append("Name", productName);
    formData.append("Details", productDescription);
    formData.append("PriceSell", sellingPrice);
    formData.append("PriceBuy", buyingPrice);
    formData.append("Quantity", quantity);
    
    // Only append discount price if hasDiscount is true
    if (hasDiscount) {
      formData.append("Discount", discountPrice);
    } else {
      formData.append("Discount", "0");
    }
    
    formData.append("hasDiscount", hasDiscount);
    if (image) {
    
      formData.append("image", SelectedFile);
    }

    // Dispatch action
    dispatch(InserPrinterAction(formData));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-lg h-full p-8 overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Printer</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Column 1: Basic Information */}
          <div className="col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <Tag size={18} className="mr-2" />
                Basic Information
              </h3>
              
              <div className="grid md:grid-cols-1 gap-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter product name"
                  />
                </div>
          

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FileText size={16} className="inline mr-1" /> 
                    Product Description *
                  </label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
                    placeholder="Describe your product's features and benefits..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <DollarSign size={18} className="mr-2" />
                Pricing & Inventory
              </h3>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Selling Price *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Buying Price *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={buyingPrice}
                      onChange={(e) => setBuyingPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="hasDiscount"
                      checked={hasDiscount}
                      onChange={handleDiscountToggle}
                      className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label htmlFor="hasDiscount" className="text-gray-700 font-medium">
                      Apply Discount
                    </label>
                  </div>
                  <div className={hasDiscount ? "opacity-100" : "opacity-50"}>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        disabled={!hasDiscount}
                        className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Hash size={16} className="inline mr-1" />
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Image Upload */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg h-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <Image size={18} className="mr-2" />
                Product Image
              </h3>

              {image ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                  <img src={image} alt="Product" className="w-full h-64 object-contain" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={removeImage} 
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center p-6">
                    <Plus size={40} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload image</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Best practices:</p>
                <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
                  <li>Use high-quality images (minimum 800x800px)</li>
                  <li>Use a white or transparent background</li>
                  <li>Show the product from multiple angles</li>
                  <li>Ensure good lighting and clear focus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 gap-3">
          <button 
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}