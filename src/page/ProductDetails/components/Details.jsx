import { Heart, Minus, Plus, Share, Copy, Check, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const DetailsProduct = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs to track container and image elements
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  // State to track the maximum scroll position
  const [maxScrollOffset, setMaxScrollOffset] = useState(0);

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Handle initial screen size and resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 786);
      updateMaxScrollOffset();
    };

    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate the maximum scroll offset based on container and image heights
  const updateMaxScrollOffset = () => {
    if (containerRef.current && imageRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const imageHeight = imageRef.current.offsetHeight;
      
      // The maximum scroll position is the difference between container and image heights
      // We add a small buffer (e.g., 20px) to ensure the image stops slightly before the container end
      const maxOffset = containerHeight - imageHeight - 20;
      
      // If the container is shorter than the image, we don't want negative values
      setMaxScrollOffset(Math.max(0, maxOffset));
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Calculate max scroll offset when components are mounted
    updateMaxScrollOffset();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Recalculate max scroll offset when image loads
  const handleImageLoad = () => {
    updateMaxScrollOffset();
  };

  // Calculate the actual image position with clamping
  const getImagePosition = () => {
    if (isMobile) return 0;
    
    // Clamp the scroll position to not exceed maxScrollOffset
    return Math.min(scrollPosition, maxScrollOffset);
  };

  // Function to handle share button click
  const handleShareClick = () => {
    setShowShareModal(true);
  };

  // Function to copy the page URL
  const copyPageUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Generate share text with product details
  const getShareText = () => {
    return `Check out this product: ${product?.title || "XH-M239 Lithium Battery 18650 True Capacity Tester Module"}\n` +
           `Price: ${product?.PriceSell * quantity} IQD\n` +
           `${product?.Details || "No details available"}\n` +
           `${window.location.href}`;
  };

  // Function to copy the complete share text
  const copyCompleteText = () => {
    const shareText = getShareText();
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container w-full py-10 min-h-screen overflow-hidden flex justify-center items-center p-5">
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-3 justify-around items-start gap-10 relative"
      >
        {/* Image Section - Moves Down with Scroll until reaching maxScrollOffset */}
        <div className="col-span-2 relative">
          <div className="relative">
            <img
              ref={imageRef}
              className="object-cover w-full mt-2"
              style={{
                top: `${getImagePosition()}px`,
                position: "relative",
                transition: "top 0.2s ease-out",
              }}
              src={product?.image||"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80"}
              alt="NIKE AIR"
              onLoad={handleImageLoad}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-10">
          <h1 className="text-4xl">XH-M239 Lithium Battery 18650 True Capacity Tester Module</h1>
          <p>Price: {product?.PriceSell * quantity} IQD</p>
          <div className="flex flex-col gap-2">
            <p>Quantity:</p>
            <div className="flex gap-2 border-2 w-32 justify-center items-center p-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus color={`${quantity <= 1 ? "gray" : "black"}`} />
              </button>
              <input
                type="text"
                className="w-12 outline-0 text-center"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuantity(value === "" ? 0 : parseInt(value) || 0);
                }}
              />
              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus />
              </button>
            </div>
          </div>
          <button className="h-15 bg-black w-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover:border-2">Add to cart</button>
          <div>
            <h2>Description</h2>
            <p>
              {product?.Details}
            </p>
          </div>
          <div className="flex gap-10">
            <button 
              className="hover:bg-gray-400 p-3 rounded-full"
              onClick={handleShareClick}
            >
              <Share />
            </button>
            <button className="hover:bg-gray-400 p-3 rounded-full ">
              <Heart />
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Share this product</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="border rounded-md p-3 mb-4 bg-gray-50">
              <p className="text-sm whitespace-pre-wrap mb-2">{getShareText()}</p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={copyCompleteText}
                className="flex items-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>Copy Complete Text</span>
              </button>
              
              <button 
                onClick={copyPageUrl}
                className="flex items-center gap-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>Copy Link Only</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsProduct;