import { useEffect, useRef, useState } from "react";
import DetailsProduct from "./components/Details";
import ProductContainer from "./components/ProductContainerDetails";
import Footer from "../../Util/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOneProductAction } from "../../redux/action/ProductAction";

export default function ProductDetails() {
  const [pos, setPos] = useState(0);
  const ref = useRef(null);
const params=useParams().id
const dispatch=useDispatch()
console.log('====================================');
console.log(params,"sssssss");
console.log('====================================');
useEffect(()=>{
dispatch(GetOneProductAction(params))
},[ ])
const product =useSelector(state=>state.product.product?.data)
console.log('====================================');
console.log(product,";;;;;");
console.log('====================================');
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPos(rect.top + window.scrollY);
      }
    };

    window.addEventListener("resize", updatePosition);
    updatePosition(); // Get initial position

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <div className="justify-center items-center flex flex-col gap-10  ">
      <DetailsProduct product={product}/>
      <ProductContainer products={product} />
     
    </div>
  );
}
