import React, { useEffect, useState } from 'react';
import Screens from './components/Screens';
import SlideBar from '../components/SlideBar';
import { BarChart, BarChart2 } from 'lucide-react';
import { NavigationOpen_Action } from '../../../redux/action/NavigationAction';
import {  
  ChangeDashboard_Action,
} from '../../../redux/action/DashboardAction';
import { useDispatch, useSelector } from 'react-redux';
import DashboardChangeReducer from '../../../redux/reducer/DashboardReducer';
import { GetOrderAction, GetOrderSearchAction } from '../../../redux/action/OrderAction';

const DashboardHome = () => {
 
  // const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const state=useSelector(state=>state.dashboard.dashboard)
  const dispatch=useDispatch()
  const [query, setQuery] = useState('');
 
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery('');
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(NavigationOpen_Action(false));  // Ensure sidebar is hidden when resizing to small screen
        setIsMobile(true);
      } else {
        setIsMobile(false);
        dispatch(NavigationOpen_Action(true)) // Show sidebar by default on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const Page=useSelector(state=>state.pages.Page)
   const SearchHanlder=async (e)=>{
     setQuery(e.target.value)
     
 await dispatch(GetOrderSearchAction(e.target.value))
   }
 
  const HandlePage=(e)=>{
    dispatch(ChangeDashboard_Action(e))
  }
 useEffect(()=>{
dispatch(GetOrderAction())
 },[])
 
 const order=useSelector(state=>state.order.Orders?.data)
 console.log(order);
 
  return (
    <div className="relative flex transition-all ">
      {/* Overlay for small screens */}
      {isMobile && state && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => dispatch(NavigationOpen_Action(false)) } // Clicking outside closes sidebar
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`transition-all duration-300 z-20 ${state ? (isMobile ? 'fixed left-0 top-0 w-3/4 h-full bg-white   text-white shadow-lg' : 'w-1/4') : 'w-0 overflow-hidden'}`}
      >
        <SlideBar handle={HandlePage}/>
   
      </div>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${state && !isMobile ? 'w-3/4' : 'w-full'} z-0 p-2`}
      >
        {/* {order,query,SearchHanlder,handleClear,isFocused,setIsFocused} */}
        <Screens  order={order} query={query} SearchHanlder={SearchHanlder} handleClear={handleClear} isFocused={isFocused} setIsFocused={setIsFocused}/>
 
      </div>
    </div>
  );
};
export default DashboardHome;