import React, { useEffect } from 'react'
import DetailsCard from './components/DetailsCard'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetOnePackageAction } from '../../redux/action/PackagrAction';
import ProductFeature from './components/ProductFeature';
import PrinterFeature from '../dashbord/PackageDetails/components/PrinterFeature';
 
 
 

const PackageDetails = () => {
 
  const params=useParams()
  console.log(params.id);
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(GetOnePackageAction(params.id))
},[params])
const packages=useSelector(state=>state.package.package?.data)
console.log(packages);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl flex flex-col gap-12">
    <ProductFeature packages={packages}/>
    <PrinterFeature packages={packages}/>
  
      </div>
    </section>)
}

export default PackageDetails
