import React, { useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
// Import your delete action here
// import { DeleteProductAction } from "../../../../redux/action/ProductAction";

export default function DeleteProductModal({ isOpen, onClose ,DeleteHandle}) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const handleDelete = () => {
    // Dispatch delete action
    // dispatch(DeleteProductAction(productId));
    console.log("Deleting product:", "productId");
    onClose();
  };
  useEffect(() => {
    function handleClickOutside(event) {
      console.log(modalRef.current,
        contentRef.current,

        (event.target));
      
      if (modalRef.current && 
          contentRef.current && 
          !contentRef.current.contains(event.target)) {
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

const ref=useRef(null)
  if (!isOpen) return null;

  return (
    <div  ref={modalRef}  className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg p-6" ref={contentRef}>
        <div className="flex items-center gap-3 mb-4"  > 
          <AlertCircle className="h-6 w-6 text-red-500" />
          <h2 className="text-lg font-semibold">Delete Product</h2>
        </div>
        
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-medium">{ "this product"}</span>?
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={DeleteHandle} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}