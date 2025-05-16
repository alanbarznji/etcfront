import React from 'react'
import MetaComponent from '../../Util/common/ProductPageMeta'
import Sidebar from './components/Sidebar';

import ProductContainer from './components/Product/ProductContainer';
const metadata = {
    title: "Tour List v1 || GoTrip - Travel & Tour ReactJs Template",
    description: "GoTrip - Travel & Tour ReactJs Template",
  };
const PrintingPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <div className="m-5"></div>
      <h1 className='font-bold text-xl px-2'>Filter</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {/* Sidebar (Fixed width on md+, full width on small screens) */}
        <div className="md:col-span-1 border-b-2 md:border-0">
          <Sidebar />
        </div>

        {/* ProductContainer (Takes more space on larger screens) */}
        <div className="md:col-span-2 lg:col-span-3">
          <ProductContainer />
        </div>
      </div>
    </>
  )
}

export default PrintingPage
