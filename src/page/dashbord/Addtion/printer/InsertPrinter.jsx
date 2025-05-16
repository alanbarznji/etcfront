import React, { useEffect, useState } from 'react'
import SlideBar from '../../components/SlideBar'
import PrinterAdd from './components/PrinterAdd'
import { NavigationOpen_Action } from '../../../../redux/action/NavigationAction';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDashboard_Action } from '../../../../redux/action/DashboardAction';

const InsertPrinter = () => {
     
  // const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const state=useSelector(state=>state.dashboard.dashboard)
  const dispatch=useDispatch()
  
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
  console.log(Page);
  const SliderShow=()=>{
    dispatch(NavigationOpen_Action(!state))
  }
  const HandlePage=(e)=>{
    dispatch(ChangeDashboard_Action(e))
  }
console.log(state);
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
        
        <PrinterAdd  page={Page}/>
 
      </div>
    </div>
  )
}

export default InsertPrinter
