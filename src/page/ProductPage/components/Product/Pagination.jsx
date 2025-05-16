import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProductsFilterAction } from '../../../../redux/action/ProductAction';

 

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange  ,
  siblingsCount = 1,
  showFirstLast = true
}) => {
  const dispatch=useDispatch()
  // Generate page numbers to show
  const generatePageNumbers = () => {
    const pages = [];
    
    // Add first page
    if (showFirstLast && currentPage > 1 + siblingsCount) {
      pages.push(1);
      // Add ellipsis if there's a gap
      if (currentPage > 2 + siblingsCount) {
        pages.push('...');
      }
      
    }
    
    // Add siblings and current page
    const start = Math.max(1, currentPage - siblingsCount);
    const end = Math.min(totalPages, currentPage + siblingsCount);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add last page
    if (showFirstLast && currentPage < totalPages - siblingsCount) {
      // Add ellipsis if there's a gap
      if (currentPage < totalPages - 1 - siblingsCount) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = generatePageNumbers();
 

  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md flex items-center ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Previous</span>
      </button>
      
      {/* Page numbers */}
      {pages.map((page, index) => (
        <Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-1">...</span>
          ) : (
            <button
              onClick={() => page !== currentPage && onPageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
            >
              {page}
            </button>
          )}
        </Fragment>
      ))}
      
      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md flex items-center ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-100'
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};
// Example usage component
const PaginationExample = ({ product,categories,Search ,setRange,range,currentPage, setCurrentPage}) => {
  const paginate=useSelector(state=>state.product.paginate)
 
  const totalPages = paginate?.numberOfPages;
  console.log('====================================');
  console.log(paginate);
  console.log('====================================');
  const dispatch=useDispatch()
  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-sm">
 
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(e)=>{
          setCurrentPage(e)
          if(categories.length>0){

            dispatch(GetProductsFilterAction(10,categories,Search,range,currentPage))
          }else{
            dispatch(GetProductsFilterAction(10,["all"],Search,range,currentPage))
      
          }
        }}
        siblingsCount={2}
        showFirstLast={true}
      />
      
      {/* <div className="grid grid-cols-3 gap-4 mt-4">
        <button 
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          First Page
        </button>
        <button 
          onClick={() => setCurrentPage(Math.ceil(totalPages/2))}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          Page 10
        </button>
        <button 
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          Last Page
        </button>
      </div> */}
    </div>
  );
};

export default PaginationExample;