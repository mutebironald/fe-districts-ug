import React from "react";

export const headerRender = (search, updateSearch, addItem) => {
  return (
    <div className="criteria-boxes">
      <input
        type="text"
        value={search}
        placeholder="Search"
        className="search"
        onChange={updateSearch}
      />
      <form onSubmit={addItem} className="submit-container">
        <input type="text" ref="name" placeholder="Add item" className="name" />
        <button type="submit" className="submit">
          Add District
        </button>
      </form>
    </div>
  );
};
