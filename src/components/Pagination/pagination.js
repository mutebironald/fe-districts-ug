import React from "react";

//this paginator function will return page numbers. The arguments have been set to default values
export const Paginator = (
  pageNumbers = 10,
  currentPage = 1,
  handleClick = () => {}
) =>
  pageNumbers.map(number => {
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
