import React, { useEffect, useState } from 'react'
 
 
import { useDispatch, useSelector } from 'react-redux';
 
 
import { ChangeDashboard_Action } from '../../../redux/action/DashboardAction';
import { NavigationOpen_Action } from '../../../redux/action/NavigationAction';
import SlideBar from '../components/SlideBar';
import ShowScreens from './components/ShowScreens';
import DeleteProductModal from './components/DeleteProduct';
import UpdateProductModal from './components/UpdateProductModal';
import { DeleteProductAction, GetProductAction, GetProductSearchAction } from '../../../redux/action/ProductAction';
import { GetCategoryAction} from '../../../redux/action/CategoryAction';
import { Search, X } from 'lucide-react';


export default function AllProduct() {

    const [Add,setAdd]=useState(false)
    const [Delete,setDelete]=useState(false)
    const [Loading,setLoading]=useState(false)
    const [ProductId,setProductId]=useState("")
    const [Products,setProducts]=useState()
    
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
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
  
    const items = ["Uppercase", "Lowercase", "Camel Case", "Kebab Case"];
  
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
  const DelteHaandle=(e)=>{
    console.log('====================================');
    console.log(e);
    console.log('====================================');
    // setDelete(true)
  }
   
  const category = useSelector(state => state.category.Categorys.data);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery('');
  };
  const SearchHanlder=async (e)=>{
    setQuery(e.target.value)
await dispatch(GetProductSearchAction(e.target.value))
  }
 
  
    useEffect(()=>{
  dispatch(GetProductAction())
  dispatch(GetCategoryAction())
    },[Loading])
    const product=useSelector(state=>state.product.products.data)
    console.log(product);
    
  
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
          <div className="w-full   p-4">
      <div 
        className={`flex items-center w-full rounded-full border ${
          isFocused 
            ? 'border-blue-500 shadow-lg bg-white' 
            : 'border-gray-300 bg-gray-50'
        } px-4 py-2 transition-all duration-200 `}
      >
        <Search className="text-gray-400 mr-2" size={20} />
        
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={SearchHanlder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        />
        
        {query && (
          <button 
            onClick={handleClear}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
  
    </div>
        <ShowScreens   DeleteHandle={(e)=>{
          setProductId(e)
          setDelete(true)
        }} product={product} UpdateHandle={(e)=>{
          const p=product.find(e=>e._id=e)
          
          setProductId(e)
          setProducts(p)  
 
          setAdd(true)
        }}/>  
 
      </div>
    {/* add package  */}
 <DeleteProductModal isOpen={Delete} DeleteHandle={
  async ()=>{
    setLoading(false)
    await dispatch(DeleteProductAction(ProductId))
    setLoading(true)
    setDelete(false)

  }
 }  onClose={(e)=>{
 
   setDelete(false)
 }} Delete={DelteHaandle}/>
 <UpdateProductModal isOpen={Add} productid={ProductId} Products={Products} onClose={()=>{
   setAdd(false)
 }} category={category} isLoading={setLoading} />
    </div>)
}
