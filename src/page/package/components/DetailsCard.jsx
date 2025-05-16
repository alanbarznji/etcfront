import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ArrowLeft, ArrowRight, Package, Star } from "lucide-react";
import PackageProduct from "./PackageProduct";
import { useDispatch, useSelector } from "react-redux";
 
import ProductFeature from "./ProductFeature";
import PrinterFeature from "./PrinterFeature";
import { GetOnePackageAction } from "../../../redux/action/PackagrAction";

const DetailsCard = () => {
  const { t, i18n } = useTranslation();
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
    </section>
  );
};

export default DetailsCard;