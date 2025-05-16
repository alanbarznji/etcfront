import React, { useEffect } from 'react'
import Hero from './components/Hero'
import ProductContainer from './components/ProductContainer'
import PrintingContainer from './components/PrintingContainer'
import Footer from '../../Util/Footer'
import Offers from './components/Offers'
import Tsamks from '../../Util/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { GetProductAction } from '../../redux/action/ProductAction'
import { GetPrinterAction } from '../../redux/action/PrinterAction'
import { GetPackageAction } from '../../redux/action/PackagrAction'
import Loading from '../../Util/Loading'

const Home = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(GetProductAction(10))
dispatch(GetPrinterAction(10))
dispatch(GetPackageAction(10))
  },[])
const packages=useSelector(state=>state.package.packages?.data)
const product=useSelector(state=>state.product.products?.data)
const printer=useSelector(state=>state.printer.printers?.data)
 

  return (
    <div className='flex flex-col justify-center items-center '>
 <Hero />
 <Offers packages={packages} />
 <div className='container'>
 <ProductContainer product={product}/>
 </div>
 <div className='container'>
 <PrintingContainer printer={printer}/>
 </div>
 <Loading />
    </div>
  )
}

export default Home
