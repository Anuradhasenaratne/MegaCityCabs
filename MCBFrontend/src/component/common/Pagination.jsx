import React from 'react';

const Pagination = ({ vehiclesPerPage, totalVehicles, currentPage, paginate }) => {
  const pageNumbers = [];

  // Generate page numbers based on total vehicles and vehicles per page
  for (let i = 1; i <= Math.ceil(totalVehicles / vehiclesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination-nav'>
      <ul className="pagination-ul flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination-li">
            <button 
              onClick={() => paginate(number)} 
              className={`pagination-button px-4 py-2 rounded-lg text-white ${currentPage === number ? 'bg-blue-500' : 'bg-gray-500'} hover:bg-blue-600 transition duration-300`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
