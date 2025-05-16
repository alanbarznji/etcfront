import { useEffect, useState } from 'react';
import MetaComponent from '../../Util/common/ProductPageMeta'
import Sidebar from './components/Sidebar';
import ProductContainer from './components/Product/ProductContainer';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductAction, GetProductsAction } from '../../redux/action/ProductAction';
import { GetCategoryAction } from '../../redux/action/CategoryAction';
import Pagination from './components/Product/Pagination';
import PaginationExample from './components/Product/Pagination';

const metadata = {
  title: "Tour List v1 || GoTrip - Travel & Tour ReactJs Template",
  description: "GoTrip - Travel & Tour ReactJs Template",
};

const TourListPage1 = () => {
  const [range, setRange] = useState({
    min: 0,
    max: Infinity
  });
  const [currentPage, setCurrentPage] =  useState(1);
  const [categories, setCategories] = useState([]);
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(GetProductsAction(10))
dispatch(GetCategoryAction(10))
  },[])
  const product=useSelector(state=>state.product.products?.data)
  const category=useSelector(state=>state.category.Categorys?.data) 
  const handleCheckboxChange = async (index) => {
    await setCategories(prev=>{
     if(prev.includes(index)){
 return prev.filter(e=>e!==index)
     }else{
       return [...prev,index]
     }
    });
  
     
   };
     const [Search,setSearch]=useState("")
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="m-5"></div>
      <div className=' '>

      <h1 className='font-bold text-xl px-2'>Filter</h1>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 h-full">
        {/* Sidebar (Fixed width on md+, full width on small screens) */}
        <div className="md:col-span-1 border-b-2 md:border-0">
          <Sidebar range={range}  setRange={setRange} Search={Search} category={category} handleCheckboxChange={handleCheckboxChange} product={product} categories={categories}/>
        </div>
        {/* ProductContainer (Takes more space on larger screens) */}
     <div className='md:col-span-2 lg:col-span-3 flex flex-col '>

        <div className="  h-[80vh]  overflow-y-scroll relative ">
          <ProductContainer range={range} setSearch={setSearch} categories={categories} product={product} />
          
             
        </div>
 <PaginationExample  Search={Search} range={range} currentPage={currentPage} setCurrentPage={setCurrentPage} categories={categories}  />
     </div>
           
      </div>
      </div>
    </>
  );
};

export default TourListPage1;
