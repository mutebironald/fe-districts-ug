import React from 'react';

export const Paginator = (pageNumbers, currentPage, handleClick) => pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        className={number === currentPage ? "animated" : ""}
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });
