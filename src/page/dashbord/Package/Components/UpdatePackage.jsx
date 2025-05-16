import React, { useEffect, useState } from "react";
import { Image, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetOnePackageAction, InserPackageAction, PutPackageAction } from "../../../../redux/action/PackagrAction";

export default function UpdatePackageModal({ isOpen, onClose, items, printer, setLoading, packageId }) {
  const packages = useSelector(state => state.package.package?.data)
  useEffect(() => {
    dispatch(GetOnePackageAction(packageId))
  }, [isOpen, packageId])
 
const [packageName, setPackageName] = useState("");
const [price, setPrice] = useState("");
const [duration, setDuration] = useState("");
const [description, setDescription] = useState("");
const [image, setImage] = useState(null);
const [images, setImages] = useState(null);
const [isOpens, setIsOpens] = useState(false);
const [isOpens2, setIsOpens2] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [searchTerm2, setSearchTerm2] = useState("");
const [Product, setProduct] = useState([]);
const [Printer, setPrinter] = useState([]);
const [offerAvailable, setOfferAvailable] = useState(true);
const [packageType, setPackageType] = useState("Starter");

// Update state when 'packages' updates
useEffect(() => {
  if (packages) {
    setPackageName(packages?.Name || "");
    setPrice(packages?.Price || "");
    setDuration(packages?.FinishDate || "");
    setDescription(packages?.Details || "");
    setImages(packages?.image || null);
    setProduct(packages?.ProductOfOffer?.map(item => {
      return {Products: item.Products._id, ProdutsName: item.Products.Name, Quantity: item.Quantity}
    }) || []);
    setPrinter(packages?.PrinterOfOffer?.map(item => {
      return { Printer: item.Printer?._id, PrinterName: item.Printer?.Name, Quantity: item.Quantity }
    }) || []);
    setOfferAvailable(packages?.OfferAvalible || true);
    setPackageType(packages?.state || "Starter");
  }
}, [packages]); // Re-run when 'packages' changes

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  if (!isOpen) return null;

  
  const filteredItems = items?.filter((item) =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredItems2 = printer?.filter((item) =>
    item.Name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const handleSubmit = () => {
    const form = new FormData();
    
    form.append('Name', packageName);
    form.append('Price', price);
    form.append('FinishDate', duration);
    if(image)
      form.append('image', image);
    form.append('Details', description);
    form.append('OfferAvalible', offerAvailable);
    form.append("ProductOfOffer", JSON.stringify(Product));
    form.append("PrinterOfOffer", JSON.stringify(Printer));
    form.append("state", packageType);
    
    setLoading(false)
    dispatch(PutPackageAction(form, packageId));
    setLoading(true)
    onClose();
  };
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full md:w-[60%] bg-white rounded-md shadow-lg p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Update Package</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700">Package Name</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-gray-700">Finish Date</label>
            <input
              type="date"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-gray-700">Offer Available</label>
            <select
              value={offerAvailable}
              onChange={(e) => setOfferAvailable(e.target.value === "true")}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700">Package Type</label>
            <select
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="Starter">Starter</option>
              <option value="Professional">Professional</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="mt-4">
          <label className="text-gray-700">Upload Image</label>
          <div className="flex gap-4 mt-2">
            {image && (
              <div className="relative w-full h-[400px] border rounded-md overflow-hidden">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover" 
                />
                <button onClick={removeImage} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                  <Trash size={16} />
                </button>
              </div>
            )}
            {!image && (
              <label className="flex flex-col items-center justify-center w-full h-[400px] border rounded-md cursor-pointer hover:bg-gray-100">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                <img src={packages.image} alt="" className="w-full h-full object-cover" />
            
              </label>
            )}
          </div>
        </div>

        {/* Product Selection */}
        <div className="flex items-center justify-center w-full py-10">
          <div className="relative w-full">
            <button
              onClick={() => setIsOpens(!isOpens)}
              className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">Select Products</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpens && (
              <div className="absolute w-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-10">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                />
                {filteredItems.map((item, index) => {
                  if (!Product.some((e) => e.Products === item._id)) {
                    return (
                      <p
                        key={index}
                        onClick={() => setProduct([...Product, { Products: item._id, ProdutsName: item.Name, Quantity: 1 }])}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                      >
                        {item.Name}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            {Product.map((e, index) => (
              <div key={e.Produts} className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>{e.ProdutsName}</div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProduct(prev => 
                      prev.map((item, i) => 
                        i === index ? { ...item, Quantity: Math.max(1, item.Quantity - 1) } : item
                      )
                    )}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <div>{e.Quantity}</div>

                  <button
                    onClick={() => setProduct(prev => 
                      prev.map((item, i) => 
                        i === index ? { ...item, Quantity: item.Quantity + 1 } : item
                      )
                    )}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => setProduct(prev => prev.filter((_, i) => i !== index))}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-10">
          <div className="relative w-full">
            <button
              onClick={() => setIsOpens2(!isOpens2)}
              className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <span className="mr-2">Select Products</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpens2 && (
              <div className="absolute w-full right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                />
                {filteredItems2.map((item, index) => {
                  if (!Printer.some((e) => e.Printer === item._id)) {
                    return (
                      <p
                        key={index}
                        onClick={() => setPrinter([...Printer, { Printer: item._id, PrinterName: item.Name, Quantity: 1 }])}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                      >
                        {item.Name}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            )}
         
          </div>
        </div>

 
        {/* Selected Products */}
        {Printer.map((e, index) => (
          <div key={e.Produts} className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>{e.PrinterName}</div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPrinter(prev => 
                  prev.map((item, i) => 
                    i === index ? { ...item, Quantity: Math.max(1, item.Quantity - 1) } : item
                  )
                )}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>

              <div>{e.Quantity}</div>

              <button
                onClick={() => setPrinter(prev => 
                  prev.map((item, i) => 
                    i === index ? { ...item, Quantity: item.Quantity + 1 } : item
                  )
                )}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>

              <button
                onClick={() => setPrinter(prev => prev.filter((_, i) => i !== index))}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                ✖
              </button>
            </div>
          </div>
        ))}

        {/* Description */}
        <div className="mt-4">
          <label className="text-gray-700">Details</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400 h-24"
            placeholder="Enter package details..."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save Package</button>
        </div>
      </div>
    </div>
  );
}