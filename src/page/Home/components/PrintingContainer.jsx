import React from 'react';
import Product from '../../../Util/Product';
import { useNavigate } from 'react-router-dom';

const PrintingContainer = ({printer}) => {
  const navigate = useNavigate();
  console.log(printer );
  return (
    <div className="10vh px-5">
      <div className="flex justify-between py-5 px-5">
        <h1 className="font-bold">3D Printing</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          // Placeholder product list for now
          printer?.map((e, index) => (
            <Product product={e}/>
          ))
        }
      </div>
      <div className="flex justify-end py-5 text">
        {/* Replace Link with button */}
        <button
          onClick={() => window.location=('/product')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default PrintingContainer;
