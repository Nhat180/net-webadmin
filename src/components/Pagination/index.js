import React from 'react';
import './Pagination.css'

const Pagination = ({ itemPerPage, totalItem, paginate, link }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='pag'>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href={link} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
