import React from "react";

export const ListItems = (currentItems, deleteItem) =>
  currentItems.map((district, index) => {
    return (
      <li className="district" key={index}>
        {district}
        <button
          className="delete btn-danger"
          value={district}
          onClick={deleteItem}
        >
          Delete
        </button>
      </li>
    );
  });
