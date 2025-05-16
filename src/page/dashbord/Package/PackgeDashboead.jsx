import React, { useEffect, useState } from "react";
import SlideBar from "../components/SlideBar";
import { NavigationOpen_Action } from "../../../redux/action/NavigationAction";
import { ChangeDashboard_Action } from "../../../redux/action/DashboardAction";
import { useDispatch, useSelector } from "react-redux";
import PackageScreen from "./Components/PackageScreen";
import AddPackageModal from "./Components/AddPackage";
import DeletePackageModal from "./Components/DeletePackage";
import { GetProductAction } from "../../../redux/action/ProductAction";
import { GetPrinterAction } from "../../../redux/action/PrinterAction";
import { DeletePackageAction, GetPackageAction } from "../../../redux/action/PackagrAction";
import UpdatePackageModal from "./Components/UpdatePackage";

export default function PackgeDashboread({OnOpen}) {

    const [Add,setAdd]=useState(false)
    const [Update,setUpdate]=useState(false)
    const [Delete,setDelete]=useState(false)
    const [PackageId,setPackageId]=useState("")
    const [Loading,setLoading]=useState(false)
    useEffect(() => {
      if (Add) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [Add]);
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
  const Loadings=useSelector(state=>state.package.Loading)

  useEffect(() => {
    dispatch(GetProductAction(10))
    dispatch(GetPrinterAction(10))
    dispatch(GetPackageAction(10))
  }, [Loading,dispatch,Loadings]);
  const product=useSelector(state=>state.product.products?.data)
  const printer=useSelector(state=>state.printer.printers?.data)
  const packages=useSelector(state=>state.package.packages?.data)
  
  const Page=useSelector(state=>state.pages.Page)
 
 
  const HandlePage=(e)=>{
    dispatch(ChangeDashboard_Action(e))
  }
 
  const DeleteHandle=(e)=>{
  setLoading(false)
 
  
dispatch(DeletePackageAction(PackageId))
  setLoading(true)
  setDelete(false)
  }
  const OpenDeleteHandle=(e,id)=>{
    e.preventDefault();
    e.stopPropagation();
    setPackageId(id)
    setDelete(true)
   
  }
  const OpenUpdateHandle=(e,id)=>{
    e.preventDefault();
    e.stopPropagation();
    setPackageId(id)
    setUpdate(true)
   
  }
  return (
    <div className="relative flex transition-all ">
      {isMobile && state && (
        <div 
        className="fixed inset-0 bg-black opacity-50 z-10"
        onClick={() => dispatch(NavigationOpen_Action(false)) } // Clicking outside closes sidebar
        ></div>
      )}
      <div 
        className={`transition-all duration-300 z-20 ${state ? (isMobile ? 'fixed left-0 top-0 w-3/4 h-full bg-white   text-white shadow-lg' : 'w-1/4') : 'w-0 overflow-hidden'}`}
      >
        <SlideBar handle={HandlePage}/>
   
      </div>
      <div 
        className={`transition-all duration-300 ${state && !isMobile ? 'w-3/4' : 'w-full'} z-0 p-2`}
      >
        
        <PackageScreen OpenDeleteHandle={OpenDeleteHandle} packages={packages}  page={Page}  OnOpen={()=>{
          setAdd(true)
        }}
        OnUpdate={OpenUpdateHandle}
        />
 
      </div>
 <AddPackageModal isOpen={Add} items={product} printer={printer} setLoading={setLoading}  onClose={()=>{
   setAdd(false)
  }}/>
 <UpdatePackageModal packageId={PackageId} isOpen={Update} items={product} printer={printer} setLoading={setLoading}  onClose={()=>{
   setUpdate(false)
  }}/>
  <DeletePackageModal isOpen={Delete} onClose={()=>{
    setDelete(false)
  }} DeleteHandle={DeleteHandle}/>
    </div>)
}
