import React, { Component } from "react";
import { getDistricts } from "udistricts";
import "./dashboard.css";
import Loader from "../Loader/Spinner.js";
import Search from "../Search/Search.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      search: "",
      currentPage: 1,
      perPage: 10
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkForDistricts();
    }, 2000);
  }
  checkForDistricts = async () => {
    return getDistricts
      .then(districts =>
        this.setState({
          array: [...districts]
        })
      )
      .catch(error => console.log(error));
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20), currentPage: 1 });
  };

  addItem = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    if (!name) return;
    this.setState({ array: [name, ...this.state.array] });
    this.refs.name.value = "";
  };

  deleteItem = event => {
    const { array } = this.state;
    const newArray = array.filter(
      (d, key) => parseInt(event.target.value, 10) !== key
    );
    this.setState({ array: [...newArray] });
  };

  render() {
    const { array, search, currentPage, perPage } = this.state;

    //returns filtered districts array depending on search term.
    let filteredDistricts = Search(array, search);

    //to handle pagination
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = filteredDistricts.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const renderItems = currentItems.map((district, index) => {
      return (
        <li className="district" key={index}>
          {district}
          <button
            className="delete btn-danger"
            value={index}
            onClick={this.deleteItem}
          >
            Delete
          </button>
        </li>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(array.length / perPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    //to display items.
    return (
      <div>
        {array.length > 0 ? (
          <div className="cards">
            <p className="title sticky">Ugandan Districts</p>
            <div className="criteria-boxes">
              <input
                type="text"
                value={search}
                placeholder="Search"
                className="search"
                onChange={this.updateSearch}
              />
              <form onSubmit={this.addItem} className="submit-container">
                <input
                  type="text"
                  ref="name"
                  placeholder="Add item"
                  className="name"
                />
                <button type="submit" className="submit">
                  Add District
                </button>
              </form>
            </div>
            <ul className="container">{renderItems}</ul>
            <ul id="page-numbers">{renderPageNumbers}</ul>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Dashboard;
