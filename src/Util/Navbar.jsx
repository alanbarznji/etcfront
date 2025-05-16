import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationOpen_Action } from "../redux/action/NavigationAction";
import { GetCartListAction } from "../redux/action/CartListAction";
 
 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Session, setSession] = useState(localStorage.getItem("session"));
  // const location =useLocation()

  // const naviagte=useNavigate()
  const state=useSelector(state=>state.dashboard.dashboard)
  const dispatch=useDispatch()
  useEffect(()=>{
     
      setSession(localStorage.getItem("session"))
      console.log(Session,"jjjjajajajajaj");
      
   
dispatch(GetCartListAction(Session))
  },[Session])
  const cart=useSelector(state=>state.cart.Cart?.data)
  console.log(cart);

  return (
    <div className="relative bg-white shadow-md dark:bg-primary w-full">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.location=('/')}
            className="focus:outline-none"
          >
            <img
              className="w-auto h-6 sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt="Logo"
            />
          </button>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => {
                if(window.location.pathname.includes("admin")){
dispatch(NavigationOpen_Action(!state))
                }
                else{

                  setIsOpen(!isOpen)
                }
              }}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
     {!window.location.pathname.includes("admin")?   <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-primary md:mt-0 md:p-0 md:relative md:bg-transparent md:w-auto md:flex md:items-center ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full md:opacity-100 md:translate-x-0"
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <button
              onClick={() => window.location=('/')}
              className="my-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => window.location=('/chat')}
              className="my-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 focus:outline-none"
            >
              printing
            </button>
            <button
              onClick={() => window.location=('/chat')}
              className="my-2 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 focus:outline-none"
            >
              oldOrder
            </button>
          </div>

          {/* Cart Icon */}
          <div className="flex justify-center md:block">
            <button
              onClick={() => window.location=('/cart')}
              className="relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Cart Count (Dynamic) */}
              <span style={{
                fontSize:"80%"
               }} className="absolute top-[-10px] left-5 p-0.5   text-white bg-blue-500 rounded-full">
          
                 {cart?.CartList.length}
               
              </span>
            </button>
          </div>
        </div>:null}
      </div>
    </div>
  );
};

export default Navbar;
